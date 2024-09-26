import React, { useState, useEffect } from 'react';

const RecurrenceOptions = ({ recurrence, setRecurrence }) => {
    const [startDate] = useState(new Date());
    const [dates, setDates] = useState([]); // Combined dates for preview and future

    const handlePatternChange = (event) => {
        const newPattern = event.target.value;
        setRecurrence({
            ...recurrence,
            pattern: newPattern,
            selectedDays: [], // Reset selected days when changing pattern
            nthDay: null,
        });

        // Reset dates when changing the pattern
        setDates([]);
    };

    const handleDaysChange = (day) => {
        const updatedDays = recurrence.selectedDays.includes(day)
            ? recurrence.selectedDays.filter(d => d !== day)
            : [...recurrence.selectedDays, day];

        setRecurrence({
            ...recurrence,
            selectedDays: updatedDays,
        });

        // Clear default dates when a day is selected
        if (updatedDays.length > 0) {
            setDates([]); // Clear the default dates if any day is selected
        }

        // Calculate the dates based on selected days
        calculateDates(updatedDays);
    };

    const calculateDates = (selectedDays) => {
        const datesArray = [];
        let currentDate = new Date(startDate);

        // Loop for the next 30 days
        for (let i = 0; i < 30; i++) {
            const currentDay = currentDate.getDay();
            if (selectedDays.includes(currentDay)) {
                datesArray.push(currentDate.toDateString());
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        setDates(datesArray);
    };

    const handleNthChange = (event) => {
        setRecurrence({
            ...recurrence,
            nthDay: parseInt(event.target.value, 10),
        });
    };

    const handleIntervalChange = (event) => {
        setRecurrence({
            ...recurrence,
            interval: parseInt(event.target.value, 10) || 1, // Default to 1 if empty
        });
    };

    useEffect(() => {
        // Recalculate dates when pattern or selected days change
        calculateDates(recurrence.selectedDays);
    }, [recurrence.pattern, recurrence.selectedDays, startDate]);

    return (
        <div>
            <label>Recurrence Pattern:</label>
            <select value={recurrence.pattern} onChange={handlePatternChange}>
                <option value="daily">Every X days</option>
                <option value="weekly">Every X weeks</option>
                <option value="monthly">Every X months</option>
                <option value="yearly">Every X years</option>
            </select>

            {recurrence.pattern === 'weekly' && (
                <div>
                    <label>Select Days:</label>
                    <div>
                        {Array.from({ length: 7 }, (_, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    checked={recurrence.selectedDays.includes(index)}
                                    onChange={() => handleDaysChange(index)}
                                />
                                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][index]}
                            </label>
                        ))}
                    </div>
                </div>
            )}

            {recurrence.pattern === 'monthly' && (
                <div>
                    <label>Enter nth Day:</label>
                    <input type="number" value={recurrence.nthDay || ''} onChange={handleNthChange} />
                </div>
            )}

            <div>
                <label>Interval:</label>
                <input type="number" value={recurrence.interval || 1} onChange={handleIntervalChange} />
            </div>

            <div>
                <h3>Selected Dates:</h3>
                {dates.length > 0 ? (
                    <ul>
                        {dates.map((date, index) => (
                            <li key={index}>{date}</li>
                        ))}
                    </ul>
                ) : (
                    <p>No dates available. Please select a day of the week.</p>
                )}
            </div>
        </div>
    );
};

export default RecurrenceOptions;
