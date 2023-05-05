import moment from 'moment';
import { useEffect, useRef, useState } from 'react';

const TimePicker = ({ onSelectTime }) => {
  const [pickerTime, setPickerTime] = useState({
    startTime: moment().format('h:mm A'),
    endTime: moment().format('h:mm A'),
  });

  const generateTimeOptions = ampm => {
    const hours = [];
    for (let i = 1; i < 12; i++) {
      hours.push(i);
    }

    const minutes = ['00', '30'];

    return hours.flatMap(hour =>
      minutes.map(minute => ({
        key: `${hour}:${minute} ${ampm}`,
        value: `${hour}:${minute} ${ampm}`,
      })),
    );
  };

  const handleStartTimeChange = value => {
    setPickerTime(prev => ({ ...prev, startTime: value }));
    onSelectTime(value, pickerTime.endTime);
  };

  const handleEndTimeChange = value => {
    setPickerTime(prev => ({ ...prev, endTime: value }));
    onSelectTime(pickerTime.startTime, value);
  };

  return (
    <div className='grid w-full grid-cols-1 gap-3 md:grid-cols-2'>
      <div>
        <label className='block mb-2 text-base font-medium text-text-dark'>
          Start Time:
        </label>
        <CustomDropdown
          value={pickerTime.startTime}
          options={generateTimeOptions('AM').concat(generateTimeOptions('PM'))}
          onChange={handleStartTimeChange}
        />
      </div>
      <div>
        <label className='block mb-2 text-base font-medium text-text-dark'>
          End Time:
        </label>
        <CustomDropdown
          value={pickerTime.endTime}
          options={generateTimeOptions('AM').concat(generateTimeOptions('PM'))}
          onChange={handleEndTimeChange}
        />
      </div>
    </div>
  );
};

const CustomDropdown = ({ value, options, onChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef();

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = optionValue => {
    setIsDropdownOpen(false);
    onChange(optionValue);
  };

  // Close dropdown when click outside
  const clickOutside = e => {
    if (ref.current.contains(e.target)) return;
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className='relative w-full' ref={ref}>
      <div
        className='bg-white flex items-center justify-between border rounded-2xl w-full min-h-[56px] text-4 px-6 py-4 placeholder:text-text-placeholder placeholder:text-base focus:outline-none disabled:bg-[#DFDFDF] disabled:text-text'
        onClick={handleDropdownClick}
      >
        {value}
        {/* <FontAwesomeIcon icon={faClock} size='sm' /> */}
      </div>
      {isDropdownOpen && (
        <ul className='absolute z-10 w-full px-0 overflow-y-auto bg-white border border-t-0 rounded-lg shadow-1 max-h-80'>
          {options.map(option => (
            <li
              key={option.key}
              className={`w-full text-base py-2 flex justify-between items-center px-2.5 whitespace-nowrap text-left text-ellipsis dropdown-list-item cursor-pointer hover:bg-gray-600 hover:text-white duration-100 ${
                value === option.value ? ' bg-gray-600 text-white ' : ''
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TimePicker;
