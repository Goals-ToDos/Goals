const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const userController = require('./userController');

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get the html page a user in the database
// localhost://3000/user
app.use('/build',express.static(path.join(__dirname,'../build')))
app.get("/", (req, res) => {
    res.status(200);
    res.set({ 'content-type': 'text/html; charset=utf-8' })
    res.sendFile(path.join(__dirname, "../index.html"));    
})

// Create a user in the database localhost://3000/user
app.post('/user/create', userController.createUser);


// Get a user password from the database
app.get('/user/login/:username', userController.getPassword);

app.get('/oauth/', userController.oAuth);

app.get('/code/', userController.code,userController.getInfo);
// Get a user goals from the database
app.get('/user/:username', userController.getUserGoals);

// Change a user goals
// localhost://3000/user/"username"
app.patch('/user/:username', userController.updateUserGoals);

// Change a user actions
// localhost://3000/user/"username"
app.patch('/user/actions/:username', userController.updateUserActions);

// Get a user actions
// localhost://3000/user/"username"
app.get('/user/actions/:username', userController.getUserActions);

// Delete a user from the database
// localhost://3000/student/"username"
app.delete('/user/:username', userController.deleteUser);


app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
