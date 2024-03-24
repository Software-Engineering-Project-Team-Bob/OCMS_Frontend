import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Calendar.css";
import { CircularProgress } from "@material-ui/core";
import getRandomColor from "../../utils/getRandomColor";

export default function Calendar() {
  const [loading, setLoading] = useState(false);
  const [timetable, setTimetable] = useState([]);
  const [className, setClassName] = useState("");
  const { id: classCode } = useParams();

  const getCalendar = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://ocms-backend.vercel.app/classes/getTimeTable",
        {
          classCode: classCode,
        }
      );
      console.log("response", response.data.data);
      setClassName(response.data.data.className);
      const groupedTimetable = groupByDay(response.data.data.timetable);
      setTimetable(groupedTimetable);
    } catch (error) {
      console.error("Error fetching calendar:", error);
    }
    setLoading(false);
  };

  const groupByDay = (timetableData) => {
    const grouped = {};
    timetableData.forEach((item) => {
      const day = item.day.toLowerCase();
      if (!grouped[day]) {
        grouped[day] = [item];
      } else {
        grouped[day].push(item);
      }
    });
    return grouped;
  };

  useEffect(() => {
    getCalendar();
  }, [classCode]);

  const sortedDays = Object.keys(timetable).sort((a, b) => {
    const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    return daysOrder.indexOf(a.toLowerCase()) - daysOrder.indexOf(b.toLowerCase());
  });

  return (
    <>
      {!loading ? (
        <div className="container">
          <h1 className="text-center">Class Calendar for {className}</h1>
          <div className="row">
            <div className="col-12">
              <div className="row day-columns">
                {sortedDays.map((day) => (
                  <div className="day-column" key={day}>
                    <div className="day-header">{day}</div>
                    <div className="day-content">
                      {timetable[day].map((item) => (
                        <div
                          className={`event ${getRandomColor()}`} // Apply random color
                          key={item._id}
                        >
                          <div className="title">{item.className}</div>
                          <footer>
                            <span>{item.time.startTime}</span>
                            <span>{item.time.endTime}</span>
                          </footer>
                        </div>
                      ))}
                    </div>
                    <div className="day-footer">
                      Number of classes on this day: {timetable[day].length}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="col-12 d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <CircularProgress size={80} className="display-block" />
        </div>
      )}
    </>
  );
}
