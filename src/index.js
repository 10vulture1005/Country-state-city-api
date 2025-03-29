async function fetchCountries() {
	const url = "https://country-state-city-search-rest-api.p.rapidapi.com/allcountries";
	const options = {
	  method: "GET",
	  headers: {
		"x-rapidapi-key": "416dd9700fmshb895b4fced4b96ap108a86jsn6dea3f6d1734",
		"x-rapidapi-host": "country-state-city-search-rest-api.p.rapidapi.com",
	  },
	};
  
	let displaycountry = []; // Use an array instead of an object
  
	try {
	  const response = await fetch(url, options);
	  const data = await response.json();
	  let name = "in"; // Search keyword (case-insensitive)
  
	  // Filter and store matching country names
	  data.forEach((country) => {
		if (country.name.toLowerCase().includes(name.toLowerCase())) {
		  displaycountry.push(country.isoCode); // Corrected `.pushback()` to `.push()`
		}
	  });
  
	  console.log("Matching countries:", displaycountry); // Log results
	} catch (error) {
	  console.error("Error fetching data:", error);
	}
  }
  
  // Call the function
  fetchCountries();
  