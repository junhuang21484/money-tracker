import AddAccountBtn from "@/app/lib/ui/dashboard-account/add-account-btn";
import AccountCard from "@/app/lib/ui/dashboard-account/account-card";
import SearchBar from "@/app/lib/ui/util/searchBar";
import OrderFilter from "@/app/lib/ui/util/orderFilter";
import { fetchAccTypeToUser } from "@/app/lib/data/accountType";
import { fetchFilteredAccounts } from "@/app/lib/data/accounts";
import { getLoggedInUserID } from "@/app/lib/data/jwtToken";

export default async function AccountPage({ searchParams }) {
  const userID = await getLoggedInUserID()
  const accountTypesAvailable = await fetchAccTypeToUser(userID);
  const query = searchParams?.query || "";
  const orderBy = searchParams?.orderBy || "";
  const filterDirection = searchParams?.filterDirection || "";
  const filteredAccounts = await fetchFilteredAccounts(
    userID,
    query,
    orderBy,
    filterDirection
  );

  return (
    <main className="bg-gray-950 h-full w-full flex flex-col p-4">
      <div className="flex flex-col mx-2">
        <div className="flex justify-between">
          <h1 className="text-white text-3xl font-bold">Accounts</h1>
          <AddAccountBtn userID={userID} accountTypes={accountTypesAvailable} />
        </div>

        <div className="flex flex-col sm:flex-row w-full my-4 gap-2">
          <div className="sm:w-3/5 2xl:w-4/5">
            <SearchBar placeholder="Search accounts by name, balance, account type" />
          </div>

          <div className="sm:w-2/5 2xl:w-1/5 ">
            <OrderFilter filterOption={["", "Name", "Balance"]} />
          </div>
        </div>
      </div>

      {filteredAccounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 mt-4 px-2 justify-items-center">
          {filteredAccounts.map((account) => {
            return (
              <AccountCard
                key={account.account_id}
                accID={account.account_id}
                accName={account.name}
                accType={account.account_type_name}
                balance={account.balance}
                tracking={account.plaid_account_id ? "auto" : "manual"}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-1 justify-center items-center mt-10">
          <h1 className="text-white text-2xl">No accounts found</h1>
        </div>
      )}
    </main>
  );
}
