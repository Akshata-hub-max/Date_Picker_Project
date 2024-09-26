// components/DateInput.js
import React from 'react';

const DateInput = ({ startDate, endDate, setStartDate, setEndDate }) => {
    return (
        <div className="my-4">
            <label className="block mb-2">Start Date:</label>
            <input
                type="date"
                value={startDate.toISOString().split('T')[0]}
                onChange={(e) => setStartDate(new Date(e.target.value))}
                className="border rounded p-2"
            />
            <label className="block mb-2">End Date:</label>
            <input
                type="date"
                value={endDate.toISOString().split('T')[0]}
                onChange={(e) => setEndDate(new Date(e.target.value))}
                className="border rounded p-2"
            />
        </div>
    );
};

export default DateInput;
