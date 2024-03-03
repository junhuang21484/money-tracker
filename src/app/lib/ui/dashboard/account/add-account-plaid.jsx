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
    const data = await exchangePublicToken(userID, publicToken)
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
