import moment from "moment";
import React, { useRef, useState } from "react";
import "./App.css";
import { Calendar } from "./components/calendar";
import TimePicker from "./components/TimePicker";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(moment());
  const [selectedStartTime, setSelectedStartTime] = useState(moment().format("hh:mm A"));
  const [selectedEndTime, setSelectedEndTime] = useState(moment().add(3, "hours").format("hh:mm A"));
  const ref = useRef();

  const toggleOpen = () => setIsOpen(prevIsOpen => !prevIsOpen);

  const handleSelectDateTime = date => setSelectedDateTime(date);

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
    end: endDate.toDate()
  };

  return (
    <div className="flex">
      <div className="flex flex-col items-center justify-center max-w-2xl gap-10 mx-auto sm:divide-x sm:flex-row">
        <div className="relative select-none w-96" ref={ref}>
          <div className="relative flex border-black items-center justify-between bg-white border rounded-lg cursor-default min-h-[44px] px-3 py-2" onClick={toggleOpen}>
            <div className="font-normal text-sm text-[#444444]">
              {selectedDateTime.format("D MMMM YYYY")} at {selectedStartTime} - {selectedEndTime}
            </div>
          </div>
          {isOpen && (
            <ul className="absolute z-10 w-full top-[100%] px-0 overflow-y-auto bg-white border rounded-md shadow-lg border-neutral-50" onClick={e => e.stopPropagation()}>
              <div className="flex flex-col items-center">
                <Calendar onSelectDate={handleSelectDateTime} isRangeDate={false} />
              </div>
              <TimePicker onSelectTime={handleSelectTime} />
            </ul>
          )}
        </div>
      </div>

      {result.start && result.end && (
        <div className="flex flex-col items-center justify-center max-w-md gap-10 mx-auto sm:divide-x sm:flex-row">
          <div>
            Start: {result.start.toString()} <br />
            End: {result.end.toString()}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
