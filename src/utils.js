// utils.js
export const generateUnavailableDates = (startDate, endDate, numberOfDates) => {
    const unavailableDates = new Set();
    while (unavailableDates.size < numberOfDates) {
      const randomDate = new Date(
        startDate.getTime() +
          Math.random() * (endDate.getTime() - startDate.getTime())
      );
      unavailableDates.add(randomDate.toDateString()); // Using toDateString to ensure uniqueness by day
    }
    return Array.from(unavailableDates).map((date) => new Date(date));
  };
  
  export const generateUnavailableTimes = () => {
    const times = [
      '09:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
    ];
    const unavailableTimes = new Set();
    while (unavailableTimes.size < 4) {
      const randomTime = times[Math.floor(Math.random() * times.length)];
      unavailableTimes.add(randomTime);
    }
    return Array.from(unavailableTimes);
  };
  