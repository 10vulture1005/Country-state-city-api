# Country-State-City Selector

A React-based project that allows users to select a country, state, and city using an API.

## Features
- Fetch countries from an API
- Fetch states based on the selected country
- Fetch cities based on the selected state
- Display selected country, state, and city using an alert

## Tech Stack
- React.js
- JavaScript (ES6+)
- HTML/CSS
- RapidAPI (for country, state, and city data)

## API Used
The project uses the following endpoints from RapidAPI:
- **Fetch Countries:** `https://country-state-city-search-rest-api.p.rapidapi.com/allcountries`
- **Fetch States:** `https://country-state-city-search-rest-api.p.rapidapi.com/states-by-countrycode?countrycode={countryCode}`
- **Fetch Cities:** `https://country-state-city-search-rest-api.p.rapidapi.com/cities-by-countrycode-and-statecode?countrycode={countryCode}&statecode={stateCode}`

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/country-state-city-selector.git
   ```
2. Navigate to the project directory:
   ```sh
   cd country-state-city-selector
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Run the application:
   ```sh
   npm start
   ```

## Usage
1. Type a country name to fetch matching countries.
2. Select a country from the dropdown to load states.
3. Select a state from the dropdown to load cities.
4. Click the button to display the selected country, state, and city.

## Project Structure
```
country-state-city-selector/
│── src/
│   ├── components/
│   ├── App.jsx
│   ├── index.js
│   ├── App.css
│── public/
│── package.json
│── README.md
```

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Make your changes and commit:
   ```sh
   git commit -m "Add new feature"
   ```
4. Push to your fork and create a pull request.



