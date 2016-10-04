function PlayerController(arr) {
  var playerService = new PlayerService()
  var myPlayers = [];

  function myRoster(arr){
    var myRosterElem = $('#my-roster');
    var template = '<h2>My Roster</h2>';
    for (var i = 0; i < arr.length; i++){
      var player = arr[i];
      template += `<div class="player-card">
                        <img src="${player.photo}" class="img-size">
                        <h3>${player.fullname}</h3>
                        <h4>${player.position}</h4>
                        <h3>${player.pro_team}</h3>
                        <h4>${player.jersey}</h4>
                        <button class=" btn-danger remove-player button" id="${player.id}" onclick="playerController.destroyForever(${player.id})">Remove</button>
                    </div>`
    }
    myRosterElem.empty().append(template);
  }
                    
  function updateRoster(arr) {
    var rosterElem = $('#roster')
    var template = ''
    for (var i = 0; i < arr.length; i++) {
      var player = arr[i];
      template += `<div class="player-card">
                        <img src="${player.photo}" class="img-size">
                        <h3>${player.fullname}</h3>
                        <h4>${player.position}</h4>
                        <h3>${player.pro_team}</h3>
                        <h4>${player.jersey}</h4>
                        <button class=" btn-success add-player button" id="${player.id}" onclick="playerController.addToRoster(${player.id})">Add to Roster</button>
                     </div>`
    }
    rosterElem.empty()
    rosterElem.append(template);
   }

  $('#player-team-form').on('submit', function () {
    event.preventDefault();
    var teamName = $('#teamInput').val()
    var form = event.target;
    var info = playerService.getPlayersByTeam(teamName)
    updateRoster(info)
  })

  $('#player-name-form').on('submit', function () {
    event.preventDefault();
    var fullname = $('#nameInput').val()
    var form = event.target;
    var info = playerService.getPlayersByName(fullname)
    updateRoster(info)
  })

  $('#player-pos-form').on('submit', function () {
    event.preventDefault();
    var position = $('#posInput').val()
    var form = event.target;
    var info = playerService.getPlayersByPosition(position)
    updateRoster(info)
  })
    

  playerService.getNFL(updateRoster)

  this.addToRoster = function(id){
    for (i=0; i < myPlayers.length; i++) {
      if (myPlayers[i].id == id) {
        return;
      }
    }
    var newPlayer = playerService.getPlayerById(id);
    myPlayers.push(newPlayer);
    myRoster(myPlayers);
  }

  this.destroyForever = function(id){
    for(i = 0; i < myPlayers.length; i++){
      if(myPlayers[i].id == id){
        myPlayers.splice(i,1)
      }

    } 
    myRoster(myPlayers)            
  }
}
var playerController = new PlayerController()



  



    






