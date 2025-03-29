import { useState } from "react";
import "./App.css";

const API_KEY = "416dd9700fmshb895b4fced4b96ap108a86jsn6dea3f6d1734";
const API_HOST = "country-state-city-search-rest-api.p.rapidapi.com";

async function fetchCountries(text) {
  const url = `https://${API_HOST}/allcountries`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data
      .filter((country) => country.name.toLowerCase().includes(text.toLowerCase()))
      .map((country) => ({ name: country.name, code: country.isoCode }));
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}

async function fetchStates(countryCode) {
  if (!countryCode) return [];

  const url = `https://${API_HOST}/states-by-countrycode?countrycode=${countryCode}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data.map((state) => ({ name: state.name, code: state.isoCode }));
  } catch (error) {
    console.error("Error fetching states:", error);
    return [];
  }
}

async function fetchCities(countryCode, stateCode) {
  if (!countryCode || !stateCode) return [];

  const url = `https://${API_HOST}/cities-by-countrycode-and-statecode?countrycode=${countryCode}&statecode=${stateCode}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    // Debugging
    console.log("Cities API Response:", data);
    
    if (!Array.isArray(data)) {
      console.error("Unexpected city data format:", data);
      return [];
    }

    return data.map((city) => city.name);
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}

function App() {
  const [countryText, setCountryText] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  const handleCountryChange = async (e) => {
    const text = e.target.value;
    setCountryText(text);

    if (text.length > 1) {
      const fetchedCountries = await fetchCountries(text);
      console.log("Fetched Countries:", fetchedCountries);
      setCountries(fetchedCountries);
    } else {
      setCountries([]);
    }

    setSelectedCountry(null);
    setStates([]);
    setCities([]);
  };

  const handleCountrySelect = async (e) => {
    const countryCode = e.target.value;
    setSelectedCountry(countryCode);
    setStates([]);
    setCities([]);

    if (countryCode) {
      const fetchedStates = await fetchStates(countryCode);
      console.log("Fetched States:", fetchedStates);
      setStates(fetchedStates);
    }
  };

  const handleStateSelect = async (e) => {
    const stateCode = e.target.value;
    setSelectedState(stateCode);
    setCities([]);
    console.log(stateCode);
    if (selectedCountry && stateCode) {
      const fetchedCities = await fetchCities(selectedCountry, stateCode);
      console.log("Fetched Cities:", fetchedCities);
      setCities(fetchedCities);
    }
  };

  const handleCitySelect = (e) => {
    setSelectedCity(e.target.value);
  };

  function showAlert() {
    const countrySelect = document.getElementById("Country");
    const stateSelect = document.getElementById("State");
    const citySelect = document.getElementById("City");
  
    const selectedCountry = countrySelect.options[countrySelect.selectedIndex].text;
    const selectedState = stateSelect.options[stateSelect.selectedIndex].text;
    const selectedCity = citySelect.options[citySelect.selectedIndex].text;
  
    if (selectedCountry !== "Select Country" && 
        selectedState !== "Select State" && 
        selectedCity !== "Select City") {
      alert(`You are from ${selectedCity}, ${selectedState}, ${selectedCountry}`);
    } else {
      alert("Please select a country, state, and city.");
    }
  }
  

  return (
    <div className="in">
      <input
        type="text"
        placeholder="Enter Country Name (e.g., India, USA)"
        value={countryText}
        onChange={handleCountryChange}
      />

      {/* Country Dropdown */}
      <select id="Country" onChange={handleCountrySelect}>
        <option value="">Select Country</option>
        {countries.map((country, index) => (
          <option key={index} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

      {/* State Dropdown */}
      <select id="State" onChange={handleStateSelect} disabled={!selectedCountry}>
        <option value="">Select State</option>
        {states.map((state, index) => (
          <option key={index} value={state.code}>
            {state.name}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      <select id="City" onChange={handleCitySelect} disabled={!selectedState}>
        <option value="">Select City</option>
        {cities.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
      </select>

      <button onClick={showAlert}>Find your Place</button>
    </div>
  );
}

export default App;
