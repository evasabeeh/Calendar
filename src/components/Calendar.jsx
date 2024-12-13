import React, { useState, useEffect } from "react";
import { EventModal } from "./EventModal";
import { EventList } from "./EventList";
import { getCurrentMonthDays } from "../utils/storage";
import { saveAs } from "file-saver"; // We'll use this to save the file

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


export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const currentMonthDays = getCurrentMonthDays(currentDate);

    useEffect(() => {
        const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
        setEvents(savedEvents);
    }, []);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    const handleSelectDay = (day) => {
        setSelectedDay(day);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-secondary min-h-screen">
            <div className="flex justify-between p-4 text-text">
                <button className="p-3 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black transition-shadow" onClick={handlePrevMonth}>&lt; Prev</button>
                <h1 className="p-2 font-semibold text-2xl">{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</h1>
                <button className="p-3 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black transition-shadow" onClick={handleNextMonth}>Next &gt;</button>
            </div>

            <div className="grid grid-cols-7 gap-1 p-4 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]">
                {currentMonthDays.map((day) => (
                    <div
                        key={day}
                        className={`flex justify-center items-center p-4 cursor-pointer text-text rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black transition-shadow ${selectedDay === day ? "bg-primary text-white" : "bg-white"
                            }`}
                        onClick={() => handleSelectDay(day)}
                    >
                        {day}
                    </div>
                ))}
            </div>


            {isModalOpen && (
                <EventModal day={selectedDay} events={events} setEvents={setEvents} closeModal={closeModal} />
            )}

            {selectedDay && <EventList day={selectedDay} events={events} />}

            <div className="flex justify-center space-x-4 mt-4">
                <button onClick={() => exportEventsAsJson(events)} className="bg-primary text-white p-2 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black transition-shadow">Export as JSON</button>
                <button onClick={() => exportEventsAsCsv(events)} className="bg-primary text-white p-2 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black transition-shadow">Export as CSV</button>
            </div>
        </div>
    );
};
