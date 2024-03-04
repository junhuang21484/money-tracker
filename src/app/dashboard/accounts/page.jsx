import AddAccountBtn from "@/app/lib/ui/dashboard/account/add-account-btn";
import AccountCard from "@/app/lib/ui/dashboard/account/account-card";
import { fetchAccTypeToUser } from "@/app/lib/data/accountType";
import { fetchAccountByUserID } from "@/app/lib/data/accounts";
import { getDataFromToken } from "@/app/lib/data/jwtToken";
import { cookies } from "next/headers";
import { findFieldGivenArrObj } from "@/app/lib/utils"

export default async function AccountPage() {
  const storedCookies = cookies();
  const token = storedCookies.get("token");
  const userID = getDataFromToken(token.value).user_id;
  const accountTypesAvailable = await fetchAccTypeToUser(userID);
  const userAccounts = await fetchAccountByUserID(userID);
 
  return (
    <main className="bg-gray-950 h-full min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-white text-3xl font-bold">Accounts</h1>
        <AddAccountBtn userID={userID} accountTypes={accountTypesAvailable} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 mt-4 px-2 justify-items-center">
        {userAccounts.map((account) => {
          return (
            <AccountCard
              key={account.account_id}
              accName={account.name}
              accType={findFieldGivenArrObj(accountTypesAvailable, "account_type_id", account.account_type_id, "name")}
              balance={account.balance}
              tracking={account.plaid_account_id ? "auto" : "manual"}
            />
          )
        })}
      </div>
    </main>
  );
}
