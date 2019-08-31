import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [search, setSearch] = useState("");
	const [allCountries, setAllCountries] = useState([]);

	useEffect(() => {
		axios.get("https://restcountries.eu/rest/v2/all").then(response => {
			setAllCountries(response.data);
		});
	}, []);

	const filteredCountries = allCountries.filter(country => {
		return country.name.toLowerCase().includes(search.toLowerCase());
	});

	return (
		<>
			<div>
				find countries{" "}
				<input
					type="text"
					onChange={event => {
						setSearch(event.target.value);
					}}
				/>{" "}
			</div>

			{filteredCountries.length > 10 ? (
				"Too many matches, specify another filter"
			) : filteredCountries.length === 1 ? (
				<Country country={filteredCountries[0]} />
			) : (
				filteredCountries.map(country => (
					<ShowCountry key={country.callingCodes} country={country} />
				))
			)}
		</>
	);
};

const ShowCountry = ({ country }) => {
	const [showInfo, setShowInfo] = useState(false);
	return (
		<div>
			<div>
				{country.name}{" "}
				<button onClick={() => setShowInfo(!showInfo)}>
					{showInfo ? "Hide" : "Show"}
				</button>
			</div>
			{showInfo ? <Country country={country} /> : null}{" "}
		</div>
	);
};

const Country = ({ country }) => {
	const [w, setW] = useState({
		temp: null,
		windSpeed: null,
		direction: null,
		ico: null,
		icoAlt: null
	});
	useEffect(() => {
		axios
			.get(
				"http://api.apixu.com/v1/current.json?key=751b48b2301741869f183215192408&q=" +
					country.capital
			)
			.then(response => {
				let ref = response.data.current;
				setW({
					temp: ref.temp_c,
					windSpeed: ref.wind_kph,
					direction: ref.wind_dir,
					ico: ref.condition.icon,
					icoAlt: ref.condition.text
				});
			});
	}, [country.capital]);

	return (
		<div>
			<h1>{country.name}</h1>
			<div>capital {country.capital}</div>
			<div>population {country.population}</div>

			<h2>languages</h2>
			<ul>
				{country.languages.map(lang => (
					<li key={lang.name}>{lang.name}</li>
				))}
			</ul>
			<img src={country.flag} alt={country.name} height="150px" />

			<h2>weather in {country.name}</h2>
			<div>
				<strong>temperature: </strong> {w.temp} Celcius{" "}
			</div>
			<img src={w.ico} alt="" />
			<div>{w.icoAlt}</div>
			<div>
				<strong>wind: </strong> {w.windSpeed} kph direction{" "}
				{w.direction}{" "}
			</div>
		</div>
	);
};

export default App;
