import React, { useState, useEffect } from "react";


const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Clean up the timer
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString("en-us", {
    weekday: "long",
  });

  const formattedMonth = currentTime.toLocaleDateString("en-US", {
    month: "long",
  });
  
  const formattedDay=currentTime.getDate();
  const formattedYear = currentTime.getFullYear();

  return (
    <div id="Time">
      {formattedTime}
     <br></br>
     
      {formattedDate} <br></br>
        {formattedMonth}/
        { formattedDay}/
        { formattedYear}

      
    </div>
  );
};

export default Clock;
