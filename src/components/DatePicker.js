// src/components/DatePicker.js
import React from 'react';
import useStore from '../store';
import RecurrenceOptions from './RecurrenceOptions';
import CalendarPreview from './CalendarPreview';
import DateInput from './DateInput';

const DatePicker = () => {
    const { startDate, endDate, recurrence, setStartDate, setEndDate, setRecurrence } = useStore();

    const handleRecurrenceChange = (newRecurrence) => {
        setRecurrence(newRecurrence);
    };

    return (
        <div className="p-4 border rounded-lg bg-white shadow"> {/* Added bg-white and shadow for DatePicker */}
            <h2 className="text-lg font-bold">Select Recurring Dates</h2>
            <DateInput startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} />
            <RecurrenceOptions recurrence={recurrence} setRecurrence={handleRecurrenceChange} />
            <CalendarPreview startDate={startDate} endDate={endDate} recurrence={recurrence} />
        </div>
    );
};

export default DatePicker;
