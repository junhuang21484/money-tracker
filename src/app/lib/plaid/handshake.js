'use server'

import PLAID_CLIENT from "./plaid-client";
import {PLAID_PRODUCTS, PLAID_COUNTRY_CODES, PLAID_REDIRECT_URI} from "./plaid-client"
import { insertNewPlaidConnection } from "@/app/lib/data/plaidConnections"
import { getBankName } from "./plaid-wrapper"

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

export async function exchangePublicToken(userID, publicToken) {
    console.log("Exchanging public token", publicToken, " for user", userID);
    try {
      // Exchange public token for access token
      const response = await PLAID_CLIENT.itemPublicTokenExchange({
        public_token: publicToken,
      });

      const accessToken = response.data.access_token;
      const itemID = response.data.item_id;
      const institutionName = await getBankName(accessToken)
      await insertNewPlaidConnection(itemID, accessToken, userID, institutionName) // Save connection to database
      return {success: true, msg: "Connection imported"};
    } catch (error) {
      console.log(error.message)
      return {success: false, msg: "Internal Errors"}
    }
}