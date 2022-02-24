import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

const BigCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://api.lyvecom.com/1/personalmeeting/621391e1252a8105105e4fe2"
      );

      setData(result.data?.result?.schedule_time);
    };

    fetchData();
  }, []);

  const myEventsList = [
    {
      title: "Schedule Time",
      allDay: true,
      start: new Date(parseInt(data)),
      end: new Date(parseInt(data)),
    },
  ];
  return (
    <div>
      {data && (
        <Calendar
          localizer={localizer}
          date={new Date(parseInt(data))}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          defaultDate={new Date(parseInt(data))}
          style={{
            height: 400,
          }}
        />
      )}
    </div>
  );
};

export default BigCalendar;
