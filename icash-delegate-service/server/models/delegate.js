'use strict';
module.exports = function(sequelize, DataTypes) {
  var delegates = sequelize.define('delegates', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    delegate_type: DataTypes.STRING,
    delegate_address: DataTypes.STRING,

    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    dob: DataTypes.STRING,

    kyc_reference_id: DataTypes.STRING,
    kyc_provider: DataTypes.STRING,
    screen_name: DataTypes.STRING,
    expertise: DataTypes.STRING,
    delegate_type: DataTypes.STRING,
    availability: DataTypes.STRING,
    stake: DataTypes.STRING,
    
    wallet_address: DataTypes.STRING,
    delegate_state: DataTypes.STRING,
    delegate_state_change: DataTypes.STRING,
    adjudicate_categories: DataTypes.STRING,
    reserved_expertise: DataTypes.STRING,
    reserved_categories: DataTypes.STRING,
    primary_country: DataTypes.STRING,
    date_range: DataTypes.STRING,
    timescale: DataTypes.STRING,    

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return delegates;
};