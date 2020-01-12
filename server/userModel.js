const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const mongoDB = 'mongodb+srv://jenaepen:pen1321!@jenae-6dyj0.mongodb.net/test?retryWrites=true&w=majority';
// connect mongoose to the mongoDB database and rename it to db
mongoose.connect(mongoDB ,{ useNewUrlParser: true } );
const db =mongoose.connection

//console log the error if there is one
db.on('error', console.error.bind(console,'MongoDB connected error: '))

//once the connection is setup state connected to database
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

 const SALT_WORK_FACTOR = 10;

// create a user schema that requires a username, password and maybe goals
// https://www.thepolyglotdeveloper.com/2019/02/hash-password-data-mongodb-mongoose-bcrypt/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// https://mongoosejs.com/docs/middleware.html#pre

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  goals: {type: Array},
  actions: {type: Array}
});

userSchema.pre('save', function(next){
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err,hash)=>{
    if(err) return next(err);
    this.password = hash;
    return next();
  })
})

module.exports = mongoose.model('User', userSchema);
