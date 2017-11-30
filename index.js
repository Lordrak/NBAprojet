var express = require('express');
var app = express();
var nba_teams = require('./nba-teams.json');
var bodyParser = require('body-parser');
var fs = require('fs');

function _findTeam(id){
	var team = nba_teams.find(function(pro){
		return pro.teamId == id || pro.abbreviation == id || pro.teamName == id;
	});
	return team;
}

app.get('/teams/:id', function(req, res){
	
	var id = req.params.id;	
	var team = _findTeam(id);
	if(team){
		res.status(200).send(team);
	}
	else{
		res.status(404).send("Mauvais ID");
	}
	
});


app.get('/teams', function(req, res){
	
	res.send(nba_teams);
});

app.get('/teams/:id/players' , function(req , res){
	var id = req.params.id;
	var team = _findTeam(id);
	if(team){
		res.status(200).send(team.players);
	}
	else{
		res.status(404).send("Mauvais ID");
	}
});

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

app.listen(3000, function(req, res){
	console.log('weshh')
});