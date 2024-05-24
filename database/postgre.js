const pg = require("pg")
const { /* Pool, */ Client } = pg
 require("dotenv").config()
/* const pool = new Pool({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 3211,
})
 
console.log(await pool.query('SELECT NOW()')) */
  //console.log(process.env.DATABASE_USER)
const client = new Client({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_URL,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
})
 
client.connect().then(()=>{
 console.log("Connected")
}).catch((error)=>{
  console.log(error.toString())
})

/* client.query('SELECT * from test').then(async(result)=>{
  console.log(result.rows)

  await client.end()
}) */

module.exports=client
 

 


