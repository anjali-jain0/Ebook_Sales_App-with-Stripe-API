const express = require('express');

const keys = require('./config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

const app = express();

app.set("view engine",'ejs');

app.use(express.static('./public'));

var bodyParser=require('body-parser');

var urlencodedParser=bodyParser.urlencoded({extended: false});

app.get('/',function(req,res){
	res.render('homepage',{stripePublishableKey:keys.stripePublishableKeys});
});

app.post('/charge',urlencodedParser,function(req,res){
	const amount=2500;
	stripe.customers.create({
		email:req.body.stripeEmail,
		source:req.body.stripeToken
	})
	.then(function(customer){
		stripe.charges.create({
			amount:amount,
			decription:'Web Development Ebook',
			currency:'usd',
			customer:customer.id
		})
	})
	.then(function(charge){
		res.render('success');
	});
});

const port =process.env.PORT || 8080;
app.listen(port);
