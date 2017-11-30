var express = require('express');
var nba_teams = require('./nba-teams.json');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/teams/:id/player', function(req, res){
	var id = req.params.id;
	var body = req.body;
	if(body.firstName && body.lastName && body.age && body.height && body.position){
		nba_teams.forEach(function(team){
			if(team.teamId == id || team.abbreviation == id || team.teamName == id){
				console.log("Joueur Ajouté");
				team.players.push(body);
				console.log(team);
			}
		});
		fs.writeFile("nba-teams.json", JSON.stringify(nba_teams), function(error){
			if (error) console.log(error);
		});
	}
	else{
		console.log("Il manque le prenom, le nom, l'abbreviation ,la taille ou la position");
	}
});

app.listen(3000, function(){
	console.log("Server ON");
});

