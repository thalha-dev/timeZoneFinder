const getCoordinates = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        resolve({ lat, long });
      });
    } else {
      reject(new Error("Geolocation is not supported"));
    }
  });
};

const getTimeZoneFromCoords = async () => {
  try {
    const { lat, long } = await getCoordinates();
    let geoInfo = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=47cc79c8c33a4e67ac5e59456ee85abd`
    );
    let result = await geoInfo.json();

    if (result.results && result.results.length > 0) {
      // dom manipulation
      document.querySelector(
        ".coordinate-container .time-zone-name-field .value"
      ).innerText = result.results[0].timezone.name;
      document.querySelector(
        ".coordinate-container .lat-field .value"
      ).innerText = result.results[0].lat;
      document.querySelector(
        ".coordinate-container .long-field .value"
      ).innerText = result.results[0].lon;
      document.querySelector(
        ".coordinate-container .std-field .value"
      ).innerText = result.results[0].timezone.offset_STD;
      document.querySelector(
        ".coordinate-container .std-sec-field .value"
      ).innerText = result.results[0].timezone.offset_STD_seconds;
      document.querySelector(
        ".coordinate-container .dst-field .value"
      ).innerText = result.results[0].timezone.offset_DST;
      document.querySelector(
        ".coordinate-container .dst-sec-field .value"
      ).innerText = result.results[0].timezone.offset_DST_seconds;
      document.querySelector(
        ".coordinate-container .country-field .value"
      ).innerText = result.results[0].country;
      document.querySelector(
        ".coordinate-container .postcode-field .value"
      ).innerText = result.results[0].postcode;
      document.querySelector(
        ".coordinate-container .city-field .value"
      ).innerText = result.results[0].city;
    }
  } catch (err) {
    console.log(err);
  }
};
getTimeZoneFromCoords();

const input = document.querySelector(".user-input");
const button = document.querySelector(".user-button");

const getTimeZoneFromAdd = async () => {
  try {
    const address = input.value;
    if (address) {
      let geoInfo = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          address
        )}&apiKey=47cc79c8c33a4e67ac5e59456ee85abd`
      );

      let result = await geoInfo.json();
      document.querySelector(".address-result").style.display = "block";
      document.querySelector(".warning").style.display = "none";

      if (result.features && result.features.length > 0) {
        // dom manipulation
        document.querySelector(
          ".address-container .time-zone-name-field .value"
        ).innerText = result.features[0].properties.timezone.name;
        document.querySelector(
          ".address-container .lat-field .value"
        ).innerText = result.features[0].properties.lat;
        document.querySelector(
          ".address-container .long-field .value"
        ).innerText = result.features[0].properties.lon;
        document.querySelector(
          ".address-container .std-field .value"
        ).innerText = result.features[0].properties.timezone.offset_STD;
        document.querySelector(
          ".address-container .std-sec-field .value"
        ).innerText = result.features[0].properties.timezone.offset_STD_seconds;
        document.querySelector(
          ".address-container .dst-field .value"
        ).innerText = result.features[0].properties.timezone.offset_DST;
        document.querySelector(
          ".address-container .dst-sec-field .value"
        ).innerText = result.features[0].properties.timezone.offset_DST_seconds;
        document.querySelector(
          ".address-container .country-field .value"
        ).innerText = result.features[0].properties.country;
        document.querySelector(
          ".address-container .postcode-field .value"
        ).innerText = result.features[0].properties.postcode;
        document.querySelector(
          ".address-container .city-field .value"
        ).innerText = result.features[0].properties.city;
      } else {
        document.querySelector(".address-result").style.display = "none";
        document.querySelector(".warning").innerText =
          "Please enter a valid address";
        document.querySelector(".warning").style.display = "block";
      }
    } else {
      document.querySelector(".address-result").style.display = "none";
      document.querySelector(".warning").innerText = "Please enter an address";
      document.querySelector(".warning").style.display = "block";
    }
  } catch (err) {
    console.log(err);
  }
};

button.addEventListener("click", getTimeZoneFromAdd);
