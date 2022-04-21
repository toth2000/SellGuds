import { getCurrentLocation } from "../api/locationAPI";

export const getCurrentCoordinates = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        const coordinate = {
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        };

        resolve(coordinate);
      },
      (error) => {
        console.log("Location getLocation", error);
        alert("Unable to fetch currenty location");
        reject(null);
      }
    );
  });
};

export const fetchLocation = async () => {
  try {
    const coordinates = await getCurrentCoordinates();

    if (!getCurrentCoordinates) return;

    const { data } = await getCurrentLocation(coordinates.lat, coordinates.lon);

    return {
      lat: coordinates.lat,
      lon: coordinates.lon,
      state: data.principalSubdivision,
      country: data.countryName,
      continent: data.continent,
    };
  } catch (error) {
    console.log("fetchLocation error, Navbar.js\n", error);
    return null;
  }
};
