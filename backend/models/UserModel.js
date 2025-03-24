import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const User = db.define('users', {
    date: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.NOW
    },    
    title: DataTypes.STRING,
    content: DataTypes.STRING
}, {
    freezeTableName: true
});

export default User;

(async()=>{
    await db.sync();
})();