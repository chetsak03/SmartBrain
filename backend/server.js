const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {

users :[{
	id:'1',
	name:'chetan',
	email:'banchhod.chetan@gmail.com',
	password:'8668810434',
	entries:'0',
	joined: new Date()
},

{
	id:'2',
	name:'Akaash',
	email:'wasuleaakash@gmail.com',
	password:'8668810432',
	entries:'0',
	joined: new Date()
}
]
}




app.get('/', (req, res) => {
	res.send(database.users);
})

app.post('/signin', (req, res) => {
	// bcrypt.compare("chetan31995", '$2a$10$TEiXCziot0dG8OiKnXfv0OiTLAWhK5/wI5CuMUPSO7itj9Ebw2Mt2', function(err, res) {
	// console.log('first ',res);
	// });
	// bcrypt.compare("veggies", '$2a$10$TEiXCziot0dG8OiKnXfv0OiTLAWhK5/wI5CuMUPSO7itj9Ebw2Mt2', function(err, res) {
	// console.log('second',res);
	// });
	if(req.body.email === database.users[0].email 
		&& req.body.password === database.users[0].password ){

		res.json(database.users[0]);
	}else{
		res.status(400).json("error while logging in ");

	}
})

app.post('/register', (req, res) => {
	const {name, email, password} = req.body;
	// bcrypt.hash("password", null, null, function(err, hash) {
 //    console.log(hash);
	// });
	database.users.push({
	id:'3',
	name:name,
	email:email,
	password:password,
	entries:'0',
	joined: new Date()
	})

	res.json(database.users[database.users.length - 1]);

})

app.get('/profile/:id', (req, res) => {
	const{ id } = req.params;
	let found = false;
	database.users.forEach(user =>{ 
		if(user.id === id){
			found = true;
			return res.json(user);
		}
	})
	if(!found){
		res.status(400).json("user not found.");
	}
})

app.put('/image', (req, res) => {
	const{ id } = req.body;
	let found = false; 
	database.users.forEach(user =>{
		if(user.id === id){
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	})
	if(!found){
		res.status(400).json("user not found.");
	}
})




app.listen(3000, ()=>{

console.log("running on 3000");
})