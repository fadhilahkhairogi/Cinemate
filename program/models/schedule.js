// models/schedule.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js"; 
import Movie from "./movie.js";

class Schedule extends Model {}

Schedule.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    seats: {
      type: DataTypes.JSON, // store seat availability as JSON
      allowNull: false,
      defaultValue: {},
    },
  },
  {
    sequelize,
    modelName: "Schedule",
    tableName: "schedule",
    timestamps: false,
  }
);

// Define relationship
Schedule.belongsTo(Movie, { foreignKey: "movieId", as: "movie" });
Movie.hasMany(Schedule, { foreignKey: "movieId", as: "schedules" });

// Helper function to initialize seats (like Java code)
Schedule.prototype.initializeSeats = function () {
  const seats = {};
  for (let row = 65; row <= 71; row++) { // A-G
    for (let col = 1; col <= 10; col++) {
      const seat = String.fromCharCode(row) + col;
      seats[seat] = true;
    }
  }
  this.seats = seats;
};

export default Schedule;
