import React, { Fragment } from 'react';
import Header from './header';
class Weather extends React.Component {
    state = {
        temperature: 'loading...',
        city: 'loading...',
        ip: 'loading...',
        latitude: null,
        longitude: null,
        humidity: null,
        pressure: null,
        description: null,
        icons: 'unknown',
        org: 'loading...'
    }
    async componentDidMount() {
        const ip = await fetch('https://api.ipify.org?format=json');
        const getip = await ip.json();
        const location = await fetch(`https://ipapi.co/${getip.ip}/json`);
        const getLocation = await location.json();
        this.setState({
            ip: getip.ip,
            org:getLocation.org
        })
        const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${getLocation.latitude}&lon=${getLocation.longitude}&appid=7dcb0bd39c25715306bc79eae17b6a4c`);
        const getWeather = await weather.json();
        this.setState({
            temperature: getWeather.main.temp,
            city: getWeather.name,
            latitude: getWeather.coord.lat,
            longitude: getWeather.coord.lon,
            humidity: getWeather.main.humidity,
            pressure: getWeather.main.pressure,
            description: getWeather.weather[0].description,
            icon: getWeather.weather[0].icon
        })
    }
    searchcity = (e) => {
        e.preventDefault();
        if(e.target[0].value!=''){
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target[0].value}&appid=7dcb0bd39c25715306bc79eae17b6a4c`)
                .then(res => res.json())
                .then(getWeather => {
                    if(getWeather.cod=='404'){
                        alert("Wrong City Name!");
                    }
                    else{
                        this.setState({
                            temperature: getWeather.main.temp,
                            city: getWeather.name,
                            latitude: getWeather.coord.lat,
                            longitude: getWeather.coord.lon,
                            humidity: getWeather.main.humidity,
                            pressure: getWeather.main.pressure,
                            description: getWeather.weather[0].description,
                            icon: getWeather.weather[0].icon
                        })
                    }
                })
        }
    }

    render() {

        return (
            <Fragment>
                <Header searchcity={this.searchcity} />
                <div>
                    <img src={require(`./icons/${this.state.icon}.png`)} alt={this.state.description} />
                    <p className="info temp">{this.state.description} {Math.floor(((this.state.temperature - 273.15) * 100)) / 100} &#8451;</p>
                    <p className="info">City : {this.state.city}</p>
                    <p className="info">Co-ordinate : {this.state.latitude}N, {this.state.longitude}E</p>
                    <p className="info">Humidity : {this.state.humidity}AH</p>
                    <p className="info">Pressure : {this.state.pressure}mbar</p>
                    <p className="info">IP address : {this.state.ip}</p>
                    <p className="info">Operator : {this.state.org}</p>
                </div>
            </Fragment>
        )
    }
}
export default Weather;
