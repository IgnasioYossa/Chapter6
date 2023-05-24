const {UserGameBiodata,usergame} = require('./models')
const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT

const app = express();

const { Sequelize } = require('sequelize');
const UserGameModel = require('./models/UserGame');

// Create a new Sequelize instance
const sequelize = new Sequelize('users', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres'
});

// Initialize the UserGame model
const UserGame = UserGameModel(sequelize, Sequelize);

// Synchronize the models with the database
sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch((error) => {
  console.error('Unable to synchronize database:', error);
});

// const router = require('./router/router')
const authRouter = require('./router/router');
const usergameRouter = require('./router/usergame');

app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter)

app.use('/usergame', usergameRouter)


app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/', function(req, res){
    res.render('home')
})

app.get('/rock-paper-scissor', function(req, res){
    res.render('chapter4')
})


app.listen(PORT, function(){
    console.log(`Server berjalan di PORT ${PORT}`);
});

module.exports = UserGame;