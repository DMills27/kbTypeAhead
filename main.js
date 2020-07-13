const mongoose     = require('mongoose');
const mongoosastic = require('mongoosastic');

mongoose.connect('<insert URI here>');
 
var UserSchema = new mongoose.Schema({
    name: String
  , email: String
  , city: String
});

UserSchema.plugin(mongoosastic, {
    "host": "localhost",
    "port": 9200
});

var User = mongoose.model('user', UserSchema);

User.createMapping((err, mapping) => {
    console.log('mapping created');
});

var newUser = new User({
    name: 'Carl',
    email: 'Carl@test.com',
    city: 'Kingston'
});

newUser.save((err) => {
    if(err) {
        console.log(err);
    }
    console.log('user added in both the databases');
})

newUser.on('es-indexed', (err, result) => {
    console.log('indexed to elastic search');
});