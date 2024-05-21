const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU92aEh6bzlyUUUzM3RMYnh3d3FnV2hzYTR0RGM2MUw4ZVdtcUd6OFFubz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZGZ5Zml0ZjJ0LzV4V2gwWndTQ3A0T1RrUlgxcXNoV2ZySjNxcDNLMmpnMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBSWpGdHh2dTdIa0JvbkZpYk1taTZBTVVJRnFQV1k5eUpockxkNlBwOEVJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLOXVPK0hJSWtKWERtVU4zM1VHdDNtZU0yVUxwNEI1NDRhM3hNbisxY1E4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9EWWMzd1duWXJLS1BxdXBxVjBxN0tkNHBjcVovazlNbFRRSjVhQWpLbkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkYyNGRuTkYxZVB4citSbXE2eXlrUDN4KzRqYlNkQm1HM1ZBVStYTGUraW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ1BRZERxdEtncWNPNk02NSszZkxGZUdybFRYREkxS1RCL0wxcUIrd0QzYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnpPVXZzcDNBTjAweUFaQmVnSHR5NkFkWVVzbzRHcTJ1QnF3Z1FIbzFWOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ii85dEpOS2JnVWd5NVhLTEdxUFlmQzdhc2tXQTFmYVdqcjcrSldISEJpUzkwYUJRQ3hvZ096UkNnUEorVGVKM1oxa0FJT21vZ0lnUzRoRVIwdTNOdmlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTU5LCJhZHZTZWNyZXRLZXkiOiJWYXM1dGlOV1l1N25XK1piQS9Rc0NNMGxId052anovaHBjVDdqZGhQOGNFPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDc0MzY4MDcwM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwNkNEMTk2QTVDNEVBNjk3QTczNDczRDk5M0M2QjBGNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzE2Mjc1ODIwfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJzM1FRX3oyOFRicWx2cVZ4S0JhakJnIiwicGhvbmVJZCI6ImRlNTliYTIxLWJmYmEtNDA5Mi04ZWNiLWFjZGY4YjgyZDQyOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJMdmIxYS8yRjdJdnExVGVvdXVpWDFabXBUSms9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik10Qi9MRlFrYTBJMzl6QXZRRnBvajkzRzE4ND0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01MTTF1RUZFTnlVc2JJR0dBOGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlZIQS9zWDJzSU1NK1EzVnAxa0pDK3lUcG9uMWpmY0JYVndNZmdQNTFsU289IiwiYWNjb3VudFNpZ25hdHVyZSI6Ilh4WmlNb3ltaUtFckFjYzNIWGVmNXVrQzFubjVBNmo3U1RMSDZtbVlXL0Q3Y0VRS0tnUVlCR1RFVXdpYkpFSEJvSFV5dmMwVjM1bE1XRXRiWmlkcEJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJxOWpSQS9QS0JiendXdlFNYVdlM2tmRFhrS09HdGNPZWhVUVowalNFalBVdk9yNGcrMVg4aEN5aXB0WEJROGtoZjU5SC8rczNCQ3hRZVJiQmZhOG1nUT09In0sIm1lIjp7ImlkIjoiMjU0NzQzNjgwNzAzOjE4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlRlY2hzYXZhZ2UifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0NzQzNjgwNzAzOjE4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlZSd1A3RjlyQ0REUGtOMWFkWkNRdnNrNmFKOVkzM0FWMWNESDREK2RaVXEifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MTYyNzU4MTcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRzFsIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Mbuvi Tech",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "254746440595",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'PING MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/a7ca8d4777fa8ad977795.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

