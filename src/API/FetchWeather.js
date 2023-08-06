import axios from 'axios'


const API = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'a0e68c80caafdbe111a0bc0af0a1b8b3'


export const FetchWeather = async (query) => {
  const { data } = await axios.get(API, {
    params: {
      q: query,
      units: 'metric',
      APPID: API_KEY
    }
  })
  // console.log(data)
  return data;
}


