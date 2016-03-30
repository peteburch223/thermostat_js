$(document).ready(function(){
  var thermostat = new Thermostat();
  updateDisplay(thermostat);

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


  function updateDisplay(){
    if(thermostat.power_save){
      $("#power-saving-status").text("on");
    } else{
      $("#power-saving-status").text("off");
    }
    $('#temperature').attr('class', thermostat.energyUsage());
    $("#temperature").text(thermostat.temperature);
  }



});
