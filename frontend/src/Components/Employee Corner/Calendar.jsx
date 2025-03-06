import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { useCompanyContext } from "../../contexts/CompanyContext";
import { motion } from "framer-motion";
import { CalendarIcon, Sun } from 'lucide-react';

const HolidayCalendar = () => {
  const { user } = useSelector((state) => state.user);
  const { fetchHolidayList, holidayList } = useCompanyContext();
  const [holidays, setHolidays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

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
            type: holiday["Holiday Description"],
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
      return holiday ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="holiday-content"
        >
          <Sun className="w-4 h-4" />
          <p className="holiday-text">{holiday.type}</p>
        </motion.div>
      ) : null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
            <div className="relative bg-gradient-to-r from-yellow-500 to-yellow-600 pb-5 mb-8">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <div className="p-2 bg-yellow-400/20 backdrop-blur-sm rounded-lg">
              <CalendarIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Holiday Calendar</h1>
              <p className="text-yellow-100 text-sm">
                View upcoming holidays and celebrations
              </p>
            </div>
          </motion.div>
        </div>
      </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          <Calendar
            className="custom-calendar"
            tileClassName={tileClassName}
            tileContent={tileContent}
            onChange={setSelectedDate}
            value={selectedDate}
          />
        </motion.div>

                <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-white rounded-lg shadow-lg p-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500" />
              <span className="text-sm text-gray-600">Holiday</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-100" />
              <span className="text-sm text-gray-600">Regular Day</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style>
        {`
          .custom-calendar {
            width: 100% !important;
            max-width: 100%;
            border: none !important;
            background: white;
            padding: 20px;
            font-family: system-ui, -apple-system, sans-serif;
          }

          .react-calendar__navigation {
            margin-bottom: 20px;
          }

          .react-calendar__navigation button {
            background: none;
            font-size: 16px;
            font-weight: 600;
            color: #666;
            padding: 8px 12px;
            border-radius: 8px;
            transition: all 0.2s;
          }

          .react-calendar__navigation button:enabled:hover,
          .react-calendar__navigation button:enabled:focus {
            background-color: #FEF3C7 !important;
            color: #D97706;
          }

          .react-calendar__month-view__weekdays {
            background: #FFFBEB;
            padding: 8px 0;
            border-radius: 8px;
            margin-bottom: 8px;
          }

          .react-calendar__month-view__weekdays__weekday {
            font-weight: 600;
            color: #B45309;
          }

          .react-calendar__tile {
            height: 100px;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 8px;
            font-size: 14px;
            background: #FFFBEB;
            border-radius: 8px;
            margin: 2px;
            transition: all 0.2s;
          }

          .react-calendar__tile:enabled:hover,
          .react-calendar__tile:enabled:focus {
            background-color: #FEF3C7 !important;
          }

          .holiday {
            background: linear-gradient(135deg, #F59E0B, #D97706) !important;
            color: white !important;
            font-weight: 600;
          }

          .holiday-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
          }

          .holiday-text {
            font-size: 10px;
            text-align: center;
            color: white;
            line-height: 1.2;
            margin-top: 4px;
          }

          .react-calendar__tile--now {
            background: #FEF3C7 !important;
            color: #D97706 !important;
          }

          .react-calendar__tile--active {
            background: #F59E0B !important;
            color: white !important;
          }

          @media (max-width: 640px) {
            .react-calendar__tile {
              height: 80px;
              font-size: 12px;
            }

            .holiday-text {
              font-size: 9px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default HolidayCalendar;