// Your Google Places API key here; keep it safe and restricted to your domain.
const apiKey = "Your-api-key";

// CORS proxy setup for development to bypass CORS errors with Google Places API
const useProxy = true;
const proxy = "https://cors-anywhere.herokuapp.com/";

// Function to get user location, using caching for 10 minutes
function getLocation() {
  const cache = JSON.parse(localStorage.getItem('cachedLocation') || '{}');
  const now = Date.now();

  if (cache.timestamp && now - cache.timestamp < 10 * 60 * 1000) {
    useLocation(cache.lat, cache.lng);
  } else {
    navigator.geolocation.getCurrentPosition(
      pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        localStorage.setItem('cachedLocation', JSON.stringify({ lat, lng, timestamp: now }));
        useLocation(lat, lng);
      },
      () => alert("Location access denied or unavailable.")
    );
  }
}

// Main API call to Google Places Nearby Search for cafes
async function useLocation(lat, lng) {
  const endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=cafe&key=${apiKey}`;
  const url = useProxy ? proxy + endpoint : endpoint;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length) {
      displayCards(data.results);
    } else {
      alert("No cafes found.");
    }
  } catch (e) {
    console.error("Error fetching Places API:", e);
    alert("Error fetching cafes.");
  }
}

// Renders cafe cards into the .cards container with swipe functionality
function displayCards(cafes) {
  const container = document.querySelector('.cards');
  container.innerHTML = '';

  cafes.forEach((cafe, i) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'swipe-wrapper';
    wrapper.style.zIndex = 200 - i;

    const card = document.createElement('div');
    card.className = 'location-card';

    const imgUrl = cafe.photos?.[0]?.photo_reference
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${cafe.photos[0].photo_reference}&key=${apiKey}`
      : 'https://via.placeholder.com/320x150?text=No+Image';

    const cafeData = {
      name: cafe.name,
      place_id: cafe.place_id,
      photo: imgUrl,
      rating: cafe.rating || 'N/A',
    };

    card.innerHTML = `
      <img src="${imgUrl}" alt="${cafe.name}" />
      <h3>${cafe.name}</h3>
      <p>⭐️ Rating: ${cafe.rating || 'N/A'}</p>
      <p><small>Swipe right to save 💖</small></p>
    `;

    wrapper.appendChild(card);
    container.appendChild(wrapper);

    // Setup Hammer.js swipe gestures on the card wrapper
    const hammertime = new Hammer(wrapper);
    hammertime.on('swipeleft', () => {
      wrapper.style.transform = 'translateX(-150%) rotate(-15deg)';
      wrapper.style.opacity = 0;
      setTimeout(() => wrapper.remove(), 100);
    });
    hammertime.on('swiperight', () => {
      saveCafe(JSON.stringify(cafeData));
      wrapper.style.transform = 'translateX(150%) rotate(15deg)';
      wrapper.style.opacity = 0;
      setTimeout(() => wrapper.remove(), 100);
    });
  });
}

// Saves a cafe object in localStorage if not already saved
function saveCafe(cafeJSON) {
  const cafe = JSON.parse(cafeJSON);
  let saved = JSON.parse(localStorage.getItem('savedCafes') || '[]');

  if (!saved.find(c => c.place_id === cafe.place_id)) {
    saved.push(cafe);
    localStorage.setItem('savedCafes', JSON.stringify(saved));
    alert(`${cafe.name} saved!`);
  } else {
    alert(`${cafe.name} is already saved.`);
  }
}

// Displays saved cafes from localStorage
function showSaved() {
  const container = document.querySelector('.cards');
  container.innerHTML = '';

  const saved = JSON.parse(localStorage.getItem('savedCafes') || '[]');
  if (saved.length === 0) {
    container.innerHTML = '<p>No saved cafes yet 😢</p>';
    return;
  }

  saved.forEach(cafe => {
    const card = document.createElement('div');
    card.className = 'location-card';
    card.innerHTML = `
      <img src="${cafe.photo}" alt="${cafe.name}" />
      <h3>${cafe.name}</h3>
      <p>⭐️ Rating: ${cafe.rating}</p>
    `;
    container.appendChild(card);
  });
}

// Set up event listeners for buttons
document.getElementById('show-saved').addEventListener('click', showSaved);
document.getElementById('find-cafes').addEventListener('click', getLocation);

// On page load, fetch cafes nearby
window.onload = getLocation;
