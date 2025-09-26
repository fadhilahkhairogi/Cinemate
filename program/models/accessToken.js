//accessToken.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./user.js";

const AccessToken = sequelize.define("AccessToken", {
    tokenId: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    revoked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }, 
}, {
    sequelize,
    modelName: "AccessToken",
    tableName: "access_token",
    timestamps: false,
});

//relationship
AccessToken.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(AccessToken, { foreignKey: "userId", as: "tokens" });

export default AccessToken;