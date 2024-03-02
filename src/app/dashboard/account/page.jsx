import AddAccountBtn from "@/app/lib/ui/dashboard/account/add-account-btn";
import AccountCard from "@/app/lib/ui/dashboard/account/account-card";
import { fetchAccTypeToUser } from "@/app/lib/data/accountType"
import { getDataFromToken } from "@/app/lib/data/jwtToken"
import { cookies } from "next/headers";

export default async function AccountPage() {
  const storedCookies = cookies()
  const token = storedCookies.get("token")
  const userID = getDataFromToken(token.value)
  const accountTypeAvailable = await fetchAccTypeToUser(userID)
  console.log(accountTypeAvailable)
  return (
    <main className="bg-gray-950 h-full min-h-screen">
      <div className="flex justify-between">
        <h1 className="text-white text-3xl font-bold">Accounts</h1>
        <AddAccountBtn />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 mt-4 px-2 justify-items-center">
        <AccountCard
          accName={"Bank of America OF ASD SOAD ASO  - Checking"}
          accType={"Checking"}
          balance={10000000}
          tracking={"auto"}
        />
        <AccountCard
          accName={"Robinhood"}
          accType={"Investment"}
          balance={2000000}
          tracking={"manual"}
        />
        <AccountCard
          accName={"Cash"}
          accType={"Other"}
          balance={-666.66}
          tracking={"manual"}
        />
        <AccountCard
          accName={"Chase - Checking"}
          accType={"Checking"}
          balance={15}
          tracking={"auto"}
        />
      </div>
    </main>
  );
}
