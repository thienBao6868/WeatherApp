import React, {useState, useEffect} from 'react'

import './App.css'
const api ={
    key: "bf7cbdd00b69178261157d50d3ceb141",
    base :"https://api.openweathermap.org/data/2.5/",
}

const App = () => {
    // handle current day
    let today = new Date();
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let date = dd + '/' + mm + '/' + yyyy;
    // set states

    const [searchInput, setSearchInput] = useState("")
    const [searchCity, setSearchCity] = useState(""); // flow cua minh khi nguoi dung nhan submit thi moi cho render cai search city
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [weatherInfo, setWeatherInfo] = useState("");
    useEffect(() => {
     const fetchWeatherData = async () => {
        if(!searchCity) return;
        setLoading(true)
        // process
        try{
            const url =`${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`
            const response = await fetch (url);
            const data = await response.json();
            if(response.ok){
                setWeatherInfo([
                    data.name,
                    data.sys.country,
                    data.main.temp,
                    data.main.temp_min,
                    data.main.temp_max,
                    data.weather[0].main,
                    data.weather[0].description,
                    data.weather[0].icon,
                    data.wind.speed,
                    data.wind.deg
                ])
                console.log(data);
                setErrorMessage("")
            }else{
                setErrorMessage(data.message)
            }

        }catch(error){
            setErrorMessage(error.message)
        }
        setLoading(false)

     }
     fetchWeatherData();
   },[searchCity])
   
    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchCity(searchInput); // bai toan de khi nhan button submit thi moi lay gia tri cua search input 
    }
  return (
    
    <>
         <div id="place_search">
            <form action="#" id="search_form" onSubmit={handleSubmit}>
                <label htmlFor="">Search for any city</label>
                <input type="text" className="search_input" placeholder='City' value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
            </form>
        </div>



        {loading? 
            (<div>loading.....</div>) :
            (<>{errorMessage? (
                <div id="container">
                <div className="displayinfo"style={{color: "red"}}>{errorMessage}</div>
                </div>): 
                (weatherInfo?

                (<>
                    <div id="container">
                    <div className="weather_gradient">
                        <div className="date_container">
                            <h2 className="date_name">{weekday[today.getDay()]}</h2>
                            <span className="date_time">{date}</span>
                            <span className="city_country">{`${weatherInfo[0]},${weatherInfo[1]}`}</span>
                        </div>
                        <div className="weather_container">
                            <div className="info">
                                <img className="city-icon" src={`https://openweathermap.org/img/wn/${weatherInfo[7]}@2x.png`} alt="broken clouds"/>
                            </div>
                            <h1 className="weather_temp">{`${weatherInfo[2]}ºC`}</h1>
                            <h3>{weatherInfo[6]}</h3>

                        </div>
                    </div>
            
                    </div>
                
                
                
                
                </>):(<>
                    <div id="container">
                    <div className="displayinfo">How The Weather Any City? Please,Search</div>
                    </div>
                </>))
                }</>)}

        
        
        
        
    </>
  )
}

export default App

//<form onSubmit={handleSubmit}>
//        <input type="text" placeholder='City' value={searchInput} onChange={(e) => setSearchInput(e.target.value) }/>
//        <button>Search</button>
//    </form>
//    {loading? 
//    (<div>loading.....</div>) :
//    (<>{errorMessage? 
//        (<div style={{color: "red"}}>{errorMessage}</div>): 
//        (<><Weather name={weatherInfo[0]}/></>)
//        }</>)}