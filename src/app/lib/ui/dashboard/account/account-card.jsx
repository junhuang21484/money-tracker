import Link from "next/link";
import { UserIcon, WrenchIcon } from "@heroicons/react/24/outline";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { formatCurrency } from "../../../utils";

const trackingType = {
  manual: { icon: UserIcon, text: "MANUAL TRACKING" },
  auto: { icon: WrenchIcon, text: "AUTO TRACKING" },
};

export default function AccountCard({ accName, accType, balance, tracking }) {
  const { icon: TrackingIcon, text: trackingText } = trackingType[tracking];
  return (
    <section className="bg-gradient-to-r w-full max-w-96 h-[172px] from-purple-400 to-slate-200 shadow-md rounded-xl p-4 drop-shadow-lg hover:ring-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-lg font-extrabold text-gray-800">{accName}</h1>
          <p className="text-sm text-gray-600">{accType}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Balance</p>
          <h1 className="text-xl font-bold text-blue-600">
            {formatCurrency(balance)}
          </h1>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-2">
        <div className="flex  space-between w-full">
          <Link
            className="text-indigo-500 hover:text-blue-600 font-bold flex items-center gap-1 w-1/2"
            href="/"
          >
            View Details <ArrowRightCircleIcon className="w-5 h-5" />
          </Link>

          <div className="flex justify-end gap-2 items-center font-bold text-gray-500 w-1/2">
            <TrackingIcon className="w-4 h-4" />
            <p className="text-sm">{trackingText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
