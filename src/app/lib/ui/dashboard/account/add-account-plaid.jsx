"use client";
import { createLinkToken, exchangePublicToken } from "@/app/lib/plaid/handshake";
import React from "react";
import { usePlaidLink } from "react-plaid-link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Image from "next/image";

const PLAID_BTN_STYLING = "flex items-center bg-emerald-500 p-2 rounded-md my-4 hover:bg-emerald-400";
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
          <Image 
            src="/dashboard/plaid-img.png"
            alt="plaid icon"
            width={36}
            height={36}
          />
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
      <Image 
            src="/dashboard/plaid-img.png"
            alt="plaid icon"
            width={36}
            height={36}
          />
      Link Through Plaid
    </button>
  );
}
