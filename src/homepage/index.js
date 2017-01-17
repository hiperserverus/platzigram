var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header');
var axios = require('axios');

page('/', header, asyncLoad,  function (ctx, next){

var main = document.getElementById('main-container');

title('Capture');


empty(main).appendChild(template(ctx.pictures));

});

function loadPictures(ctx, next) {

request
	.get('/api/pictures')
	.end(function (err,res){
		if (err) return console.log(err);
		ctx.pictures = res.body;
		next();
	})

}

function loadPicturesAxios(ctx, next) {

	axios
		.get('/api/pictures')
		.then(function (res) {

			ctx.pictures = res.data;
			next();

		})

		.catch(function (err) {

			console.log(err);
		})
}

function loadPicturesFetch(ctx, next) {

	fetch('/api/pictures')
		.then(function (res) {
			return res.json();
		})
		.then(function (pictures) {
			ctx.pictures = pictures;
			next();
		})
		.catch(function (err) {
			conole.log(err);
		})
}

async function asyncLoad(ctx, next) {
ctx.pictures = await fetch('/api/pictures').then(res => res.json())
next();
try {

} catch (err) {
return console.log(err);
}

}



