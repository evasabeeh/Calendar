export const getDaysInMonth = (year, month) => {
    const daysInMonth = [
        31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];

    if (month === 1) {
        if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
            return 29;
        }
        return 28;
    }

    return daysInMonth[month];
};

export const getCurrentMonthDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    const daysInCurrentMonth = getDaysInMonth(year, month);
    const days = [];

    for (let i = 1; i <= daysInCurrentMonth; i++) {     // Dates of month to be generated
        days.push(i);
    }

    return days;
};
