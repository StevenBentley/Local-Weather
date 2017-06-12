$(document).ready(function() {
  
  $(function() {
    $(".box1").draggable();
  });
  
  //Convert windbearing from API to String Direction
  function getCardinal(angle) {
  //easy to customize by changing the number of directions you have 
  var directions = 8;

  var degree = 360 / directions;
  angle = angle + degree / 2;

  if (angle >= 0 * degree && angle < 1 * degree)
    return "N";
  if (angle >= 1 * degree && angle < 2 * degree)
    return "NE";
  if (angle >= 2 * degree && angle < 3 * degree)
    return "E";
  if (angle >= 3 * degree && angle < 4 * degree)
    return "SE";
  if (angle >= 4 * degree && angle < 5 * degree)
    return "S";
  if (angle >= 5 * degree && angle < 6 * degree)
    return "SW";
  if (angle >= 6 * degree && angle < 7 * degree)
    return "W";
  if (angle >= 7 * degree && angle < 8 * degree)
    return "NW";
}
  //load data as soon as document loads
  getWeather();
  function getWeather() {
    //Get geolocation using ipinfo API
    $.getJSON('https://ipinfo.io/geo', function(data){
      console.log(data);
      $("#data").html("loc is: " + data.loc);
      $("#location").html(data.city + ", " + data.region);
      var weatherAPI = "https://api.darksky.net/forecast/cfd34afd6260ec515c33724f834f31db/" + data.loc + '?callback=?';
      //Get weather data using DarkSky API
      $.getJSON(weatherAPI, function(data) {
        console.log(data);
        var date = new Date(data.currently.time*1000);
        var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        $("#day").html(days[date.getDay()] + " " + date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}));
        $("#forecast").html(data.currently.summary);
        $("#temp").html(Math.round(data.currently.temperature) + "&degF");
        var skycons = new Skycons({"color": "black"});
        skycons.add(document.getElementById("icon1"), data.currently.icon);
        skycons.play();
        var windDir = getCardinal(data.currently.windBearing);
        $("#wind").html("Wind: " + windDir + " " + data.currently.windSpeed + " mph");
        $("#humidity").html("Humidity: " + data.currently.humidity*100 + "%");
        $("#cloudCover").html("Cloud cover: " + Math.round(data.currently.cloudCover*100) + "%");
        $("#dewPoint").html("Dew Point: " + Math.round(data.currently.dewPoint) + "&deg");
        var num = data.currently.pressure*0.02953;
        $("#pressure").html("Pressure: " + num.toFixed(2) + " in");
        $("#visibility").html("Visibility: " + data.currently.visibility + " mi");
         //switch statement to change background image to weather --photos from pexels
        switch (data.currently.icon) {
          case "clear-day":
            $("body").css("background-image", "url('https://s12.postimg.org/b62iwina5/clear_day.jpg')");
            break;

          case "clear-night":
            $("body").css("background-image", "url('https://preview.ibb.co/nMiUha/clear_night.jpg')");
            break;

          case "rain":
            $("body").css("background-image", "url('https://image.ibb.co/cOA9YF/rain_122691_640.jpg')");
            break;

          case "snow":
            $("body").css("background-image", "url('https://preview.ibb.co/iFWxna/winter_20248_1280.jpg')");
            break;

          case "sleet":
            $("body").css("background-image", "url('https://image.ibb.co/bOUiSa/icy_roads_567721_640.jpg')");
            break;

          case "wind":
            $("body").css("background-image", "url('https://preview.ibb.co/kUvYqv/wind.jpg')");
            break;

          case "fog":
            $("body").css("background-image", "url('https://preview.ibb.co/jkqCLv/sunrise_1620381_1280.jpg')");
            break;

          case "cloudy":
            $("body").css("background-image", "url('https://preview.ibb.co/iKNRfv/sky_1107579_1280.jpg')");
            break;

          case "partly-cloudy-day":
            $("body").css("background-image", "url('https://preview.ibb.co/fhaaqv/partly_cloudy_day.jpg')");
            break;

          case "partly-cloudy-night":
            $("body").css("background-image", "url('https://preview.ibb.co/fBniAv/cloudy_night.jpg')");
            break;

          default:
            $("body").css("background-image", "url('https://s12.postimg.org/b62iwina5/clear_day.jpg')");
      }
      });
    });
  };
});
