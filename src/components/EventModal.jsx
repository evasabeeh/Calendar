import React, { useState } from "react";

export const EventModal = ({ day, events, setEvents, closeModal }) => {
    const [eventName, setEventName] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("work"); // Default category set

    const handleAddEvent = () => {
        const newEvent = { day, eventName, startTime, endTime, description, category };

        // Check for overlapping events
        const isOverlap = events.some(
            (event) =>
                event.day === day &&
                ((newEvent.startTime >= event.startTime && newEvent.startTime < event.endTime) ||
                    (newEvent.endTime > event.startTime && newEvent.endTime <= event.endTime))
        );

        if (isOverlap) {
            alert("This event overlaps with another event on the same day.");
            return;
        }

        const updatedEvents = [...events, newEvent];
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        setEvents(updatedEvents);
        closeModal();
    };

    // Mandatory fields check
    const validateForm = () => {
        if (!eventName || !startTime || !endTime || !category) {
            alert('Please fill in all required fields');
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            handleAddEvent();
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center">
            <div className="bg-secondary p-6 relative w-96 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]">
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-4 p-3 text-text hover:bg-red-900 hover:text-white hover:rounded-lg hover:shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)]"
                >
                    &times;
                </button>

                <h2 className="text-primary font-semibold text-xl mb-4">Add Event</h2>

                <input
                    type="text"
                    placeholder="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black"
                />

                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black"
                />

                <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black"
                />

                <textarea
                    placeholder="Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black"
                />

                <div className="mb-4">
                    <label htmlFor="category" className="text-white">Event Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] hover:shadow-black"
                    >
                        <option value="work">Work</option>
                        <option value="personal">Personal</option>
                        <option value="others">Others</option>
                    </select>
                </div>

                <button
                    onClick={handleSubmit}
                    className="min-w-full p-2 bg-primary rounded-lg shadow-[5px_5px_10px_0px_rgba(0,_0,_0,_0.3)] text-white hover:shadow-black"
                >
                    Add Event
                </button>
            </div>
        </div>
    );
};
