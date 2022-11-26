const { createClient } = require('@redis/client');
const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const os = require ('os');
//const {Client} = require('pg');
//init prog
const PORT = process.env.PORT || 5000 ;
const app = express();

//connect db-mongo
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_ip = 'mongo';
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_ip}:${DB_PORT}`;
mongoose
.connect(URI)
.then(() => console.log('connect to db ...'))
.catch((err) => console.log('failed to connect to db: ',err));
//connect to redis
const REDIS_HOST = 'redis';
const REDIS_PORT = 6379
const client = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
client.on('error', (err) => console.log('Redis Client Error', err));
client.on('connect', () => console.log('connect to redis ...'));
client.connect();


//connect to postgres 

// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 5432;
// const DB_ip = 'postgres';
// const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_ip}:${DB_PORT}`;

// const clientpostgres = new Client({
//     connectionString: URI
//   });
// clientpostgres
// .connect()
// .then(() => console.log('connectd to postgres db ...'))
// .catch((err) => console.log('failed to connect to postgres db: ',err));





app.get('/', (req, resp) => {
    client.set('products', 'products...');
    resp.send('<h1>Hello App !</h1>');
    console.log(`traffic from ${os.hostname}`)
});
app.get('/data', async (req, resp) => {
    const products = await client.get('products')
    resp.send(`<h1>Hello App !hello hiiii</h1> <h2>${products}</h2>`);
});
app.listen(PORT, () => console.log(`app is up and running on port: ${PORT}`));