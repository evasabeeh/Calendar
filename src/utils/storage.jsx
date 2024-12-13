export const getCurrentMonthDays = (date) => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days = [];

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        days.push(i);
    }
    return days;
};
