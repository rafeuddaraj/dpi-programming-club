import { formatDate } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";


export default function Deadline({ deadline, title }) {
    return (
        <>
            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 mt-5">
                <CalendarIcon className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                    {title}:
                </span>
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {formatDate(deadline, { time: true })}
                </span>
            </div>
        </>
    );
}