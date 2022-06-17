const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
const db = require('./models/index.js')

const app = express();

app.use(express.json());
app.use(cors());

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//async function hashIt(password){
//    const salt = await bcrypt.genSalt(6);
 //   const hashed = await bcrypt.hash(password, salt);
 // }

app.post("/register", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    //const hashedPassword = hashIt(password);

    db.users.create({name: username, email:email});
});

//const jane = db.users.create({ name: "Jane", email: "Doe" });
//console.log("Jane's auto-generated ID:", jane.id);

app.listen(3001, () => {
    console.log("server is running")
});