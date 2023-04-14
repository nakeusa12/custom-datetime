import moment from "moment";
import { useState } from "react";

const TimePicker = ({ onSelectTime }) => {
    const [pickerTime, setPickerTime] = useState({
      startTime: moment().format("hh:mm A"),
      endTime: moment().format("hh:mm A"),
    });
  
    const generateTimeOptions = (ampm) => {
      const hours = [];
      for (let i = 1; i <= 12; i++) {
        hours.push(i);
      }
  
      const minutes = ["00", "15", "30", "45"];
  
      return hours.flatMap((hour) =>
        minutes.map((minute) => ({
          key: `${hour}:${minute} ${ampm}`,
          value: `${hour}:${minute} ${ampm}`,
        }))
      );
    };
  
    const handleStartTimeChange = (e) => {
      setPickerTime((prev) => ({ ...prev, startTime: e.target.value }));
      onSelectTime(e.target.value, pickerTime.endTime);
    };
  
    const handleEndTimeChange = (e) => {
      setPickerTime((prev) => ({ ...prev, endTime: e.target.value }));
      onSelectTime(pickerTime.startTime, e.target.value);
    };
  
    return (
      <div>
        <div>
          <label>Start Time:</label>
          <select value={pickerTime.startTime} onChange={handleStartTimeChange}>
            {generateTimeOptions("AM").map((option) => (
              <option key={option.key} value={option.value}>
                {option.value}
              </option>
            ))}
            {generateTimeOptions("PM").map((option) => (
              <option key={option.key} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>End Time:</label>
          <select value={pickerTime.endTime} onChange={handleEndTimeChange}>
            {generateTimeOptions("AM").map((option) => (
              <option key={option.key} value={option.value}>
                {option.value}
              </option>
            ))}
            {generateTimeOptions("PM").map((option) => (
              <option key={option.key} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </div>
        <p>
          {pickerTime.startTime} - {pickerTime.endTime}
        </p>
      </div>
    );
  };

export default TimePicker