import moment from "moment";
import React, { useRef, useState } from "react";
import { getDays, generateDate, getMonths } from "./util/calendar";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import TimePicker from "./components/TimePicker";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(moment());
  const [selectedStartTime, setSelectedStartTime] = useState(moment().format("hh:mm A"));
  const [selectedEndTime, setSelectedEndTime] = useState(moment().add(3, "hours").format("hh:mm A"));

  const ref = useRef();

  const toggleOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSelectDateTime = (date) => {
    setSelectedDateTime(date);
  };

  const handleSelectTime = (start, end) => {
    setSelectedStartTime(start);
    setSelectedEndTime(end);
  };

  const start = moment(selectedStartTime, "hh:mm A");
  const end = moment(selectedEndTime, "hh:mm A");
  const startDate = selectedDateTime.clone().set({ hour: start.hours(), minute: start.minutes() });
  const endDate = selectedDateTime.clone().set({ hour: end.hours(), minute: end.minutes() });

  const result = {
    start: startDate.toDate(),
    end: endDate.toDate(),
  };

  console.log(result);

  return (
    <div className="flex flex-col items-center justify-center max-w-md gap-10 mx-auto sm:divide-x sm:flex-row">
      <div className="relative w-full select-none" ref={ref}>
        <div
          className="relative flex border-black items-center justify-between bg-white border rounded-lg cursor-default min-h-[44px] px-3 py-2 "
          onClick={toggleOpen}
        >
          <div className="font-normal text-sm text-[#444444]">
            {selectedDateTime.format("D MMMM YYYY")} at {selectedStartTime} - {selectedEndTime}
          </div>
        </div>
        {isOpen && (
          <ul
            className="absolute z-10 w-full top-[100%] px-0 overflow-y-auto bg-white border rounded-md shadow-lg border-neutral-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center">
              <Calendar onSelectDate={handleSelectDateTime} />
              <TimePicker onSelectTime={handleSelectTime} />
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;


function Calendar({ onSelectDate, isRangeDate }) {
  const [today, setToday] = useState(moment());
  const [selectDate, setSelectDate] = useState(moment());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleTodayClick = () => {
    setToday(moment());
    setSelectDate(moment());
  };

  const handlePreviousMonthClick = () => {
    setToday((prevToday) => prevToday.clone().subtract(1, "month"));
  };

  const handleNextMonthClick = () => {
    setToday((prevToday) => prevToday.clone().add(1, "month"));
  };

  const handleDateClick = (date) => {
    if (isRangeDate) {
      if (!startDate && !endDate) {
        setSelectDate(date);
        onSelectDate(date.clone());
        setStartDate(date.clone());
      } else if (startDate && !endDate) {
        if (date.isBefore(startDate)) {
          setSelectDate(date);
          onSelectDate(date.clone());
          setStartDate(date.clone());
        } else if (date.isSame(startDate)) {
          setSelectDate(date);
          onSelectDate(date.clone());
          setStartDate(null);
        } else {
          setSelectDate(date);
          onSelectDate(date.clone());
          setEndDate(date.clone());
        }
      } else if (startDate && endDate) {
        setSelectDate(date);
        onSelectDate(date.clone());
        setStartDate(date.clone());
        setEndDate(null);
      }
    } else {
      if (moment().month() === date.month()) {
        setSelectDate(date);
        onSelectDate(date.clone());
      } else {
        setToday(date.clone());
        setSelectDate(date);
        onSelectDate(date.clone());
      }
    }
  };

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between px-3">
        <ChangeMonthYear today={today} setToday={setToday} />
        <div className="flex items-center gap-10 ">
          <GrFormPrevious
            className="w-5 h-5 transition-all cursor-pointer hover:scale-105"
            onClick={handlePreviousMonthClick}
          />
          <h1
            className="transition-all cursor-pointer hover:scale-105"
            onClick={handleTodayClick}
          >
            Today
          </h1>
          <GrFormNext
            className="w-5 h-5 transition-all cursor-pointer hover:scale-105"
            onClick={handleNextMonthClick}
          />
        </div>
      </div>
      <div className="grid grid-cols-7 ">
        {getDays.map((day, index) => (
          <h1
            key={index}
            className="grid text-sm text-center text-gray-500 select-none h-14 w-14 place-content-center"
          >
            {day}
          </h1>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-5">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => (
            <div
              key={index}
              className="grid p-2 text-sm text-center border-t h-14 place-content-center"
            >
              {isRangeDate ? (
                <h1
                  className={`
                h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none

                ${currentMonth ? "" : "text-gray-200"}
                ${today ? "bg-red-600 text-white" : ""}
                ${
                  selectDate.toDate().toDateString() ===
                  date.toDate().toDateString()
                    ? "bg-black text-white"
                    : ""
                }
                ${
                  startDate &&
                  !endDate &&
                  date.isSameOrAfter(startDate) &&
                  date.isSameOrBefore(selectDate)
                    ? "bg-blue-500 text-white"
                    : ""
                }
                ${
                  startDate &&
                  endDate &&
                  date.isSameOrAfter(startDate) &&
                  date.isSameOrBefore(endDate)
                    ? "bg-blue-500 text-white"
                    : ""
                }
                `}
                  onClick={() => handleDateClick(date)}
                >
                  {date.date()}
                </h1>
              ) : (
                <h1
                  className={`
                  h-10 w-10 rounded-full grid place-content-center hover:bg-black hover:text-white transition-all cursor-pointer select-none 
                  ${currentMonth ? "" : "text-gray-200"} 
                  ${today ? "bg-red-600 text-white" : ""} 
                  ${
                    selectDate.toDate().toDateString() ===
                    date.toDate().toDateString()
                      ? "bg-black text-white"
                      : ""
                  }`}
                  onClick={() => handleDateClick(date)}
                >
                  {date.date()}
                </h1>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

const ChangeMonthYear = ({ today, setToday }) => {
  const [showMonthYear, setShowMonthYear] = useState(false);

  const generateYearButtons = () => {
    const currentYear = moment().year();
    const years = [];
    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
      years.push(
        <button
          key={year}
          className={`block w-full px-8 py-2 text-sm text-left hover:bg-gray-200 ${
            year === today.year() ? "bg-gray-200" : ""
          } 
          `}
          onClick={() => setToday(today.clone().year(year))}
        >
          {year}
        </button>
      );
    }
    return years;
  };

  const generateMonthButtons = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      months.push(
        <button
          key={i}
          className={`block w-full px-4 py-2 text-sm text-center hover:bg-gray-200 ${
            i === today.month() ? "bg-gray-200" : ""
          }`}
          onClick={() => setToday(today.clone().month(i))}
        >
          {getMonths[i]}
        </button>
      );
    }
    return months;
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div
          className="flex items-center gap-x-2"
          onClick={() => setShowMonthYear(true)}
        >
          <button className="px-2 py-1 text-sm">{today.format("MMMM")}</button>
          <button className="px-2 py-1 text-sm">{today.year()}</button>
        </div>
      </div>

      {showMonthYear && (
        <div className="absolute left-0 z-10 w-full py-2 mt-1 bg-white rounded-md shadow-lg top-16">
          <div className="flex py-1 border-y">
            <div className="overflow-y-auto max-h-72 scroll-year">
              {generateYearButtons()}
            </div>
            <div className="grid grid-cols-4">{generateMonthButtons()}</div>
          </div>

          <div className="flex items-center justify-end w-full px-4 py-2">
            <button
              className="px-6 py-3 text-sm rounded-lg hover:bg-gray-100"
              onClick={() => setShowMonthYear(false)}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};
