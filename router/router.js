const express = require('express');
const router = express.Router();
const fs = require('fs');
const { UserGame } = require ('../models');

const usersFilePath = 'users.json';


function getUsersData() {
    const usersData = fs.readFileSync(usersFilePath, { encoding: 'utf8' });
    return JSON.parse(usersData);
}

router.get('/login', function(req, res) {
    res.render('login');
});
router.get('/login-choice', (req,res) => {
    res.render('loginChoice');
})
router.get('/adminlogin', (req,res) => {
    res.render('adminLogin');
})

router.post('/login', async function(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;
  
      const user = await UserGame.findOne({ where: { username, password } });
  
      if (user) {
        return res.redirect('/rock-paper-scissor');
      } else {
        return res.send('Invalid username or password. <a href="/auth/login">Go back to login page</a>');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error!');
    }
  });

  router.post('/adminlogin', async function(req, res) {
    try {
      const username = req.body.username;
      const password = req.body.password;
  
      const user = await UserGame.findOne({ where: { username, password } });
  
      if (user) {
        return res.redirect('/usergame/userlist');
      } else {
        return res.send('Invalid username or password. <a href="/auth/login">Go back to login page</a>');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error!');
    }
  });

router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', async function(req, res) {
    try {

      const username = req.body.username;
      const password = req.body.password;
  
      const existingUser = await UserGame.findOne({ where: { username } });
  
      if (existingUser) {
        
        return res.send('Username already exists');
      } else {
        
        await UserGame.create({ username, password });
        return res.redirect('/auth/login');
      }
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error!');
    }
  });

module.exports = router;
