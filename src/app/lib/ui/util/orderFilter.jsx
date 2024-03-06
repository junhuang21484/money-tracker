'use client'
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function OrderFilter( {filterOption} ) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();
    const [selectedBtn, setSelectedBtn] = useState(null)
    
    function handleFilterChange( event ) {
        const params = new URLSearchParams(searchParams);
        const newFilter = event.target.value
        
        if (newFilter) params.set("orderBy", newFilter)
        else params.delete("orderBy")
        replace(`${pathname}?${params.toString()}`);
    }

    function orderBtnClick(filterDirection) {
        const params = new URLSearchParams(searchParams);

        if (filterDirection === selectedBtn) setSelectedBtn(null)
        else setSelectedBtn(filterDirection)

        if (filterDirection != selectedBtn) {
            params.set('filterDirection', filterDirection);
          } else {
            params.delete('filterDirection');
          }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="flex w-full h-full items-center gap-4 text-white">
            <h1>Order By: </h1>
            <select className="px-4 py-2 text-gray-700 bg-white border rounded-md" onChange={handleFilterChange}>
                {filterOption.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            
            <button>
                <ArrowUpIcon 
                className={clsx('w-6 h-6', {'text-blue-500': selectedBtn === 'ASC'})}
                onClick={() => orderBtnClick('ASC')}
                />
            </button>
            <button>
                <ArrowDownIcon 
                className={clsx('w-6 h-6', {'text-blue-500': selectedBtn === 'DESC'})}
                onClick={() => orderBtnClick('DESC')}
                />
            </button>
        </div>
    )
}