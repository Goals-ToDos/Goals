const User = require('./userModel');
const fetch = require('node-fetch');
const request = require('superagent');

const UserController = {
  // Create a new user in the Database
  // the information will be sent in the request body in the react redux file
  createUser(req, res) {
    User.create({username: req.body.username, password: req.body.password},(err, user)=>{
      if(err){
        return res.status(400);
      }
      return res.status(200).json(user);
    })
  },

  // Get a user from the database and send it in the response
  // Send the user back
  getUserGoals(req, res) {
    const {username} = req.params;
    User.findOne({username},(err, user)=>{
      if(err){
        res.send("error in getUserGoals: " +err)
        return res.status(400);
      }
      return res.status(200).json(user.goals);
    })
  },

  getPassword(req, res) {
   const {username} = req.params;
    User.findOne({username},(err, user)=>{
      if(err){
        return res.status(400);
      }
      if(!user) return res.status(404).json(null);
      return res.status(200).json(user.password);
    })
  },

  // Get a user from the database and add the an goal array
  // the username is in the request body
  //send back the updated user
  updateUserGoals(req, res) {
    const {username} = req.params;
    const {goals} = req.body;
    User.findOneAndUpdate({username},{goals},(err, user)=>{
      if(err){
        res.send("error in updateUser: " +err)
        return res.status(400);
      }
      if(user.nModified === 0){
        res.send('user '+ username +' was not updated')
        return res.status(501);
      }
      return res.status(200).json(user);
    })
  },

   // Get a user from the database and add the an goal array
  // the username is in the request body
  //send back the updated user
  updateUserActions(req, res) {
    const {username} = req.params;
    const {actions} = req.body;
    User.findOneAndUpdate({username},{actions},(err, user)=>{
      if(err){
        res.send("error in updateUser: " +err)
        return res.status(400);
      }
      if(user.nModified === 0){
        res.send('user '+ username +' was not updated')
        return res.status(501);
      }
      return res.status(200).json(user);
    })
  },
  getUserActions(req, res) {
    const {username} = req.params;
    User.findOne({username},(err, user)=>{
      if(err){
        res.send("error in getUser: " +err)
        return res.status(400);
      }
      return res.status(200).json(user.actions);
    })
  },
  // Delete a student from the database
  // The student's first name will be sent in the request parameter 'name'
  // This should send a success status code
  deleteUser(req, res) {
    console.log("in delete user")
    const {username} = req.params;
    User.deleteOne({username},(err, user)=>{
      if(err){
        return res.status(400);
      }
      return res.status(200).json(user);
    })
  },

  oAuth(req,res){
    console.log('in oAuth');
    //we are doing a get request and passing info via urlencoded parameter "?"
    fetch('https://github.com/login/oauth/authorize?client_id=408d83d264e0e0e08cef').then(response => {
      res.redirect(response.url);
    })
  },
  code(req, res,next){
    console.log("in code")
    console.log('req.query.code:', req.query.code);
    const {code} = req.query;

    request.post('https://github.com/login/oauth/access_token')
    .send({ 
      client_id:'408d83d264e0e0e08cef',client_secret:'adf3cec52d36441245b224efeb5d6553e7a7fce5',
      code:code 
    }) // sends a JSON post body
    .set('Accept', 'application/json')
    .then(result => {
        const {access_token} =result.body;
        console.log('access_token',access_token);
        res.locals.token=access_token;
        return next();
    })
    
  },
  getInfo(req,res){

      console.log('res.locals.token:', res.locals.token)
      request.get('https://api.github.com/user')
        .set('Authorization', 'token '+res.locals.token)
        .then( newResult =>{
          console.log('newResult',newResult)
        })
  }
};

module.exports = UserController;
