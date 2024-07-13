import mapboxgl from "mapbox-gl";

// Function to get the user's current location and address using Mapbox
const getLocation = async () => {
  // Set the Mapbox access token
  mapboxgl.accessToken =
    "<mapboxapi>";

  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        timeout: 1000000000,
        maximumAge: 0,
      };

      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Extract latitude and longitude from the position object
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const coordinates = [lon, lat];
          console.log(coordinates)
          // Fetch the address using Mapbox's reverse geocoding API
          fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${mapboxgl.accessToken}`)
            .then((response) => response.json())
            .then((data) => {
              // Extract the address from the API response
              const address = data.features[0]?.place_name || null;
              resolve({ coordinates, address });
            })
            .catch((error) => {
              console.error("Error fetching address:", error);
              resolve({ coordinates, address: null });
            });
        },
        (error) => {
          console.error(error);
          resolve({ coordinates: null, address: null });
        },
        options
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      resolve({ coordinates: null, address: null });
    }
  });
};

export default getLocation;
