require('dotenv').config();



module.exports = Object.freeze({
  TOKEN_SECRETKEY: process.env.TOKEN_KEY,
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  AUTH_PORT: process.env.AUTH_PORT
});
