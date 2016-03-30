$(document).ready(function(){
  var thermostat = new Thermostat();
  navigator.geolocation.getCurrentPosition(onPositionUpdate);

  updateDisplay(thermostat);


  function onPositionUpdate(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      $.ajax({
          url : "http://api.wunderground.com/api/ApiId/geolookup/conditions/q/"+lat+","+lon+".json",
          dataType : "jsonp",
          success : function(parsed_json) {
              var location = parsed_json['location']['city'];
              var temp_f = parsed_json['current_observation']['temp_f'];
              alert("Current temperature in " + location + " is: " + temp_f);
          }
      });
  }


  $("#powersaving-on").click(function(event){
    thermostat.psmOn();
    updateDisplay(thermostat);
  });

  $("#powersaving-off").click(function(event){
    thermostat.psmOff();
    updateDisplay(thermostat);
  });

  $("#temperature-up").click(function(){
    thermostat.up();
    updateDisplay(thermostat);
  });

  $("#temperature-down").click(function(){
    thermostat.down();
    updateDisplay(thermostat);
  });

  $("#temperature-reset").click(function(){
    thermostat.resetTemperature();
    updateDisplay(thermostat);
  });

  $("#get-current-weather").click(function(){
    updateWeather($("#get-current-weather").val());
  });

  function updateDisplay(){
    if(thermostat.power_save){
      $("#power-saving-status").text("on");
    } else{
      $("#power-saving-status").text("off");
    }
    $('#temperature').attr('class', thermostat.energyUsage());
    $("#temperature").text(thermostat.temperature);
  }

  function updateWeather(city){
    URL_BASE = 'http://api.openweathermap.org/data/2.5/weather';
    API_KEY = "c588cd4dbd4ef528c87265572854b0eb";
    url = URL_BASE + "?q=" + city + "&APPID=" + API_KEY;
    console.log(url);
    $.getJSON(url, function(data){
      displayWeather(data);
      displayWeatherIcon(data);
    });
  }

  function displayWeatherIcon(data){
    ICON_BASE = "http://openweathermap.org/img/w/";
    url = ICON_BASE + data.weather[0].icon + ".png";
    $("#weather-icon").attr("src",url);
  }

  function displayWeather(data){
    weatherDescription = data.weather[0].main;
    weatherTemperature = Math.round(data.main.temp - 273);
    weatherText = weatherDescription + ": " + weatherTemperature + "&deg;C"
    $("#weather-text").html(weatherText);
  }

});
