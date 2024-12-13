import React, { useState } from "react";

export const EventModal = ({ day, events, setEvents, closeModal }) => {
    const [eventName, setEventName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("work"); // Default category set

    const handleAddEvent = () => {
        const newEvent = { day, eventName, startTime, endTime, description, category };
        const updatedEvents = [...events, newEvent];
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        setEvents(updatedEvents);
        closeModal();
    };

    // To check if all mandatory fields are filled up
    const validateForm = () => {
        if (!eventName || !startTime || !endTime || !category) {
            alert('Please fill in all required fields');
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            handleAddEvent(eventName, startTime, endTime, description, category);
            closeModal();
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-primary p-6 relative w-96 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]">
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-4 p-3 text-white hover:bg-red-900 hover:rounded-lg hover:shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]"
                >
                    &times;
                </button>

                <h2 className="text-white text-xl mb-4">Add Event</h2>

                <input
                    type="text"
                    placeholder="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]"
                />

                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]"
                />

                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]"
                />

                <textarea
                    placeholder="Description (Optional)" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]"
                />

                <div className="mb-4">
                    <label htmlFor="category" className="text-white">Event Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]"
                    >
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="others">Others</option>
                    </select>
                </div>

                <button
                    onClick={handleSubmit}
                    className="min-w-full p-2 bg-secondary text-primary font-bold rounded-lg hover:bg-gray-300 hover:rounded-lg hover:shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]"
                >
                    Add Event
                </button>
            </div>
        </div>
    );
};
