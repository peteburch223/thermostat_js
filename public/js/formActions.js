$(document).ready(function(){
  var thermostat = new Thermostat();



  getLastSetting();
  


  navigator.geolocation.getCurrentPosition(onPositionUpdate);

  function onPositionUpdate(position) {
      console.log("position updated");
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      console.log("lat:" + lat + " lon:" + lon);
      updateWeather(lat,lon);
  }

  function getLastSetting(){
    var URL = 'http://localhost:4567/temperature';
    $.getJSON(URL, function(data){    
      if( data){
        thermostat.temperature = data.temperature;
        thermostat.power_save = data.powerSave;
      }
      updateDisplay();
      drawDial(getDialColour(thermostat.energyUsage()));
   
    });

  }


  $("#powersaving-on").click(function(){
    thermostat.psmOn();
    updateDisplay();
  });

  $("#powersaving-off").click(function(){
    thermostat.psmOff();
    updateDisplay();
  });

  $("#temperature-up").click(function(){
    thermostat.up();
    updateDisplay();
  });

  $("#temperature-down").click(function(){
    thermostat.down();
    updateDisplay();
  });

  $("#temperature-reset").click(function(){
    thermostat.resetTemperature();
    updateDisplay();
  });

  $("#get-current-weather").click(function(){
    updateWeather($("#current-location").val());
  });

  function updateDisplay(){
     postTemperature();
    if(thermostat.power_save){
      $("#powersaving-on").css("background-color", "green");
      $("#powersaving-off").css("background-color", "");
    } else{
      $("#powersaving-on").css("background-color", "");
      $("#powersaving-off").css("background-color", "red");
    }
    var myColour = getDialColour(thermostat.energyUsage());
    $('.dial').trigger('configure',{"fgColor":myColour});
    $(".dial").val(thermostat.temperature).trigger('change');
  }

  function postTemperature(){    
    var URL = 'http://localhost:4567/temperature';
    $.post(URL,{temp: thermostat.temperature, powerSave: thermostat.power_save});
  }

  function updateWeather(lat, lon){
    var URL_BASE = 'http://api.openweathermap.org/data/2.5/weather';
    var API_KEY = "c588cd4dbd4ef528c87265572854b0eb";
    var url = URL_BASE + "?lat=" + lat + "&lon=" + lon + "&APPID=" + API_KEY;
    console.log(url);
    $.getJSON(url, function(data){
      displayWeather(data);
      displayWeatherIcon(data);
    });
  }

  function updateWeather(city){
    var URL_BASE = 'http://api.openweathermap.org/data/2.5/weather';
    var API_KEY = "c588cd4dbd4ef528c87265572854b0eb";
    var url = URL_BASE + "?q=" + city + "&APPID=" + API_KEY;
    console.log(url);
    $.getJSON(url, function(data){
      displayWeather(data);
      displayWeatherIcon(data);
    });
  }

  function displayWeatherIcon(data){
    var ICON_BASE = "http://openweathermap.org/img/w/";
    var url = ICON_BASE + data.weather[0].icon + ".png";
    $("#weather-icon").attr("src",url);
  }

  function displayWeather(data){
    console.log(data['main']);
    var weatherDescription = data.weather[0].main;
    var weatherTemperature = Math.round(data.main.temp - 273);
    var weatherText = weatherDescription + ": " + weatherTemperature + "&deg;C"
    $("#weather-text").html(weatherText);
  }

  function getDialColour(usage){
    switch(usage){
      case 'low':
        return 'green';
        break;
      case 'medium':
        return "black";
        break;
      case 'high':
        return 'red';
        break;
    }
  }

  function drawDial(color){

    $(".dial").knob({
      'min':thermostat.MIN_TEMP,
      'max': thermostat.MAX_TEMP,
      'angleOffset':-125,
      'inputColor': "#00FF00",
      'angleArc':250,
      'fgColor': color,
      'width':200,
      'cursor':false,
      'thickness':.3,
      'readOnly':true
    });
};

});
