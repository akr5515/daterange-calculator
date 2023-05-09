import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { optionsForSelect } from "../constants";

dayjs.extend(weekday);

export const thisWeekRange = () => {
  const firstDay = dayjs().weekday(0).format("YYYY-MM-DD");
  const lastDay = dayjs().weekday(6).format("YYYY-MM-DD");

  return { firstDay, lastDay };
};

export const previousWeekRange = () => {
  const firstDay = dayjs().weekday(-7).format("YYYY-MM-DD");
  const lastDay = dayjs().weekday(-1).format("YYYY-MM-DD");

  return { firstDay, lastDay };
};

export const thisMonthRange = () => {
  const firstDay = dayjs().startOf("month").format("YYYY-MM-DD");
  const lastDay = dayjs().endOf("month").format("YYYY-MM-DD");

  return { firstDay, lastDay };
};

export const previousMonthRange = () => {
  const firstDay = dayjs()
    .month(dayjs().get("month") - 1)
    .format("YYYY-MM-01");
  const totalDaysInMonth = dayjs()
    .month(dayjs().get("month") - 1)
    .daysInMonth();
  const lastDay = dayjs()
    .month(dayjs().get("month") - 1)
    .format(`YYYY-MM-${totalDaysInMonth}`);

  return { firstDay, lastDay };
};

export const thisYearRange = () => {
  const firstDay = dayjs().format("YYYY-01-01");
  const lastDay = dayjs().format("YYYY-12-31");

  return { firstDay, lastDay };
};

export const previousYearRange = () => {
  const previousYear = dayjs().year() - 1;
  const firstDay = `${previousYear}-01-01`;
  const lastDay = `${previousYear}-12-31`;

  return { firstDay, lastDay };
};

export const all = () => {
  const firstDay = dayjs().format("1970-01-01");
  const lastDay = dayjs().format("YYYY-MM-DD");

  return { firstDay, lastDay };
};

export const dateRangeCalculator = (val: string) => {
  switch (val) {
    case optionsForSelect.ALL:
      return all();
    case optionsForSelect.PREVIOUS_WEEK:
      return previousWeekRange();
    case optionsForSelect.THIS_WEEK:
      return thisWeekRange();
    case optionsForSelect.PREVIOUS_MONTH:
      return previousMonthRange();
    case optionsForSelect.THIS_MONTH:
      return thisMonthRange();
    case optionsForSelect.PREVIOUS_YEAR:
      return previousYearRange();
    case optionsForSelect.THIS_YEAR:
      return thisYearRange();

    default:
      return thisWeekRange();
  }
};
