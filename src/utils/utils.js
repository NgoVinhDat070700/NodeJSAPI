const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
const DAYJS_FORMAT = "DD-MM-YYYY";
const getDateFormat = (date) => {
  if (!date || !dayjs(date, DAYJS_FORMAT).isValid()) return null;
  return dayjs(date, DAYJS_FORMAT).add(1, "day").toDate();
};
const checkIsBeforeDate = (date1, date2) => {
  if (date1 && date2) return dayjs(date1).isBefore(dayjs(date2));
  return false;
};

module.exports = { getDateFormat:getDateFormat, checkIsBeforeDate: checkIsBeforeDate}

