"use strict";
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      ownerId: DataTypes.INTEGER,
      amenities: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      zip: DataTypes.STRING,
      country: DataTypes.STRING,
      address: DataTypes.STRING,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      cost: DataTypes.INTEGER,
    },
    {},
  );
  Room.associate = function (models) {
    // associations can be defined here
    Room.belongsTo(models.User, { foreignKey: "ownerId" });
    Room.hasMany(models.Rental, { foreignKey: "roomId" });
    Room.hasMany(models.RoomAmenity, { foreignKey: "roomId" });
    Room.hasMany(models.RoomImage, { foreignKey: "roomId" });
  };
  return Room;
};
