import { DateSelector } from "./Calendar/date";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";


export default function CalendarTask() {
    const today = new Date();

    const options: Intl.DateTimeFormatOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const fulldate = today.toLocaleDateString('en-US', options);

  return (
    <div className="md-flex">
        <Card>
            <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                    <CardDescription className='text-green-700 font-semibold'>
                        Calendar
                    </CardDescription>
                     <Button variant="link" className="text-xs ">
                      See all
                     </Button>
                </div>
                <div className="flex items-baseline flex-col">
                    <CardDescription className="text-xs">Today</CardDescription>
                     <CardTitle className="text-2xl font-semibold tabular-nums">
                        {fulldate}
                    </CardTitle>
                </div>
                 <DateSelector/>
            </CardHeader>
        </Card>
    </div>
  )
}
