const express = require('express');
const router = express.Router();
const {UserGame, UserGameBiodata} = require('../models');


router.get('/userlist', async function(req,res){
    try {
        userDataAll = await UserGame.findAll();
        res.render('userGameDataAll', {userDataAll})
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error !');
    }  
});
router.get('/userlist/add', (req, res) => {
    res.render('userGameDataAllAdd')
})

router.post('/userlist/add', async function (req, res) {
    try {
      const { username, password } = req.body;
  
      await UserGame.create({ username, password });
      res.redirect('/usergame/userlist');
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error!');
    }
  });
router.get('/userlist/update/:id', async function(req, res) {
    try {
        const { id } = req.params;

        const user = await UserGame.findByPk(id);

        res.render('userGameDataAllUpdate', { user });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error!');
    }
});

router.post('/userlist/update/:id', async function(req, res) {
    try {
        const { id } = req.params;
        const { username, password } = req.body;

        const user = await UserGame.findByPk(id);

        user.username = username;
        user.password = password;
        await user.save();

        res.redirect('/usergame/userlist');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error!');
    }
});

router.get('/userlist/delete/:id', async function(req, res) {
    try {
        const { id } = req.params;

        await UserGame.destroy({
            where: { id: id }
        });

        res.redirect('/usergame/userlist');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error!');
    }
});

router.post('/userlist/delete/:id', async function (req, res) {
    try {
        const { id } = req.params;

        await UserGame.destroy({
            where: { id: id }
        });

        res.redirect('/usergame/userlist');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error!');
    }
});

// BIODATA
router.get('/biodata', async (req, res) => {
    try {
      const userGameBiodata = await UserGameBiodata.findAll({
        include: UserGame,
      });
        
      res.render('userBiodata', { userGameBiodata });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error!');
    }
  });

router.get('/biodata/add', (req, res) => {
    res.render('userBiodataAdd');
  });
  
  router.post('/biodata/add', async (req, res) => {
    try {
      const { full_name, date_of_birth, sex } = req.body;
  
      await UserGameBiodata.create({
        full_name,
        date_of_birth,
        sex,
      });
  
      res.redirect('/usergame/biodata');
    } catch (error) {
      console.log(error); 
      res.status(500).send('Internal Server Error!');
    }
  });
  
  
  
router.get('/biodata/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const userGameBiodata = await UserGameBiodata.findByPk(id);
  
      res.render('userBiodataUpdate', { userGameBiodata });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error!');
    }
  });
  
  router.post('/biodata/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { full_name, date_of_birth, sex, game_id } = req.body;
  
      await UserGameBiodata.update(
        { full_name, date_of_birth, sex, game_id },
        { where: { id } }
      );
  
      res.redirect('/usergame/biodata');
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error!');
    }
  });
  
  router.get('/biodata/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      await UserGameBiodata.destroy({
        where: { id }
      });
  
      res.redirect('/usergame/biodata');
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error!');
    }
  });
  

module.exports = router;
