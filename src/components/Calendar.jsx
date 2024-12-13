import React, { useState } from "react";
import { EventModal } from "./EventModal";
import { EventList } from "./EventList";
import { getCurrentMonthDays } from "../utils/storage";
import { saveAs } from "file-saver"; 

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const todayDate = new Date();
    const today = todayDate.getDate();
    const currentMonthDays = getCurrentMonthDays(currentDate);

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const getStartDayOfMonth = (date) => {
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        return firstDayOfMonth.getDay();
    };

    const handlePrevMonth = () => {
        const prevMonth = new Date(currentDate);
        prevMonth.setMonth(prevMonth.getMonth() - 1);
        prevMonth.setDate(1);
        setCurrentDate(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setDate(1);
        setCurrentDate(nextMonth);
    };

    const handleSelectDay = (day) => {
        setSelectedDay(day);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const getDaysForCalendar = () => {
        const startDay = getStartDayOfMonth(currentDate);
        const daysInMonth = currentMonthDays.length;
        const daysGrid = [];

        for (let i = 0; i < startDay; i++) {
            daysGrid.push(null);
        }

        for (let i = 1; i <= daysInMonth; i++) {
            daysGrid.push(i);
        }

        return daysGrid;
    };

    const exportEventsAsJson = (events) => {
        const jsonBlob = new Blob([JSON.stringify(events, null, 2)], { type: "application/json" });
        saveAs(jsonBlob, "events.json");
    };

    const exportEventsAsCsv = (events) => {
        const csv = events
            .map((event) => `${event.day},${event.eventName},${event.startTime},${event.endTime},${event.description}`)
            .join("\n");
        const csvBlob = new Blob([csv], { type: "text/csv" });
        saveAs(csvBlob, "events.csv");
    };


    return (
        <div className="bg-secondary min-h-screen rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]">
            <div className="flex justify-between p-4 text-text">
                <button className="p-3 font-semibold hover:rounded-lg hover:shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]" onClick={handlePrevMonth}>&lt; Prev</button>
                <h1 className="p-2 font-semibold text-2xl sm:text-center w-full">
                    {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
                </h1>
                <button className="p-3 font-semibold hover:rounded-lg hover:shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]" onClick={handleNextMonth}>Next &gt;</button>
            </div>

            <div className="grid grid-cols-7 gap-1 p-4 font-semibold text-text">
                {dayNames.map((dayName, index) => (
                    <div
                        key={index}
                        className={`text-center ${dayName === "Sun" || dayName === "Sat" ? "text-red-500" : "text-black"}`}
                    >
                        {dayName}
                    </div>
                ))}
            </div>


            <div className="grid grid-cols-7 gap-1 p-4">
                {getDaysForCalendar().map((day, index) => {
                    if (day === null) {
                        return <div key={index} className="flex justify-center items-center p-4"></div>;
                    }

                    const dayOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getDay();

                    return (
                        <div
                            key={day}
                            className={`flex justify-center items-center p-4 m-1 cursor-pointer rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black transition-shadow 
                    ${selectedDay === day ? "bg-primary text-white" :
                                    today === day && currentDate.getMonth() === todayDate.getMonth() ? "bg-curr text-white" :
                                        index % 7 === 6 || index % 7 === 0 ? "bg-weekend text-white" : "bg-white"}`}
                            onClick={() => handleSelectDay(day)}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>



            <div className="flex justify-center space-x-4 mt-4 py-2">
                <button onClick={() => exportEventsAsJson(events)} className="bg-primary text-white p-2 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black transition-shadow">Export as JSON</button>
                <button onClick={() => exportEventsAsCsv(events)} className="bg-primary text-white p-2 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black transition-shadow">Export as CSV</button>
            </div>

            {isModalOpen && (
                <EventModal day={selectedDay} events={events} setEvents={setEvents} closeModal={closeModal} />
            )}

            {selectedDay && <EventList day={selectedDay} events={events} setEvents={setEvents} />}
        </div>
    );
};
