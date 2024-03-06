import {
  BanknotesIcon,
  DocumentArrowUpIcon,
  CreditCardIcon,
  DocumentArrowDownIcon,
} from "@heroicons/react/24/outline";

const iconMap = {
  balance: BanknotesIcon,
  accType: CreditCardIcon,
  income: DocumentArrowDownIcon,
  expense: DocumentArrowUpIcon
};

export default function DetailCard({ title, value, type }) {
  const Icon = iconMap[type];

  return (
    <div className="w-full max-w-96 rounded-xl bg-gray-900 p-2 shadow-lg">
      <div className="flex p-4 w-full items-center justify-center text-emerald-500">
        {Icon ? <Icon className="h-5 w-5"/> : null}
        <h3 className="ml-2 text-xl font-medium">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-gray-800 px-4 py-8 text-center text-2xl">
        {value}
      </p>
    </div>
  );
}
