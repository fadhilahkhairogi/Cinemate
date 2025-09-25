//user.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; 

const User = sequelize.define( "User", {
    UserId: {
        type: DataTypes.BIGINT, 
        autoIncrement: true, 
        primaryKey: true, 
    }, 
    name: {
        type: DataTypes.STRING, 
        allowNull: false, 
    },
    username: {
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true,
    }, 
    email: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("user", "admin"),
        allowNull: false,
        defaultValue: "user",
    },
}, 
    {
    sequelize,
    modelName: "User",
    tableName: "User",
    timestamps: false,
  }
);

export default User;
