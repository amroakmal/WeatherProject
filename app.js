const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    var city = req.body.city;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=0f2ef4a95b324267f6d67ceedc6af717&units=metric";
    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data);
            var temp = weatherData.main.temp
            var weatherDesc = weatherData.weather[0].description
            var icon_from_API = weatherData.weather[0].icon;
            const icon_url = "http://openweathermap.org/img/wn/" + icon_from_API + "@2x.png";
            res.write("<h1>The temperature in London is " + temp + " Celsius</h1>");
            res.write("<h3>The weather status is " + weatherDesc + "</h3>");
            res.write("<img src=" + icon_url + ">"); 
            res.send();
        })
    });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000.");
});