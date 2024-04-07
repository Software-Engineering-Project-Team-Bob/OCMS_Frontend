import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ClassTimings.css';
import toast, { Toaster } from 'react-hot-toast';

function ClassTimings() {
  const { id: classCode } = useParams(); 
  const [formData, setFormData] = useState({
    day: 'saturday',
    time: {
      startTime: '12:00',
      endTime: '12:55'
    },
    classCode: classCode
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://ocms-backend.vercel.app/classes/setTimeTable', formData);
      console.log('Response:', response);

      if (response.status === 200) {
        toast.success('Class Timings Set Successfully');
      }
      if(response.status === 209) {
        toast.error(response.data.message);
      }
      setError(null);
    } catch (error) {
      // console.error('Error Setting Class Timings:', error);
      setError(error.data.message);
      toast.error('Error Setting Class Timings');
    }
  };

  // Handlers for changing day and time
  const handleDayChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      day: e.target.value
    }));
  };

  const handleStartTimeChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      time: {
        ...prevState.time,
        startTime: e.target.value
      }
    }));
  };

  const handleEndTimeChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      time: {
        ...prevState.time,
        endTime: e.target.value
      }
    }));
  };

  return (
    <div className="timings-class-timings-container">
      <h2>Set Class Timings</h2>
      {error && <div className="timings-error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="timings-form-group">
          <label htmlFor="day">Day:</label>
          <select
            name="day"
            value={formData.day}
            onChange={handleDayChange}
            className="timings-select">
            <option value="saturday">Saturday</option>
            <option value="sunday">Sunday</option>
            <option value="monday">Monday</option>
            <option value="tuesday">Tuesday</option>
            <option value="wednesday">Wednesday</option>
            <option value="thursday">Thursday</option>
            <option value="friday">Friday</option>
          </select>
        </div>
        <div className="timings-form-group">
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={formData.time.startTime}
            onChange={handleStartTimeChange}
            className="timings-input" />
        </div>
        <div className="timings-form-group">
          <label htmlFor="endTime">End Time:</label>
          <input
            type="time"
            name="endTime"
            value={formData.time.endTime}
            onChange={handleEndTimeChange}
            className="timings-input" />
        </div>
        <button type="submit" className="timings-submit-btn">Submit</button>
      </form>
      <div className="timings-form-group mt-4">
        <button
          onClick={() => {
            window.location.href = `/classes/${classCode}/calendar`;
          }}
          className="timings-submit-btn">Go to Class Calendar</button>
      </div>
      <Toaster />
    </div>
  );
}

export default ClassTimings;
