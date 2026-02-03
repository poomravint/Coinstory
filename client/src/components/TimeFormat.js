// ! Set current time
export const setCurrentDateTime = (setDateTime) => {
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  setDateTime(now.toISOString().slice(0, 16));
};

// ! Change Time format for POST to DB
export const formatDateTimeForMySQL = (dt) => {
  return dt.replace("T", " ") + ":00";
};

//! Format time for show user
export const formatDateTime = (dateString) =>
  new Date(dateString).toLocaleString("th-TH", {
    dateStyle: "medium",
    timeStyle: "short",
  });
