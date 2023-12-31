//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs")
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

})

app.post("/", function (req, res) {


    const query = req.body.cityName;
    const apiKey = "f94125cc08d8516653c881b9806f2b5a";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey;


    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.render("test", {weatherconditions: weatherDescription, theName: query, temperature: temp, img: imageURL})
        })
    });

    
})



app.listen(3000, function () {
    console.log("server on");
})