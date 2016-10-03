function PlayerService(){
    var PlayerService = function(EndPointUrl, callback){
    var playersData = [];
    var _players = [];

    function Player(name, team, position, jersey, imageLink, id) {
        this.fullname = name;
        this.pro_team = team;
        this.position = position;
        this.jersey = jersey;
        this.photo = imageLink;
        this.id = id;

    this.getPlayers = function(){
    return _players
  }

    this.addPlayer = function(name, pos, jersey){
    if(!name || !pos|| !jersey){
      return
    }
        var player = new Player(name, pos, jersey)
        _players.push(player)
        }
  
  this.removePlayer = function(id){
    for (var i = 0; i < _players.length; i++) {
      var player = _players[i]
      if(player.id == id){
        return _players.splice(i,1)
      }
    }
  }

    this.getPlayersByTeam = function(teamName){
        playersData.filter(function(player){
        if(player.team == teamName){
        return true;
        }
    });  
    }

    this.getPlayersByPosition = function(position){
        playersData.filter(function(player){
      if(player.position == position){
        return true;
      }
    });
    }

   
    
    
    
  this.getNFL = function loadPlayersData(callback){
      var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
      //Lets check the localstorage for the data before making the call.
      //Ideally if a user has already used your site 
      //we can cut down on the load time by saving and pulling from localstorage 

      var localData = localStorage.getItem('playersData');
      if(localData){
        playersData = JSON.parse(localData);
        return callback(playersData); 
        //return will short-circuit the loadPlayersData function
        //this will prevent the code below from ever executing
      }

      var url = "http://bcw-getter.herokuapp.com/?url=";
      var endPointUrl = url + encodeURIComponent(apiUrl);
        $.getJSON(endPointUrl, function(data){
          playersData = data.body.players;
          console.log('Player Data Ready')
          console.log('Writing Player Data to localStorage')
          localStorage.setItem('playersData', JSON.stringify(playersData))
          console.log('Finished Writing Player Data to localStorage')
          callback(playersData) 
        });
    }
    }   

}
}
