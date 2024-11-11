const backgrounds = [
  "pexels-pixabay-164595.jpg",
  "pexels-seven11nash-380768.jpg",
  "pexels-pixabay-261101.jpg",
  "pexels-janetrangdoan-1099680.jpg",
];

function changeBackground() {
  // Select a random image from the array
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  document.body.style.backgroundImage = `url(${backgrounds[randomIndex]})`;
}

// Change the background every 5 seconds
setInterval(changeBackground, 5000);

// Initial call to set the first background
changeBackground();
