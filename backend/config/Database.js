import { Sequelize } from "sequelize";

const db = new Sequelize('crud_tugas2', 'root', 'irish@irisH10',{
    host: '34.57.51.107',
    dialect: 'mysql',
    timezone: "+07:00"
});

export default db;