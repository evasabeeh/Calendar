import React from "react";

export const FilterEventsModal = ({ events, closeModal }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-secondary p-6 relative w-96 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]">
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-4 p-3 text-text hover:bg-red-900 hover:rounded-lg hover:shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]"
                >
                    &times;
                </button>

                <h2 className="text-primary font-semibold text-xl mb-4">Filtered Events</h2>

                {events.length === 0 ? (
                    <p className="text-text">No events found based on your search.</p>
                ) : (
                    events.map((event, index) => (
                        <div key={index} className="mb-4 p-2 rounded-lg  shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black">
                            <h4 className="font-bold text-primary">{event.eventName}</h4>
                            <p className="text-text">{event.startTime} - {event.endTime}</p>
                            <p className="text-text">{event.category}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
