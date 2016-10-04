function PlayerService(){
  var _players = [];
  var _nflPlayers = [];
  var _filteredPlayers = [];
  var playersData = [];
  var id = 3;



  this.getPlayerById = function(id) {
    for (i = 0; i < playersData.length; i++) {
      if (playersData[i].id == id) {
        return playersData[i];
      }
    }
  }
  this.getPlayersByTeam = function(teamName){
        return playersData.filter(function(player){
          if(player.pro_team == teamName){
            return true;
        }});
    }

    this.getPlayersByPosition = function(position){
        return playersData.filter(function(player){
          if(player.position == position){
            return true;
        }});
    }
    
    this.getPlayersByName = function(fullname){
            return playersData.filter(function(player){
              if(player.fullname == fullname){
                return true;
            }});
        }

    function cleanPlayersData(){
      playersData = playersData.filter(function(player){
        if(player.pro_status){
        return true;
        };
      })
      playersData = playersData.filter(function(player) {
        if(player.jersey){
          return true;
        }
      })
    }        
        
    this.getPlayers = function(cb){
    cb(_nflplayers)

    }
  
    this.addPlayer = function(name, pos, jersey){
    if(!name || !pos|| !jersey){
      return
    }
    var player = new Player(name, pos, jersey)
    _players.push(player)
    }
  
    this.getNFL = function loadPlayersData(callback){
      var apiUrl = "https://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
      var localData = localStorage.getItem('playersData');
      if(localData){
        playersData = JSON.parse(localData);
        return callback(playersData); 
      };
      
      var url = "https://bcw-getter.herokuapp.com/?url=";
      var endPointUrl = url + encodeURIComponent(apiUrl);
        $.getJSON(endPointUrl, function(data){
          playersData = data.body.players;
          console.log('Player Data Ready')
          console.log('Writing Player Data to localStorage')
          cleanPlayersData()
          localStorage.setItem('playersData', JSON.stringify(playersData))
          console.log('Finished Writing Player Data to localStorage')
          callback(playersData) 
        });
    }   
}
  
