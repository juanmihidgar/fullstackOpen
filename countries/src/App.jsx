import React from "react";

import axios from "axios";

export const App = () => {
  const [countryName, setCountryName] = React.useState("");
  const [countries, setCountries] = React.useState([]);
  const [selectedCountry, setSelectedCountry] = React.useState();

  const url = "http://localhost:3001/countries";

  const maxCountriesMessage = "Too many matches, specify another filter";
  const maxCountries = 10;

  React.useEffect(() => {
    if (countryName.length > 0) {
      axios.get(url).then((response) => {
        setCountries(
          response.data.filter((country) =>
            country.name.toLowerCase().includes(countryName.toLowerCase())
          )
        );
      });
    } else {
      setCountries([]);
    }
  }, [countryName]);

  const handleCountries = () => {
    if (countries.length === 1) {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2>{countries[0].name}</h2>
          <span>Capital: {countries[0].capital}</span>
          <span>Population: {countries[0].population}</span>
          <h3>Languages</h3>
          <ul>
            {countries[0].languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <h3>Flag</h3>
          <img
            style={{ width: "3rem", height: "3rem", borderRadius: "3rem" }}
            src={countries[0].flag}
            alt="flag"
          />
        </div>
      );
    } else if (countries.length < maxCountries) {
      return (
        <ul>
          {countries.map((country) => (
            <li key={country.name}>
              {country.name}
              <button
                onClick={() => {
                  setCountryName(country.name);
                }}
              >
                show
              </button>
            </li>
          ))}
        </ul>
      );
    } else {
      return <p>{maxCountriesMessage}</p>;
    }
  };

  return (
    <>
      <label htmlFor="name-filter">Filter by name</label>
      <input
        type="text"
        name="name-filter"
        id="name-filter"
        value={countryName}
        onChange={(event) => {
          setCountryName(event.target.value);
        }}
      />
      {handleCountries()}
    </>
  );
};

export default App;
