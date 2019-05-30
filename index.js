let data;
let latitude;
let longitude;
const latitudeP = document.getElementById("latitude");
const longitudeP = document.getElementById("longitude");
const issAPI_url = "https://api.wheretheiss.at/v1/satellites/25544";
const access_token =
  "pk.eyJ1IjoiZGFsbGFzb2xpdmVyIiwiYSI6ImNqdzRhbHowYzBqa3IzeXFzNnE2YXNzbTgifQ.mEqvnd_hdmMhw5NIDAg0eQ";

const myMap = L.map("map-id").setView([0, 0], 1.5);
L.tileLayer(
  `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${access_token}`,
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken:
      "pk.eyJ1IjoiZGFsbGFzb2xpdmVyIiwiYSI6ImNqb3dkMmlhejA5aGgzd210bXczdDc5MW8ifQ.xmHfqg0kJ06WQFeyBgrnzA"
  }
).addTo(myMap);

console.log(latitude);

async function getIssLocation() {
  const response = await fetch(issAPI_url);
  data = await response.json();
  latitude = data.latitude;
  longitude = data.longitude;

  latitudeP.textContent = latitude;
  longitudeP.textContent = longitude;
  const issMarker = L.marker([latitude, longitude]).addTo(myMap);
}

getIssLocation();

function updateIssLocation() {
  setInterval(() => {
    getIssLocation();
  }, 1000);
}

updateIssLocation();

// fetch(issAPI)
//   .then(response => {
//     return response.json();
//   })
//   .then(locationJson => {
//     console.log(locationJson.longitude);
//   });
