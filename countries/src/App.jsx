import React from "react";

import axios from "axios";

export const App = () => {
  const [countryName, setCountryName] = React.useState("");
  const [countries, setCountries] = React.useState(undefined);
  const [countryWeather, setCountryWeather] = React.useState(undefined);

  const maxCountriesMessage = "Too many matches, specify another filter";
  const maxCountries = 10;

  React.useEffect(() => {
    let timeout;

    if (countryName.length > 0) {
      timeout = setTimeout(() => {
        axios.get(process.env.REACT_APP_COUNTRIES_API_URL).then((response) => {
          setCountries(
            response.data.filter((country) =>
              country.name.toLowerCase().includes(countryName.toLowerCase())
            )
          );
        });
      }, 350);
    } else {
      setCountries([]);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [countryName]);

  React.useEffect(() => {
    if (countries && countries.length === 1) {
      const wheatherUrl = `${process.env.REACT_APP_WEATHER_API_URL}?access_key=${process.env.REACT_APP_WEATHER_API_KEY}&query=${countries[0].name}`;

      axios.get(wheatherUrl).then((response) => {
        console.log(response);
        setCountryWeather(response.data);
      });
    }
  }, [countries]);

  const handleCountries = () => {
    if (countries && countryWeather && countries.length === 1) {
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
          <span>Temperature: {countryWeather.current.temperature}</span>
          <img
            style={{ width: "3rem", height: "3rem", borderRadius: "3rem" }}
            src={countryWeather.current.weather_icons}
            alt="weather"
          />
          <span>{`Wind: ${countryWeather.current.wind_speed} mph direction ${countryWeather.current.wind_dir}`}</span>
        </div>
      );
    } else if (countries && countries.length < maxCountries) {
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
