import { getCurrentWeek } from "../../lib/date"



export function DateSelector() {
    const days = getCurrentWeek();
    console.log(days)


    return (
        <div className="flex gap-2 w-full">
            {days.map((day, i) => (
                <button key={i} className={`flex-1 flex flex-col items-center justify-center rounded-xl px-2 py-6 text-sm border
                        ${day.active ? "bg-green text-white" : "bg-white text-gray-600"}`}>
                <span className="text-sm">{day.label}</span>
                <span className="text-sm">{day.date}</span>
                </button>
            ))}
        </div>
    );
}