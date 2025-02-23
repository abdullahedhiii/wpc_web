import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { useCompanyContext } from "../../contexts/CompanyContext";

const HolidayCalendar = () => {
  const { user } = useSelector((state) => state.user);
  const { fetchHolidayList, holidayList } = useCompanyContext();
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    fetchHolidayList();
  }, []);

  useEffect(() => {
    if (holidayList.length > 0) {
      const extractedHolidays = holidayList.flatMap((holiday) => {
        const [start, end] = holiday.Date.split(" - ").map((date) => new Date(date));
        let dates = [];

        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          dates.push({
            date: new Date(d),
            type: holiday["Holiday Description"], // Store the holiday type
          });
        }
        return dates;
      });

      setHolidays(extractedHolidays);
    }
  }, [holidayList]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const holiday = holidays.find(
        (holiday) =>
          holiday.date.getFullYear() === date.getFullYear() &&
          holiday.date.getMonth() === date.getMonth() &&
          holiday.date.getDate() === date.getDate()
      );
      return holiday ? "holiday" : null;
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const holiday = holidays.find(
        (holiday) =>
          holiday.date.getFullYear() === date.getFullYear() &&
          holiday.date.getMonth() === date.getMonth() &&
          holiday.date.getDate() === date.getDate()
      );
      return holiday ? <p className="holiday-text">{holiday.type}</p> : null;
    }
  };

  return (
    <div>
      <h2 className="bg-[#D0F7F2] p-12 text-left text-2xl font-bold mb-4">
        Holiday Calendar
      </h2>
      <div className="w-[90%] lg:w-[80%] xl:w-[70%] bg-white mx-auto rounded-lg shadow-lg p-6">
        <Calendar className="w-full" tileClassName={tileClassName} tileContent={tileContent} />
      </div>
      <style>
        {`
          .holiday {
            background:rgb(186, 164, 0) !important;
            color: white !important;
            position: relative;
                     
          }

          .holiday-text {
            font-size: 0.7rem;
            text-align: center;
            color: white;
            font-weight: bold;
            margin-top: 4px;
            
          }

          .react-calendar {
            width: 100% !important;
            max-width: 100%;
            border: none;
          }

          .react-calendar__tile {
            height: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            position: relative;
             background:rgb(238, 231, 173);
          }
        `}
      </style>
    </div>
  );
};

export default HolidayCalendar;
