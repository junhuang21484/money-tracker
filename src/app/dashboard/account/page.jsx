import AddAccountBtn from "@/app/lib/ui/dashboard/account/add-account-btn";
import AccountCard from "@/app/lib/ui/dashboard/account/account-card";

export default function AccountPage() {
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
          balance={"1088.88"}
          tracking={"auto"}
        />
        <AccountCard
          accName={"Robinhood"}
          accType={"Investment"}
          balance={999.88}
          tracking={"manual"}
        />
        <AccountCard
          accName={"Cash"}
          accType={"Other"}
          balance={666.66}
          tracking={"manual"}
        />
        <AccountCard
          accName={"Chase - Checking"}
          accType={"Checking"}
          balance={"1088.88"}
          tracking={"auto"}
        />
      </div>
    </main>
  );
}
