import moment from "moment/moment";

export const generateDate = (
  month = moment().month(),
  year = moment().year()
) => {
  const firstDateOfMonth = moment().year(year).month(month).startOf("month");
  const lastDateOfMonth = moment().year(year).month(month).endOf("month");

  const arrayOfDate = [];

  // create prefix date
  for (let i = 0; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.clone().day(i);

    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }

  // generate current date
  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDateOfMonth.clone().date(i),
      today:
        firstDateOfMonth.clone().date(i).toDate().toDateString() ===
        moment().toDate().toDateString(),
    });
  }

  const remaining = 42 - arrayOfDate.length;

  for (
    let i = lastDateOfMonth.date() + 1;
    i <= lastDateOfMonth.date() + remaining;
    i++
  ) {
    arrayOfDate.push({
      currentMonth: false,
      date: lastDateOfMonth.clone().date(i),
    });
  }
  return arrayOfDate;
};


export const getDays = moment.weekdaysShort();
