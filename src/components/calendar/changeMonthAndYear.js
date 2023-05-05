import moment from "moment";
import { useState } from "react";
import  s  from "./calendar.module.css"

export const ChangeMonthAndYear = ({ today, setToday }) => {
  const getMonths = moment.months();
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
            <div className={s.scrollYear + ' ' + s.yearArea }>
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

