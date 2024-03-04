'use server'

import PLAID_CLIENT from "./plaid-client";
import { PLAID_PRODUCTS, PLAID_COUNTRY_CODES, PLAID_REDIRECT_URI } from "./plaid-client"
import { insertNewPlaidConnection } from "@/app/lib/data/plaidConnections"
import { fetchAccTypeToUserByName } from "@/app/lib/data/accountType";
import { insertNewAccount } from "@/app/lib/data/accounts";
import { getPlaidAccountInfoByID, insertNewPlaidAccountInfo } from "@/app/lib/data/plaidAccountInfo"
import { getAccountLinkedUncached } from "./plaid-wrapper"
import { revalidatePath } from "next/cache";


export async function createLinkToken(userID) {
  const configs = {
    user: {
      client_user_id: userID,
    },
    client_name: 'Money Minder',
    products: PLAID_PRODUCTS,
    country_codes: PLAID_COUNTRY_CODES,
    language: 'en',
  };

  if (PLAID_REDIRECT_URI !== '') {
    configs.redirect_uri = PLAID_REDIRECT_URI;
  }

  const createTokenResponse = await PLAID_CLIENT.linkTokenCreate(configs);
  return createTokenResponse.data
}


export async function exchangePublicToken(userID, publicToken, institutionName) {
  try {
    // Exchange public token for access token
    const response = await PLAID_CLIENT.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemID = response.data.item_id;
    const data = await getAccountLinkedUncached(accessToken)
    const linkedAccounts = data.accounts
    const accountsItemID = data.item.item_id
    const addedAcc = await importLinkedAccount(userID, linkedAccounts, accountsItemID, institutionName) // Import all connected account into the database

    // If at least one account is imported then save this connection otherwise this connection will not be saved
    if (addedAcc > 0) { 
      await insertNewPlaidConnection(itemID, accessToken, userID, institutionName) // Save connection to database
      revalidatePath("/dashboard/accounts")
      return { success: true, msg: `${addedAcc} account(s) imported` };
    } else if (addedAcc == 0) return { success: true, msg: "All account(s) ALREADY imported" };
    
  } catch (error) {
    console.log(error.message)
    return { success: false, msg: "Internal Errors" }
  }
}

export async function importLinkedAccount(userID, linkedAccounts, accountsItemID, institutionName) {
  let addedAcc = 0;
  await Promise.all(linkedAccounts.map(async (account) => {
    const accountID = account.account_id;
    const balance = account.balances.current;
    const plaidPersistentAccID = account.persistent_account_id;
    const accountName = `${institutionName} - ${account.name}`;

    const accountSubtype = account.subtype;

    const existingAcc = await getPlaidAccountInfoByID(plaidPersistentAccID);
    if (existingAcc) return; // Skip since current already imported

    // If this is not a pre-define account type then it will get introduced to other category
    let accountTypeData = await fetchAccTypeToUserByName(userID, accountSubtype);
    if (!accountTypeData) {
      const otherType = account.type === 'depository' ? 'other [depository]' : 'other [non-depository]';
      accountTypeData = await fetchAccTypeToUserByName(userID, otherType)[0];
    }
    const accountTypeID = accountTypeData.account_type_id

    await insertNewPlaidAccountInfo(plaidPersistentAccID, accountID, accountsItemID); // Create new plaid account info
    await insertNewAccount(userID, accountTypeID, plaidPersistentAccID, accountName, balance) // Create new account

    addedAcc++; // Increment addedAcc for each successfully added account

  }));

  return addedAcc;
}