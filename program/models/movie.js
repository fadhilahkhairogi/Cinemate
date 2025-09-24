import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; 
const Movie = sequelize.define(
  "Movie",
  {
    movieId: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: "movie_id",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genres: {
      type: DataTypes.JSON, // list of strings
      allowNull: false,
      defaultValue: [],
    },
    releaseDate: {
      type: DataTypes.DATEONLY, // yyyy-MM-dd
      field: "release_date",
    },
    duration: {
      type: DataTypes.STRING,
    },
    posterUrl: {
      type: DataTypes.STRING,
      field: "poster_url",
    },
    description: {
      type: DataTypes.TEXT,
    },
    age: {
      type: DataTypes.STRING,
    },
    genresString: {
      type: DataTypes.VIRTUAL, // not stored in DB, computed
      get() {
        const genres = this.getDataValue("genres");
        return genres ? genres.join("/") : "";
      },
    },
  },
  {
    tableName: "movie",
    timestamps: false, // disable createdAt/updatedAt
  }
);

// Helper function like your `ListToString`
Movie.listToString = (list) => list.join("/");

export default Movie;
