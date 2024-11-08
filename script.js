// script.js
document.addEventListener("DOMContentLoaded", loadBookings);

const bookingForm = document.getElementById("bookingForm");
const bookedRoomsList = document.getElementById("bookedRoomsList");

bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const guestName = document.getElementById("guestName").value;
  const roomNumber = document.getElementById("roomNumber").value;
  const checkInDate = document.getElementById("checkInDate").value;
  const checkOutDate = document.getElementById("checkOutDate").value;

  // Create a booking object
  const booking = {
    guestName,
    roomNumber,
    checkInDate,
    checkOutDate,
  };

  // Save booking
  saveBooking(booking);

  // Update UI and reset form
  displayBooking(booking);
  bookingForm.reset();
});

function saveBooking(booking) {
  // Load existing bookings from local storage
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  // Add new booking to list
  bookings.push(booking);

  // Save updated list to local storage
  localStorage.setItem("bookings", JSON.stringify(bookings));
}

function loadBookings() {
  const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
  bookings.forEach(displayBooking);
}

function displayBooking(booking) {
  const listItem = document.createElement("li");
  listItem.innerHTML = `
    <strong>Guest:</strong> ${booking.guestName} <br>
    <strong>Room:</strong> ${booking.roomNumber} <br>
    <strong>Check-In:</strong> ${booking.checkInDate} <br>
    <strong>Check-Out:</strong> ${booking.checkOutDate}
    <button onclick="cancelBooking('${booking.roomNumber}', '${booking.checkInDate}')">Cancel</button>
  `;
  bookedRoomsList.appendChild(listItem);
}

function cancelBooking(roomNumber, checkInDate) {
  // Load existing bookings
  let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

  // Filter out the booking to cancel
  bookings = bookings.filter(
    (booking) =>
      booking.roomNumber !== roomNumber || booking.checkInDate !== checkInDate
  );

  // Save updated bookings to local storage
  localStorage.setItem("bookings", JSON.stringify(bookings));

  // Refresh UI
  bookedRoomsList.innerHTML = "";
  bookings.forEach(displayBooking);
}
