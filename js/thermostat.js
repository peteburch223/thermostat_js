'use strict';

function Thermostat(){
  this.DEFAULT_TEMP = 20;
  this.MIN_TEMP = 10;
  this.MAX_TEMP_SAVE = 25;
  this.MAX_TEMP = 32;
  this.LOW_THRESH = 18;
  this.MED_THRESH = 25;
  this.LOW_USAGE = 'low';
  this.MED_USAGE = 'medium';
  this.HIGH_USAGE = 'high';
  this.temperature = this.DEFAULT_TEMP;
  this.power_save = true;
};

Thermostat.prototype.up = function(){
  if(this.isMaxTemperature()){
    return;
  }
  this.temperature += 1;
};

Thermostat.prototype.down = function(){
  if (this.isMinTemperature()){
    return;
  }
  this.temperature -= 1;
};

Thermostat.prototype.resetTemperature = function(){
    this.temperature = this.DEFAULT_TEMP;
};

Thermostat.prototype.energyUsage = function(){
  if (this.temperature < this.LOW_THRESH){
    return this.LOW_USAGE;
  } else if (this.temperature < this.MED_THRESH){
    return this.MED_USAGE;
  } else {
    return this.HIGH_USAGE;
  }
};

Thermostat.prototype.psmOn = function(){
  this.power_save = true
  if (this.temperature > this.MAX_TEMP_SAVE){
    this.temperature = this.MAX_TEMP_SAVE;
  }
};

Thermostat.prototype.psmOff = function(){
  this.power_save = false
};
Thermostat.prototype.isMinTemperature = function(){
  return this.temperature == this.MIN_TEMP;
};

Thermostat.prototype.isMaxTemperature = function(){
  return (this.power_save && (this.temperature == this.MAX_TEMP_SAVE) ||
        !this.power_save && (this.temperature == this.MAX_TEMP));
};
