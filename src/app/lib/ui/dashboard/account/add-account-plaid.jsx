"use client";
import { createLinkToken, exchangePublicToken } from "@/app/lib/plaid/handshake";
import React from "react";
import { usePlaidLink } from "react-plaid-link";
import { useEffect, useState } from "react";
import clsx from "clsx";

const PLAID_BTN_STYLING = "bg-indigo-500 p-2 rounded my-4 hover:bg-indigo-600";
export default function AddAccountPlaid({ userID }) {
  const [linkToken, setLinkToken] = useState(null);
  const [returnData, setReturnData] = useState({ success: false, msg: "" });
  const generateToken = async () => {
    const data = await createLinkToken(userID);
    setLinkToken(data.link_token);
  };

  useEffect(() => {
    generateToken();
  }, []);

  return (
    <div>
      {!linkToken ? (
        <button className={PLAID_BTN_STYLING} disabled>
          Loading Plaid...
        </button>
      ) : (
        <PlaidLink userID={userID} linkToken={linkToken} callback={setReturnData} />
      )}

      {returnData.msg && (
        <p
          className={clsx(
            { "text-green-500": returnData.success },
            { "text-red-500": !returnData.success }
          )}
        >
          {returnData.msg}
        </p>
      )}
    </div>
  );
}

function PlaidLink({ userID, linkToken, callback }) {
  const onSuccess = React.useCallback(async (publicToken, metadata) => {
    // send public_token to server
    const institutionName = metadata.institution.name
    const data = await exchangePublicToken(userID, publicToken, institutionName)
    callback(data)
  }, []);
  const config = { token: linkToken, onSuccess };
  const { open, ready } = usePlaidLink(config);
  return (
    <button
      onClick={() => open()}
      disabled={!ready}
      className={PLAID_BTN_STYLING}
    >
      Link Through Plaid
    </button>
  );
}


// {
//   "status": null,
//   "link_session_id": "2dab2014-cbb0-4588-b9d3-d5a390167a36",
//   "institution": {
//       "name": "TD Bank",
//       "institution_id": "ins_14"
//   },
//   "accounts": [
//       {
//           "id": "nWqD8qxy4ghp6W1b6XXMHjvR9V71MBi3XZPvQ",
//           "name": "Plaid Checking",
//           "mask": "0000",
//           "type": "depository",
//           "subtype": "checking",
//           "verification_status": null,
//           "class_type": null
//       },
//       {
//           "id": "b7bXmbPLpNUq3Wo13ZZLuZ6jWE9RgDtoJEg86",
//           "name": "Plaid Saving",
//           "mask": "1111",
//           "type": "depository",
//           "subtype": "savings",
//           "verification_status": null,
//           "class_type": null
//       }
//   ],
//   "account": {
//       "id": "nWqD8qxy4ghp6W1b6XXMHjvR9V71MBi3XZPvQ",
//       "name": "Plaid Checking",
//       "mask": "0000",
//       "type": "depository",
//       "subtype": "checking",
//       "verification_status": null,
//       "class_type": null
//   },
//   "account_id": "nWqD8qxy4ghp6W1b6XXMHjvR9V71MBi3XZPvQ",
//   "transfer_status": null,
//   "wallet": null,
//   "public_token": "public-sandbox-ce6fd909-04bf-4c5b-9d4e-9cfe3342adde"
// }