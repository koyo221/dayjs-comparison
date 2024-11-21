const getFlightInformationDate = (
  fromTz,
  toTz,
  departureLocalTime,
  flightTimeHours
) => {
  const getTimezoneOffset = (date, timeZone) => {
    // 12:00:00 PM GMT+9という形式のstringが出力される
    const tz = date.toLocaleString("en-US", {
      timeZone,
      timeZoneName: "shortOffset",
    });
    // 数値部分を取得する
    return parseInt(tz.split("GMT")[1], 10);
  };

  const format = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const departure = new Date(departureLocalTime);
  const departureUtc = new Date(
    departure.getTime() - getTimezoneOffset(departure, fromTz) * 60 * 60 * 1000
  );

  const arrivalUtc = new Date(
    departureUtc.getTime() + flightTimeHours * 60 * 60 * 1000
  );
  const arrival = new Date(
    arrivalUtc.getTime() + getTimezoneOffset(arrivalUtc, toTz) * 60 * 60 * 1000
  );

  return {
    departureLocalTime: format(departure),
    departureUtcTime: format(departureUtc),
    arrivalLocalTime: format(arrival),
    arrivalUtcTime: format(arrivalUtc),
  };
};

const dayjs = require("dayjs");
const timezone = require("dayjs/plugin/timezone");
const utc = require("dayjs/plugin/utc");

dayjs.extend(timezone);
dayjs.extend(utc);

const getFlightInformationDayjs = (
  fromTz,
  toTz,
  departureLocalTime,
  flightTimeHours
) => {
  const departure = dayjs.tz(departureLocalTime, fromTz);
  const arrival = departure.add(flightTimeHours, "hours").tz(toTz);

  return {
    departureLocalTime: departure.format("YYYY-MM-DD HH:mm"),
    departureUtcTime: departure.utc().format("YYYY-MM-DD HH:mm"),
    arrivalLocalTime: arrival.format("YYYY-MM-DD HH:mm"),
    arrivalUtcTime: arrival.utc().format("YYYY-MM-DD HH:mm"),
  };
};

console.log(
  getFlightInformationDate(
    "Asia/Tokyo",
    "America/New_York",
    "2000-01-01 00:00",
    12
  )
);
console.log(
  getFlightInformationDayjs(
    "Asia/Tokyo",
    "America/New_York",
    "2000-01-01 00:00",
    12
  )
);
