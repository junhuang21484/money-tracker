import { fetchGoalAccountByGoalId } from "@/app/lib/data/goals";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from 'clsx'

function calculateCurrentAmt(relatedAcc, allAccountInfo) {
  let currentAmt = 0;
  relatedAcc.map((goalAccount) => {
    const matchingAccount = allAccountInfo.find(account => account.account_id === goalAccount.account_id);
    if (matchingAccount.is_depository) currentAmt += matchingAccount.balance;
    else currentAmt -= matchingAccount.balance;
  })
  return currentAmt
}

export default async function GoalCard({ goalData, allAccountInfo }) {
  const goalName = goalData.name;
  const targetAmt = goalData.target_amount;
  const relatedAcc = await fetchGoalAccountByGoalId(goalData.goal_id);
  const currentAmt = calculateCurrentAmt(relatedAcc, allAccountInfo);
  const progress = Math.max(Math.min((currentAmt / targetAmt) * 100, 100), 0)
  const circumference = 30 * 2 * Math.PI;

  return (
    <section className={clsx(
      'min-w-80 shadow-md rounded-md p-4 flex items-center',
      {'bg-emerald-600': progress === 100,
        'bg-gray-800': progress < 100
      }
    )}>
      {/* Circular progress bar */}
      <div className="relative w-20 h-20">
        <svg className="w-full h-full">
          {/* Background circle */}
          <circle className="text-gray-300" strokeWidth="5" stroke="currentColor" fill="transparent" r="30" cx="40" cy="40" />
          {/* Progress circle */}
          <circle
            className="text-emerald-500"
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (progress / 100) * circumference}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="30"
            cx="40"
            cy="40"
            transform="rotate(-90 40 40)"
          />
          {/* Progress percentage */}
          <text className="text-white font-bold text-lg" x="50%" y="50%" fill='white' textAnchor="middle" dominantBaseline="middle">
            {progress.toFixed(0)}%
          </text>
        </svg>
        
      </div>
      {/* Goal information */}
      <div className="ml-4">
        <div className="flex w-full justify-between items-center">
            <h2 className="text-xl font-bold">{goalName}</h2>
            <div className="flex gap-2">
                <PencilSquareIcon className="w-5 h-5 text-gray-500 cursor-pointer" />
                <TrashIcon className="w-5 h-5 text-red-500 cursor-pointer" />
            </div>
        </div>
        
        <div className="text-gray-300">
          <p>Target Amount: ${targetAmt}</p>
          <p>Current Amount: ${currentAmt}</p>
        </div>
      </div>
    </section>
  );
}
