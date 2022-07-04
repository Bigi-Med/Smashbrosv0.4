const express = require("express");
const app = express();
const constants = require('./constants');
const MONGO_URL = constants.MONGO_URL;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const uid = require('uuid');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

main().catch(err => console.log(err));

async function main(){
  await mongoose.connect(MONGO_URL);
  const UserAttributes = new mongoose.Schema({
    uid: String,
    username: String,
    dateJoined: { type: Date, default: Date.now },
    email: String,
    password: String,
    firstName: { type: String, default: 'John'},
    lastName: { type: String, default: 'Doe'},
    age: Number,
    gender: String,
    position: String,
    orientation: String,
    interest: String,
    description: String,
    passions: new Array(5).fill(null),
    altitude: Number,
    heading: Number,
    altitudeAccuracy: Number,
    latitude: Number,
    longitude: Number,
    accuracy: Number,
    imageLinks: new Array(5).fill(null),
    alreadySeen: new Array(),
    likes: [String],
    matches: [String]
  });

  const User = mongoose.model('Users', UserAttributes);

  console.log('Waiting for queries');

  app.post('/register/check-email', async (req, res) => {
    const email = req.body.email;
    const findUserEmail = email.toLowerCase();
    const alreadyExists = await User.findOne({email: findUserEmail});
    if(alreadyExists){
      console.log(`Email \"${email}\" already in use`);
      console.log("=========================")
      return res.status(409).send({message: "Email already in use."});
    }
    return res.status(200).send({message: "ok to register"});
  });

  app.post('/profile/upload-image', async (req, res) => {    
    console.log("=============== begin upload image ===============");
    console.log(req.body);
    const {index, imageLink, token} = req.body;
    jwt.verify(token, constants.TOKEN_SECRETKEY, async (err, result) => {
      if(err){
        console.log("error uploading img");
        return res.status(500).send({message: "Error updating profile"});
      }
      const findUserEmail = result.email.toLowerCase();
      const user = await User.findOne({email: findUserEmail});
      user.imageLinks[index-1] = imageLink;
      await user.save(async function (e, result) {
        if(e){
          console.log(err);
          return res.status(500).send({message: "error saving image"});
        }
        console.log("image saved");
        console.log("=============== end upload image ===============");
        return res.status(200).send({message: "image uploaded to db"});
      });
    });
  });

  app.post('/profile/location', async (req, res) => {

    const token = req.body.token;
    jwt.verify(token, constants.TOKEN_SECRETKEY, async (err, result) => {
      if(err){
        console.log(err);
        return res.status(500).send({message: "token expired, login please"});
      }
      const findUserEmail = result.email.toLowerCase();
      const user = await User.findOne({email: findUserEmail});
      await user.updateOne(req.body.location);
      const update = await User.findOne({email: findUserEmail});
      res.status(200).send({message: "update position success"});
    });
  });

  app.get('/profile/profile-photo', async (req, res) => {
    console.log("=============== begin sending profile photo ===============");
    const token = req.query.token;
    jwt.verify(token, constants.TOKEN_SECRETKEY, async (err, result) => {
      if(err){
        console.log(err);
        return res.status(500).send({message: "internal error, token expired or unavailable. retry login"});
      }
      const findUserEmail = result.email.toLowerCase();
      console.log("email: ",findUserEmail);
      const user = await User.findOne({email: findUserEmail});
      const link = user.imageLinks[0];
      console.log("link = ",link);
      console.log("=============== end sending profile photo ===============");
      if(link === undefined){
        return res.status(404).send({message: "profile photo not found"});  
      }
      return res.status(200).send({link: link});
    });
  });
  app.get('/profile/passions', async (req, res) => {
    const {token, passions} = req.body;
    jwt.verify(token, constants.TOKEN_SECRETKEY, async (err, result) => {

    });
  });
  app.put('/profile/passions', async (req, res) => {
    const {token, passions} = req.body;
    jwt.verify(token, constants.TOKEN_SECRETKEY, async (err, result) => {

    });
  });
  app.get('/profile/images', async (req, res) => {
    console.log("=============== begin sending images ===============");
    const token = req.query.token;
    jwt.verify(token, constants.TOKEN_SECRETKEY, async (err, result) => {
      if(err){
        console.log(err);
        return res.status(500).send({message: "internal error, token expired or unavailable. retry login"});
      }
      const findUserEmail = result.email.toLowerCase();
      console.log("email: ", findUserEmail);
      const user = await User.findOne({email: findUserEmail});
      if(!user){
        return res.status(404).send({message: "user not found"});
      }
      console.log("images: ", user.imageLinks);
      console.log("=============== end sending images ===============");
      if(user.imageLinks === []){
        return res.status(404).send({message: "no images found"});
      }
      return res.status(200).send({links: user.imageLinks});
    })
  });

  const filterTables = function (item, pos, self){
    return self.indexOf(item) == pos;
  }

  app.post('/home/likes', async (req, res) => {
    const token = req.body.token;
    const likedId = req.body.id;
    const state = req.body.state;
    if(!likedId){
      return res.sendStatus(500);
    }
    console.log("=============== begin processing like ===============");
    console.log("id of liked user =", likedId);
    jwt.verify(token, constants.TOKEN_SECRETKEY, async (err, result) => {
      if(err){
        console.log("=============== err ===============", err);
        return res.status(500).send({message: "internal error, token expired or unavailable. retry login"});
      }
      const findUserEmail = result.email.toLowerCase();
      const user = await User.findOne({email: findUserEmail});
      const otherUser = await User.findOne({uid: likedId});
      
      if(state){
        user.alreadySeen.push(likedId);
        user.likes.push(likedId);
        user.likes = user.likes.filter(filterTables); // filter user table from duplicates
        user.matches = user.matches.filter(filterTables); // filter user table from duplicates
      }
      
      const match = otherUser.likes.includes(user.uid); // check match (true or false)
      
      const otherUnique = otherUser.likes.filter(filterTables);
      otherUser.likes = otherUnique;
      console.log("match: ", match);

      otherUser.likes = otherUser.likes.filter(filterTables); // filter user table from duplicates
      otherUser.matches = otherUser.matches.filter(filterTables);
      
      if(match){
        user.matches.push(likedId);
        otherUser.matches.push(user.uid);
      }


      await otherUser.save();
      await user.save(async (e) => {
        if(e){
          console.log(err);
          return res.status(500).send({message: "err saving liked profile"});
        }
        console.log("=============== end processing like ===============");
        return res.status(200).send({match: match});
      });
    });
  });
  // add new user
  app.post('/register', async (req, res) => {
    try {
      const {firstName, lastName, username, email, password} = req.body.registerData; // email 100% new
      // create new user
      bcrypt.hash(password, 10, async function (err, hash) {

        const user = await new User({
          uid: uid.v4(),
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email.toLowerCase(),
          password: hash
        });
        const me = user.alreadySeen.push(user.uid);
        console.log(me);
        await user.save(function (err, result) {
          if (err) {
            console.log(err);
          }
          else {
            console.log("=============== begin register ===============");
            console.log("new user saved to database:", result);
            console.log("=============== end register ===============");
          }
        });

        res.status(200).send({message: "Register success"});


      });
    } 
    catch (err) {
      console.log(err);
    }
  });

  // login user
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body.loginData;
      console.log("=============== begin login ===============");
      // check email on login
      const user = await User.findOne({ email: email.toLowerCase() });

      if(user){
        console.log("user found");
      }
      else{
        console.log("user not found, wrong email.");
        console.log("=============== end login ===============");
        return res.status(404).send({message: "wrong email"}); // not found
      }

      // check login password
      const match = await bcrypt.compare(password, user.password);
      if (match){
        // generate token on login
        const token = jwt.sign(
          {user_id: user._id, email: email},
          constants.TOKEN_SECRETKEY,
          {expiresIn: '15d'}
        );

        console.log(`Welcome back ${user.username}`);
        console.log("=============== end login ===============");
        return res.status(200).send({token: token});
      }
      else{
        console.log("Incorrect Password");
        console.log("=============== end login ===============");
        return res.status(400).send({message: "Invalid Password, Please retry."});
      }
    } 
    catch (err) {
      console.log(err)
    }
  });

  app.post('/profile', async (req, res) => {
    console.log("=============== begin processing profile information ===============");

    console.log(req.body.profileData);
    const data = req.body.profileData;
    const token = data["token"];
    delete data["token"];
    for(const item in data){
      if(data[item] === ''){
        delete data[item];
      }
    }

    jwt.verify(token, constants.TOKEN_SECRETKEY, async (err, result) => {
      if(err){
        console.log(err);
        return res.send(500).send({message: "error updating profile"});
      }
      const findUserEmail = result.email.toLowerCase();
      const user = await User.findOne({email: findUserEmail});
      console.log("data: \n",data);
      const update = await user.updateOne(data);
      console.log(await User.findOne({email: findUserEmail}));
      if(update){
        console.log("=============== end processing profile information ===============");
        return res.status(200).send({message: "update success"});
      }
    });
  });


  // get profiles
  app.get('/home', async (req, res) => {
    let toSend = [];
    const img = constants.NOT_FOUND_PICTURE;
    const token = req.query.token;
    jwt.verify(token, constants.TOKEN_SECRETKEY, async (err, result) => {
      if(err){
        return res.status(500).send({message: "token expired"});
      }
      console.log("=============== begin sending profiles ===============");
      const findUserEmail = result.email.toLowerCase();
      console.log("email of user: ",findUserEmail);
      const user = await User.findOne({email: findUserEmail});
      
      const requiredGender = user.interest;
      let searchFor = "";
      if(requiredGender === "Men"){
        searchFor = "Male";
      }
      else if(requiredGender === "Women"){
        searchFor = "Female";
      }
      
      const users = await User.find({});
      // const users = await User.find({interest: searchFor}); // search by interest
      console.log("user id: ",user.uid);
      console.log("user interest: ",user.interest);
      console.log("user passions: ",user.passions);
      
      for(let i = 0; i < users.length; i++) {
          if(users[i].imageLinks.length > 0 
            && users[i].uid !== user.uid
            /* && !(user.alreadySeen.includes(users[i].uid)) */){
            
            toSend.push(users[i]);
          }  
      }
      console.log("=============== end sending profiles ===============");
      if(toSend !== []){
        return res.status(200).send({received: toSend});
      }
      else{
        return res.status(404).send({received: [img]});
      }
    });
  });

  app.get('/chat', (req, res) => {
    const token = req.query.token;
    jwt.verify(token, constants.TOKEN_SECRETKEY, async (err, result) => {
      if(err){
        console.log(err);
        return res.status(500).send({message: "internal error, token expired or unavailable. retry login"});
      }
      console.log("=============== begin sending chat info ===============");
      const findUserEmail = result.email.toLowerCase();
      const user = await User.findOne({email: findUserEmail});
      
      const matches = user.matches.filter(filterTables); // filter duplicates if exists
      
      var chat = new Array();
      var temp = null;
      for (let index = 0; index < matches.length; index++) {
          temp = await User.findOne({uid: matches[index]});
          chat.push({id: temp.uid, title: temp.username, link: temp.imageLinks[0]});   
      }
      console.log(chat);
      console.log("=============== end sending chat info ===============");
      return res.status(200).send({chat: chat});
    });
  });
  
  
  
  app.post('/test', (req, res) => {
    console.log(req.body);
    console.log("test success");
    res.send({test: 'flavio'});
  });

  // delete users
  app.delete('/', async (req, res) => {
    // const success = await User.deleteMany();
    // console.log("success: ", success);
  });
}

app.listen(constants.PORT, () => {
  console.log(`Server listening on port ${constants.PORT}`);
});
