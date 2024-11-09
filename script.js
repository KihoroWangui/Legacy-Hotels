// Room data
const rooms = [
  { id: 1, name: "Single Room", price: 100, available: true },
  { id: 2, name: "Double Room", price: 150, available: false },
  { id: 3, name: "Suite", price: 300, available: true },
  { id: 4, name: "Deluxe Suite", price: 400, available: false },
];

// Function to display rooms
function displayRooms() {
  const container = document.getElementById("rooms-container");

  rooms.forEach((room) => {
    const roomDiv = document.createElement("div");
    roomDiv.className = "room";
    roomDiv.innerHTML = `
      <h3>${room.name}</h3>
      <p>Price: $${room.price} per night</p>
      <p>Status: ${room.available ? "Available" : "Booked"}</p>
      ${room.available ? "<button>Book Now</button>" : ""}
    `;
    container.appendChild(roomDiv);
  });
}

// Initialize room display
displayRooms();
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
