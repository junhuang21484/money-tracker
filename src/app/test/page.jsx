import {fetchUserByID} from '@/app/lib/data/user'

export default function TestPage() {
    const data = fetchUserByID('asd')
    console.log("Fetched Data;", data)
    return (
        <div>
            <button className="bg-blue-500 p-2 rounded">Click to test</button>
        </div>
    )
}