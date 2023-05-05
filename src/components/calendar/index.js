import moment from "moment";
import { useState } from "react";
import { ChangeMonthAndYear } from "./changeMonthAndYear";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { generateDate, getDays } from "../../util/calendar";

export const Calendar = ({ onSelectDate, isRangeDate }) => {
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
      if (!startDate && !endDate) {
        setSelectDate(date);
        onSelectDate(date.clone());
        setStartDate(date.clone());
        setEndDate(null);
      } else if (startDate && !endDate) {
        if (date.isBefore(startDate)) {
          setSelectDate(date);
          onSelectDate(date.clone());
          setStartDate(date.clone());
          setEndDate(null);
        } else if (date.isSame(startDate, 'day')) {
          setSelectDate(date);
          onSelectDate(date.clone());
          setStartDate(null);
          setEndDate(null);
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
    };
  
    return (
      <div className="w-full py-4">
        <div className="flex items-center justify-between px-3">
          <ChangeMonthAndYear today={today} setToday={setToday} />
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