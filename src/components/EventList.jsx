import React, { useEffect } from "react";
import { getEventCategoryColor } from "../utils/eventColor";

export const EventList = ({ day, events, setEvents }) => {
    // Events of selectd day
    const eventsForDay = events.filter((event) => event.day === day);

    // Data persistence
    useEffect(() => {
        const savedEvents = JSON.parse(localStorage.getItem("events"));
        if (savedEvents) {
            setEvents(savedEvents);
        }
    }, [setEvents]);

    const handleDeleteEvent = (eventToDelete) => {
        // Remove the event from array
        const updatedEvents = events.filter(event => event !== eventToDelete);

        // Save updated events to localStorage
        localStorage.setItem("events", JSON.stringify(updatedEvents));

        // Update the state to reflect the deletion
        setEvents(updatedEvents);
    };

    const handleAddEvent = (newEvent) => {
        const updatedEvents = [...events, newEvent];
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        setEvents(updatedEvents);
    };

    return (
        <div className="bg-secondary p-4 mt-4">
            <h3 className="text-text font-bold mb-2">Events on {day}</h3>
            {eventsForDay.length === 0 ? (
                <p className="text-text">No events</p>
            ) : (
                eventsForDay.map((event, index) => (
                    <div
                        key={index}
                        className="mb-4 p-2 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black transition-shadow"
                        style={{
                            backgroundColor: getEventCategoryColor(event.category), // Apply category color
                        }}
                    >
                        <div className="flex justify-between m-2">
                            <div className="flex-grow">
                                <h4 className="font-bold text-text">{event.eventName}</h4>
                                <p className="text-text">{event.startTime} - {event.endTime}</p>
                                <p className="text-text">{event.description}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteEvent(event)}
                                className="bg-red-900 text-white p-2 my-4 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black transition-shadow"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))
            )}
        </div>
    );
};
