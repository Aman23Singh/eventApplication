function maxBookings(requests, totalSeats) {
      requests.sort();
      let bookings = 0;

      while (totalSeats > 0 && bookings < requests.length) {
         totalSeats -= requests[bookings];
         if (totalSeats >= 0) {
            bookings++;
         }else break;
      }
      
      return bookings;
}