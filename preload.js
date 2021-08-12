const fs = require('fs')
var unirest = require('unirest');

const dayOfWeek = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
const month = ["", "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Октября", "Сентября", "Ноября", "Декабря"]
const city = {
  "Voronezh" : "Воронеж"
}

window.addEventListener('DOMContentLoaded', () => {
  let weatherHeaders;
  let weatherBody;

  const req = unirest("GET", "https://api.openweathermap.org/data/2.5/weather?units=metric&q=voronezh&appid=1e6f33762338d481de06910c6c6e1a92");

  req.then(res => {
    if (res.error) throw new Error(res.error)
    console.log(res.body)
    console.log(res.headers)
    weatherHeaders = res.headers
    weatherBody = res.body;
    loadValuesOnPage()
  }).catch(err => {
    console.log(err.name, err.message)
  })

  const loadValuesOnPage = () => {
    const date = new Date(weatherHeaders.date)

    const replaceText = (selector, text) => {
      const element = document.getElementById(selector);
      if (element) element.innerText = text
    }

    replaceText ('name', city[weatherBody.name])
    replaceText ('time', `${date.getHours()}:${date.getMinutes()}`)
    replaceText ('day', dayOfWeek[date.getDay()])
    replaceText ('date', `${date.getDate()} ${month[date.getMonth()]}`)
    replaceText ('temp', weatherBody.main.temp)
    replaceText ('feels-temp', weatherBody.main.feels_like)
    replaceText ('pressure', weatherBody.main.pressure)
    replaceText ('wind', weatherBody.wind.speed)
  }
})
