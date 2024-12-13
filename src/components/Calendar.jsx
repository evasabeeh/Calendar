import React, { useState } from "react";
import { EventModal } from "./EventModal";
import { EventList } from "./EventList";
import { saveAs } from "file-saver";
import { FilterEventsModal } from "./FilterEventsModal"; // Import the filter modal

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false); // State for filter modal
    const [searchKeyword, setSearchKeyword] = useState(""); // Search keyword state

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayDate = new Date();
    const today = todayDate.getDate();

    const getStartDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    const handlePrevMonth = () => {
        setCurrentDate((prevDate) => {
            const newMonth = prevDate.getMonth() - 1;
            const newYear = newMonth < 0 ? prevDate.getFullYear() - 1 : prevDate.getFullYear();
            return new Date(newYear, (newMonth + 12) % 12, 1);
        });
    };

    const handleNextMonth = () => {
        setCurrentDate((prevDate) => {
            const newMonth = prevDate.getMonth() + 1;
            const newYear = newMonth > 11 ? prevDate.getFullYear() + 1 : prevDate.getFullYear();
            return new Date(newYear, newMonth % 12, 1);
        });
    };

    const getDaysForCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const startDay = getStartDayOfMonth(year, month);
        const daysInMonth = getDaysInMonth(year, month);
        const daysGrid = [];

        for (let i = 0; i < startDay; i++) {
            daysGrid.push(null);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            daysGrid.push(i);
        }
        return daysGrid;
    };

    const handleSelectDay = (day) => {
        setSelectedDay(day);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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

    // Filter events based on the keyword (event name or category)
    const filterEvents = () => {
        if (!searchKeyword) return events; // Return all events if no search keyword
        return events.filter((event) =>
            event.eventName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            event.category.toLowerCase().includes(searchKeyword.toLowerCase())
        );
    };

    return (
        <div className="bg-secondary min-h-screen rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.9)]">
            {/* Calendar Grid */}
            <div className="flex flex-row items-center justify-between px-4 py-4 sm:px-2 sm:py-2 text-text">
                <button className="p-3 mx-1 font-semibold hover:rounded-lg hover:shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.9)]" onClick={handlePrevMonth}>&lt;</button>
                <h1 className="p-2 font-semibold text-2xl w-full text-center">
                    {currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}
                </h1>
                <button className="p-3 mx-1 font-semibold hover:rounded-lg hover:shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.9)]" onClick={handleNextMonth}>&gt;</button>
            </div>

            <div className="grid grid-cols-7 gap-1 pd-4 text-text">
                {dayNames.map((dayName, index) => (
                    <div
                        key={index}
                        className={`text-center my-6 font-semibold ${index === 0 || index === 6 ? "text-red-500" : "text-text"}`}
                    >
                        {dayName}
                    </div>
                ))}

                {getDaysForCalendar().map((day, index) => {
                    if (day === null) {
                        return <div key={index} className="p-4"></div>;
                    }

                    const isToday =
                        day === today &&
                        currentDate.getMonth() === todayDate.getMonth() &&
                        currentDate.getFullYear() === todayDate.getFullYear();

                    const isSelected = day === selectedDay;

                    const isFirstColumn = index % 7 === 0; 
                    const isLastColumn = index % 7 === 6; 

                    return (
                        <div
                            key={index}
                            className={`p-2 m-2 text-center cursor-pointer rounded-lg hover:shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.9)] hover:bg-primary hover:text-white
                ${isToday ? "bg-curr text-white font-bold" : isSelected ? "bg-primary text-white font-bold" : isFirstColumn || isLastColumn ? "bg-red-300" : ""}`}
                            onClick={() => handleSelectDay(day)}
                        >
                            {day}
                        </div>
                    );
                })}
            </div>


            <div className="flex justify-center space-x-4 mt-6 py-2">
                <button onClick={() => exportEventsAsJson(events)} className="bg-primary text-white p-2 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] 
                    hover:shadow-black transition-shadow ">Export as JSON</button>
                <button onClick={() => exportEventsAsCsv(events)} className="bg-primary text-white p-2 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] 
                    hover:shadow-black transition-shadow ">Export as CSV</button>
            </div>

            {/* Search bar */}
            <div className="p-4 flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search events on day (by name or category)"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="p-2 w-full border border-gray-300 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black transition-shadow"
                />
                <button
                    onClick={() => setIsFilterModalOpen(true)}
                    className="bg-primary text-white p-2 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black transition-shadow"
                >
                    Show
                </button>
            </div>


            {isFilterModalOpen && (
                <FilterEventsModal
                    events={filterEvents()}
                    closeModal={() => setIsFilterModalOpen(false)}
                />
            )}

            {isModalOpen && (
                <EventModal day={selectedDay} events={events} setEvents={setEvents} closeModal={closeModal} />
            )}

            {selectedDay && <EventList day={selectedDay} events={events} setEvents={setEvents} />}
        </div>
    );
};
