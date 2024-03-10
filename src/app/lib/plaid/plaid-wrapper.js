'use server'
import PLAID_CLIENT from "./plaid-client"

export async function getAccountLinked(accessToken) {
  try {
    const response = await PLAID_CLIENT.accountsGet({ access_token: accessToken });
    const accounts = response.data.accounts;
    console.log(accounts)
  } catch (error) {
    // handle error
  }
}

export async function getAccountLinkedUncached(accessToken) {
  try {
    const response = await PLAID_CLIENT.accountsBalanceGet({ access_token: accessToken });
    const accounts = response.data;
    return accounts
  } catch (error) {
    // handle error
  }
}

export async function fetchNewSyncData(accessToken, initialCursor, retriesLeft = 3) {
  const allData = {
    added: [],
    removed: [],
    modified: [],
    nextCursor: initialCursor,
    success: false
  };
  if (retriesLeft <= 0) {
    // We're just going to return no data and keep our original cursor. We can try again later.
    return allData;
  }
  try {
    let keepGoing = false;
    do {
      const results = await PLAID_CLIENT.transactionsSync({
        access_token: accessToken,
        options: {
          include_personal_finance_category: true,
        },
        cursor: allData.nextCursor,
      });
      const newData = results.data;
      allData.added = allData.added.concat(newData.added);
      allData.modified = allData.modified.concat(newData.modified);
      allData.removed = allData.removed.concat(newData.removed);
      allData.nextCursor = newData.next_cursor;
      keepGoing = newData.has_more;
    } while (keepGoing === true);
    allData.success = true
    return allData;
  } catch (error) {
    console.log(
      `Oh no! Error! ${JSON.stringify(
        error
      )} Let's try again from the beginning!`
    );
    await setTimeout(1000);
    return fetchNewSyncData(accessToken, initialCursor, retriesLeft - 1);
  }
}


