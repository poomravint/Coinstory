export  const formatDateTime = (dateString) =>
    new Date(dateString).toLocaleString("th-TH", {
      dateStyle: "medium",
      timeStyle: "short",
    });