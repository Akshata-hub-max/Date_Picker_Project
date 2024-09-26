// components/CalendarPreview.js
import React from 'react';
import RecurrenceOptions from './RecurrenceOptions';

// Utility function to format dates
const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
};

const generateDates = (startDate, endDate, recurrence) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        // Handle nth occurrences for monthly recurrence
        if (recurrence.pattern === 'monthly' && recurrence.nthDay) {
            const dayOfMonth = recurrence.nthDay; // Get the nth day
            const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayOfMonth);

            if (targetDate >= startDate && targetDate <= endDate) {
                dates.push(targetDate);
            }
            currentDate.setMonth(currentDate.getMonth() + 1);
            continue; // Skip to the next iteration
        }

        dates.push(new Date(currentDate)); // Add the current date

        // Adjust based on the recurrence pattern and interval
        switch (recurrence.pattern) {
            case 'daily':
                currentDate.setDate(currentDate.getDate() + (recurrence.interval || 1));
                break;
            case 'weekly':
                currentDate.setDate(currentDate.getDate() + (recurrence.interval || 1) * 7);
                break;
            case 'monthly':
                currentDate.setMonth(currentDate.getMonth() + (recurrence.interval || 1));
                break;
            case 'yearly':
                currentDate.setFullYear(currentDate.getFullYear() + (recurrence.interval || 1));
                break;
            default:
                break;
        }
    }
    return dates;
}; 



const CalendarPreview = ({ startDate, endDate, recurrence }) => {
    const dates = generateDates(startDate, endDate, recurrence);
    
    return (
        <div className="my-4">
            <h3 className="text-lg font-semibold">Preview:</h3>
            <ul>
                {dates.map((date, index) => (
                    <li key={index}>{formatDate(date)}</li> // Use formatted date
                ))}
            </ul>
        </div>
    );
};

export default CalendarPreview;
