// var loading = true; //Start the spinner
// var apiUrl = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
// var playerService = new PlayerService(apiUrl, ready);

// function ready(){
//     loading = false; //stop the spinner
    
//     $('byTeam').on('click',function(){
//       var teamSF = playerService.getPlayersByTeam("SF");
//     }



function PlayerController(){
        
var playerService = new PlayerService()       
        
        function updateRoster(arr){
        var rosterElem = $('#roster')
        var template = ''
        for (var i = 0; i < arr.length; i++) {
        var player = arr[i];
        template += `<div class="player-card">
                               <img src="http://s.nflcdn.com/static/content/public/image/fantasy/transparent/200x200/" alt="">
                               <h3>${player.name}</h3>
                               <h4>${player.position}</h4>
                               <h3>${player.jersey}</h3>
                               <button class="remove-player" id="${player.id}">DESTROY FOREVER</button>
                     </div>`
    }
    rosterElem.empty()
    rosterElem.append(template);
    // registerRemove()
  }
  
  $('.new-player-form').on('submit', function addPlayer(event){
    event.preventDefault();
    var form = event.target;
    playerService.addPlayer(form.pName.value, form.pPosition.value, form.pJersey.value)
    updateRoster(playerService.getPlayers())
  })

        $('#roster').on('click', 'button.remove-player', function(){
        playerService.removePlayer(this.id)
        updateRoster(playerService.getPlayers())
    })


    playerService.getNFL(updateRoster)
                            
                    
    }

PlayerController()      


    
                              
    