function timeSetter(time) {
    const date = time
    const dateString = date.toLocaleDateString("id-ID", {
      weekDay: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    const timeString = date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    const formattedDateTime = dateString 
  //   console.log(formattedDateTime);
  
    return formattedDateTime
  }

  module.exports = timeSetter