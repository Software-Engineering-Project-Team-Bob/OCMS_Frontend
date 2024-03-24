import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Calender = ({}) => {
  const [loading, setLoading] = useState(false);
  const [timetable, setTimetable] = useState([]);
  const classCode = useParams().id
  console.log("dnkfbvbdfhvef",classCode);

  const getCalender = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://ocms-backend.vercel.app/classes/getTimeTable", {
        
        classCode: classCode
      });

      console.log("response",response.data);

      setTimetable(response.data);  
    } catch (error) {
      console.error('Error fetching calendar:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCalender();
  }, []);
  

  return (
    loading ? (
      <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="row day-columns">
          {timetable.map(event => (
              <div className="day-column" key={event._id}>
                <div className="day-header">{event.day}</div>
                <div className="day-content">
                  {event.time && (
                    <div className="event gray">
                      <span className="title">Event Name</span>
                      <footer>
                        <span>{event.time.startTime} - {event.time.endTime}</span>
                      </footer>
                    </div>
                  )}
                </div>
                <div className="day-footer">{`${event.time ? 1 : 0} Task${event.time ? 's' : ''}`}</div>
              </div>
            ))}
            {/* dshsdfdsyuifsdhvoad */}
          </div>
        </div>
      </div>
    </div>

    ) :( 
      <div>
        <h1>Loading...</h1>
      </div>
    )

      );
};

export default Calender;
