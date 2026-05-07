import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {  Calendar } from "lucide-react";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { dailyStats } from "../../api/task";



export default function TaskPerformance() {
    const defaultDataDate = new Date();
    const [year] = React.useState(defaultDataDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = React.useState((defaultDataDate.getMonth() + 1).toString());
    const [chartData, setChartData] = React.useState<any[]>([]);


    const getDaysInMonth = (month: number, year: number): number => {
        return new Date(year, month, 0).getDate();
    };


    const renderOptions = () => {
          const monthsInYear = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
          return monthsInYear.map((name, index) => {
            const month = index + 1;
            const daysInMonth = getDaysInMonth(month, year);
            return ( 
                <SelectItem key={month} value={month.toString()}>
                        {`${name} 1  ${year} - ${name} ${daysInMonth} ${year}`}
                </SelectItem>
            )
          })
    }

   

   
    const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        desktop: {
            label: "Desktop",
            color: "var(--chart-1)",
        },
        mobile: {
            label: "Mobile",
            color: "var(--chart-2)",
        },
    } satisfies ChartConfig

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const month = Number(selectedMonth);

                const startDate = `${year}-${month
                    .toString()
                    .padStart(2, "0")}-01`;

                const endDate = `${year}-${month
                    .toString()
                    .padStart(2, "0")}-${getDaysInMonth(month, year)}`;

                const data = await dailyStats(startDate, endDate)
                console.log("API DATA:", data)
                setChartData(data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchStats();
    }, [selectedMonth, year])
     


    return (
        <div className="md:flex">
            <div className="flex-1">
                <Card className="pt-0">
                    <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                        <div className="grid flex-1 gap-1">
                            <CardDescription className="text-base text-gray-800 font-semibold">Task Perfomance</CardDescription>
                            <CardDescription className="text-xs">
                                    Showing total visitors for the last 3 months
                            </CardDescription>
                        </div>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger className="hidden w-60 rounded-lg sm:ml-auto sm:flex text-xs flex-row" aria-label="Select a value">
                            <Calendar size={15}/>
                            <SelectValue placeholder="Last 3 months" />
                        </SelectTrigger>
                        <SelectContent>
                            {renderOptions()}
                        </SelectContent>
                    </Select>
                    </CardHeader>
                    <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                        <ChartContainer config={chartConfig} className="aspect-auto h-70 w-full">
                            <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                    offset="5%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.8}
                                    />
                                    <stop
                                    offset="95%"
                                    stopColor="var(--color-desktop)"
                                    stopOpacity={0.1}
                                    />
                                </linearGradient>
                                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                    offset="5%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.8}
                                    />
                                    <stop
                                    offset="95%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.1}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false}/>
                           <XAxis
                                dataKey="day"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    })
                                }}
                                />
                                <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        })
                                    }}
                                    indicator="dot"
                                    />
                                }
                                />
                            <Area
                                dataKey="created"
                                type="natural"
                                stroke="#9fbf92"
                                fill="#315822"
                                stackId="a"
                                />
                                <Area
                                dataKey="completed"
                                type="natural"
                                stroke="#9fbf92"
                                fill="#e8f2e3"
                                stackId="a"
                            />
                            </AreaChart>
                            <ChartLegend content={<ChartLegendContent />} />
                        </ChartContainer>

                    </CardContent>

                </Card>
            </div>
        </div>
    )
}