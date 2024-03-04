require('dotenv').config();
const { Configuration, PlaidApi, Products, PlaidEnvironments} = require('plaid');

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV || 'sandbox';

const configuration = new Configuration({
    basePath: PlaidEnvironments[PLAID_ENV],
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
        'PLAID-SECRET': PLAID_SECRET,
        'Plaid-Version': '2020-09-14',
      },
    },
  });

const PLAID_CLIENT = new PlaidApi(configuration);

export const PLAID_PRODUCTS = (process.env.PLAID_PRODUCTS || Products.Transactions).split(',',);
export const PLAID_COUNTRY_CODES = (process.env.PLAID_COUNTRY_CODES || 'US').split(',',);
export const PLAID_REDIRECT_URI = process.env.PLAID_REDIRECT_URI || '';
export default PLAID_CLIENT