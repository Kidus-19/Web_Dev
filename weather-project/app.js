const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
var query = req.body.city;
var unit = "metric"
const appid = "fa4cafa00732fdeef94392943e0128e1";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appid +"&units="+unit;
    https.get(url, function(response){
    
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently " + weatherDescription+ "</p>");
            res.write("<h1>The temperature in "+ query +" is " + temp + " degrees Celcius.</h1>");
            res.write("<img src =" + imageURL+ ">")
            res.send();

        })
    });
})


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});