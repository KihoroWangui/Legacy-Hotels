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
      ${room.available ? `<button id="book-${room.id}">Book Now</button>` : ""}
    `;

    container.appendChild(roomDiv);

    // Add event listener to the "Book Now" button if the room is available
    if (room.available) {
      const bookButton = document.getElementById(`book-${room.id}`);
      bookButton.addEventListener("click", () => {
        // Redirect to booking page with room ID as a URL parameter
        window.location.href = `booking.html?roomId=${
          room.id
        }&roomName=${encodeURIComponent(room.name)}`;
      });
    }
  });
}

// Initialize room display
displayRooms();
