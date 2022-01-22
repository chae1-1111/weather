import API_KEYS from "./private/API_KEYS.json";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
    const [weather, setWeather] = useState("");
    const [temp, setTemp] = useState("");

    useEffect(async () => {
        getGeocode();
        getWeather(37.47768, 126.964301);
    }, []);

    const getGeocode = async () => {
        const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=경기도+성남시+분당구+불정로+6+그린팩토리`;
        const option = {
            method: "GET", // <-> POST
            mode: "cors", //외부 도메인에서 서버에 접속하려고 할때 지켜야 되는 규칙?
            //브라우저 -> FE에 요청 -> BE에 요청 -> FE에 응답(여기에서)
            header: {
                "X-NCP-APIGW-API-KEY-ID": API_KEYS.MapId,
                "X-NCP-APIGW-API-KEY": API_KEYS.MapKey,
            },
        };
        const result = await fetch(url, option);
    };

    const getWeather = async (lat, lon) => {
        const result = await (
            await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEYS.OpenWeatherMap}&units=metric&lang=kr`
            )
        ).json();
        setWeather(result.weather[0].description);
        setTemp(result.main.temp);
    };

    return (
        <div className="App">
            <h2>{weather}</h2>
            <h2>{temp}℃</h2>
        </div>
    );
}

export default App;
