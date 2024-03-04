import AddAccountBtn from "@/app/lib/ui/dashboard/account/add-account-btn";
import AccountCard from "@/app/lib/ui/dashboard/account/account-card";
import SearchBar from "@/app/lib/ui/util/searchBar"
import { fetchAccTypeToUser } from "@/app/lib/data/accountType";
import { fetchFilteredAccounts } from "@/app/lib/data/accounts";
import { getDataFromToken } from "@/app/lib/data/jwtToken";
import { cookies } from "next/headers";

export default async function AccountPage({ searchParams }) {
  const storedCookies = cookies();
  const token = storedCookies.get("token");
  const userID = getDataFromToken(token.value).user_id;
  const accountTypesAvailable = await fetchAccTypeToUser(userID);
  const query = searchParams?.query || ""
  const filteredAccounts = await fetchFilteredAccounts(userID, query)
 
  return (
    <main className="bg-gray-950 h-full">
      <div className="flex justify-between mx-2">
        <h1 className="text-white text-3xl font-bold">Accounts</h1>
        <AddAccountBtn userID={userID} accountTypes={accountTypesAvailable} />
      </div>

      <div className="flex w-full mt-2">
        <div className="w-4/5 ml-2">
          <SearchBar placeholder="Search accounts by name, balance, account type"/>
        </div>
      </div>
      

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 mt-4 px-2 justify-items-center">
        {filteredAccounts.map((account) => {
          return (
            <AccountCard
              key={account.account_id}
              accName={account.name}
              accType={account.account_type_name}
              balance={account.balance}
              tracking={account.plaid_persistent_acc_id ? "auto" : "manual"}
            />
          );
        })}
      </div>
    </main>
  );
}
