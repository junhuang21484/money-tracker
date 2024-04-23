
# MoneyMinder

A web application that allows users to track their financial status by integrating with the Plaid API. The application will provide users with insights into their spending habits, income, and overall financial standing, using visual graphs, and a user-friendly interface.

You can access the hosted website here: https://money-tracker-kappa-dun.vercel.app/ 

**Please note all Plaid related features run on sandbox mode**
- Username: `user_good`
- Password: `pass_good`
- 2FA Code: `1234`

## Features

- Analytics: The website consist of graphs that help the user break down their spending trends, and categories, and just in general provide insight into their financial standing.
- Automation: Track down user’s spending automatically through the use of Plaid API.
- Budgeting, and Goal Setting.
- User-friendly interface.


## Tech Stack

**Client:**  React, Next.js, TailwindCSS

**Server:** Next.js, Node.js

**Database:** MySQL

**Storage:** Firebase


## Run Locally

Clone the project

```bash
  git clone https://github.com/junhuang21484/money-tracker.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm i
```

Start the server

```bash
  npm run dev
```

Open http://localhost:3000 with your browser to see the result.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`
`JWT_SECRET`

If you want to use the Plaid API you will also need the following environment variables

`PLAID_CLIENT_ID`
`PLAID_SECRET`
`PLAID_ENV`
`PLAID_PRODUCTS=auth,transactions`
`PLAID_COUNTRY_CODES`
`PLAID_REDIRECT_URI`

## Authors

- [@junhuang21484](https://github.com/junhuang21484)
- [@Abdel03](https://github.com/Abdel03)
- [@wyc0914](https://github.com/wyc0914)
- [@Sangye21](https://github.com/Sangye21)


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## License

[MIT](https://choosealicense.com/licenses/mit/)

