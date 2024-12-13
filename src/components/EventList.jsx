import React from "react";
import { getEventCategoryColor } from "../utils/eventColor"; // Import the color utility

export const EventList = ({ day, events }) => {
    const eventsForDay = events.filter((event) => event.day === day);

    return (
        <div className="bg-secondary p-4 rounded-lg mt-4 shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]">
            <h3 className="text-text font-bold mb-2">Events on {day}</h3>
            {eventsForDay.length === 0 ? (
                <p className="text-text">No events</p>
            ) : (
                eventsForDay.map((event, index) => (
                    <div
                        key={index}
                        className="mb-4 p-2 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]  hover:shadow-black transition-shadow"
                        style={{
                            backgroundColor: getEventCategoryColor(event.category), // Apply the color based on category
                        }}
                    >
                        <h4 className="font-bold text-text">{event.eventName}</h4>
                        <p className="text-text">{event.startTime} - {event.endTime}</p>
                        <p className="text-text">{event.description}</p>
                    </div>
                ))
            )}
        </div>
    );
};
