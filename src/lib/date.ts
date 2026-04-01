export function getCurrentWeek() {
    const today = new Date();
    const dayOfWeek = today.getDay();

    // Monday start
    const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    const days = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i); // increment correctly

        days.push({
            label: date.toLocaleDateString("en-US", { weekday: "short" }),
            date: date.getDate(),
            fullDate: date,
            active: date.toDateString() === today.toDateString(),
        });
    }

    return days;
}