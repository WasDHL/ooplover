import { join } from 'path';
import Sequelize from 'sequelize';
import config from './../config';

let dbConfig = config.mysql;

export let sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host, 
    dialect: 'mysql',
    pool: {
        max: dbConfig.poolSize,
        min: 0,
        idle: 10000,
        validateConnection: function () {
        }
    },
    timezone: '+08:00'
});

sequelize.authenticate().catch(() => console.log('--- Mysql Connect Error !! ---'));

process.on('SIGUSR2', function () { sequelize.close(); });

export let User = sequelize.import(join(__dirname, './user'));
export let UserTracking = sequelize.import(join(__dirname, './userTracking'));
export let Message = sequelize.import(join(__dirname, './message'));

