import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import {  Calendar } from "lucide-react";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"




export default function TaskPerformance() {
    const defaultDataDate = new Date("2026-06-01");
    const [year] = React.useState(defaultDataDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = React.useState((defaultDataDate.getMonth() + 1).toString());


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

   

    const taskPerformanceData = [
        { date: "2026-06-01", created: 12, completed: 8 },
        { date: "2026-06-02", created: 18, completed: 10 },
        { date: "2026-06-03", created: 9, completed: 6 },
        { date: "2026-06-04", created: 22, completed: 15 },
        { date: "2026-06-05", created: 16, completed: 11 },
        { date: "2026-06-06", created: 25, completed: 20 },
        { date: "2026-06-07", created: 20, completed: 14 },
        { date: "2026-06-08", created: 14, completed: 9 },
        { date: "2026-06-09", created: 10, completed: 7 },
        { date: "2026-06-10", created: 28, completed: 21 },
        { date: "2026-06-11", created: 30, completed: 24 },
        { date: "2026-06-12", created: 17, completed: 13 },
        { date: "2026-06-13", created: 11, completed: 8 },
        { date: "2026-06-14", created: 26, completed: 19 },
        { date: "2026-06-15", created: 19, completed: 15 },
        { date: "2026-06-16", created: 23, completed: 18 },
        { date: "2026-06-17", created: 29, completed: 22 },
        { date: "2026-06-18", created: 8, completed: 5 },
        { date: "2026-06-19", created: 21, completed: 16 },
        { date: "2026-06-20", created: 24, completed: 19 },
        { date: "2026-06-21", created: 15, completed: 10 },
        { date: "2026-06-22", created: 18, completed: 14 },
        { date: "2026-06-23", created: 27, completed: 22 },
        { date: "2026-06-24", created: 13, completed: 9 },
        { date: "2026-06-25", created: 12, completed: 8 },
        { date: "2026-06-26", created: 25, completed: 20 },
        { date: "2026-06-27", created: 28, completed: 23 },
        { date: "2026-06-28", created: 16, completed: 11 },
        { date: "2026-06-29", created: 9, completed: 6 },
        { date: "2026-06-30", created: 30, completed: 25 },

        { date: "2026-07-01", created: 14, completed: 10 },
        { date: "2026-07-02", created: 20, completed: 15 },
        { date: "2026-07-03", created: 11, completed: 7 },
        { date: "2026-07-04", created: 26, completed: 20 },
        { date: "2026-07-05", created: 18, completed: 13 },
        { date: "2026-07-06", created: 29, completed: 24 },
        { date: "2026-07-07", created: 21, completed: 16 },
        { date: "2026-07-08", created: 15, completed: 10 },
        { date: "2026-07-09", created: 12, completed: 8 },
        { date: "2026-07-10", created: 27, completed: 22 },
        { date: "2026-07-11", created: 31, completed: 26 },
        { date: "2026-07-12", created: 19, completed: 14 },
        { date: "2026-07-13", created: 13, completed: 9 },
        { date: "2026-07-14", created: 28, completed: 21 },
        { date: "2026-07-15", created: 22, completed: 17 },
        { date: "2026-07-16", created: 24, completed: 19 },
        { date: "2026-07-17", created: 30, completed: 25 },
        { date: "2026-07-18", created: 10, completed: 6 },
        { date: "2026-07-19", created: 23, completed: 18 },
        { date: "2026-07-20", created: 26, completed: 20 },
        { date: "2026-07-21", created: 16, completed: 12 },
        { date: "2026-07-22", created: 19, completed: 14 },
        { date: "2026-07-23", created: 28, completed: 23 },
        { date: "2026-07-24", created: 14, completed: 10 },
        { date: "2026-07-25", created: 13, completed: 9 },
        { date: "2026-07-26", created: 27, completed: 22 },
        { date: "2026-07-27", created: 29, completed: 24 },
        { date: "2026-07-28", created: 17, completed: 12 },
        { date: "2026-07-29", created: 11, completed: 7 },
        { date: "2026-07-30", created: 32, completed: 27 },
        { date: "2026-07-31", created: 25, completed: 20 },
    ];

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


     const filteredData = taskPerformanceData.filter(item => {
        const date = new Date(item.date)
        const month = date.getMonth()  + 1;
        const yearMatch = date.getFullYear() === year;

        return month.toString() === selectedMonth && yearMatch;
    })


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
                        <ChartContainer config={chartConfig} className="aspect-auto h-80 w-full">
                            <AreaChart data={filteredData}>
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
                                dataKey="date"
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
                                fill="url(#fillMobile)"
                                stroke="var(--color-mobile)"
                                stackId="a"
                                />
                                <Area
                                dataKey="completed"
                                type="natural"
                                fill="url(#fillDesktop)"
                                stroke="var(--color-desktop)"
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