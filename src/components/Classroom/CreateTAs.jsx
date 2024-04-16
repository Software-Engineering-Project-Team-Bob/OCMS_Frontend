import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ClassTimings.css';
import toast, { Toaster } from 'react-hot-toast';

function ClassTimings() {
  const { id: classCode } = useParams(); 
  const [formData, setFormData] = useState({
    TAs:"",
    classCode: classCode
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://ocms-backend.vercel.app/classes/createTAs', formData);
      console.log('Response:', response);

      if (response.status === 200) {
        toast.success('Class TA set Successfully');
      }
      if(response.status === 209) {
        toast.error(response.data.message);
      }
      setError(null);
    } catch (error) {
      console.error('Error Setting TA of Class:', error);
      setError(error.message);
      toast.error('Error Setting Class TAs');
    }
  };

  const handleClassCode = (e) => {
    setFormData({
      ...formData,
      classCode: e.target.value,
    });
  }

  const handleMembersChange = (e) => {
    setFormData({
      ...formData,
    TAs: e.target.value,
    });
  }

  

  return (
    <div className="timings-class-timings-container">
      <h2>Set Class TA </h2>
      
      <form onSubmit={handleSubmit}>
       
        <div className="timings-form-group">
          <label htmlFor="classCode">Class Code</label>
          <input
            type="text"
            id="classCode"
            name="classCode"
            value={formData.classCode}
            onChange={handleClassCode}
            required
          />
        </div>
        <div className="timings-form-group">
          <label htmlFor="members">Members</label>
          <input
            type="text"
            id="members"
            name="members"
            value={formData.members}
            onChange={handleMembersChange}
            required
          />
        </div>
        
        <button type="submit" className="timings-submit-btn">Submit</button>
      </form>
      
      <Toaster />
    </div>
  );
}

export default ClassTimings;
