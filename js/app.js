var content = $(".container");  
content.hide();

$(document).ready(function() {
  
  var display = $(".gif-display"); 
  var intro = $(".intro-screen");
  
  
  setTimeout(function() {
    loadTransition();
    intro.fadeOut();
    content.fadeIn(1000, function() {
    });
    },1500);
  
  // SEARCH FUNCTIONALITY //
  
  $(".search-btn").click(function() {
    loadTransition();
    displayGifs();
  });
  
  $(".search-field").keyup(function(event) {
      if (event.keyCode === 13) {
        loadTransition();
        displayGifs();
      }
  });
    
  
  $(".nav-item").click(function() {
    var navButtonText = "";
      $(this).each(function(item) {
        navButtonText = $(this)[item].textContent;
      })
    $(".search-field").val(navButtonText);
    loadTransition();
    displayGifs();
  })
  
  
    function displayGifs() {
      
    var searchTerm = $(".search-field").val();
    var url = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=kJRLU4rL7DZPj4ioHjxH8WIe7foyFk2u&limit=50";
    
    display.html("").css({"background-image":"none", "height":"auto"});
    var clearCountdown = $(".countdown").empty();
  
      $.ajax(
      {
        type: 'GET',
        url: url, 
        success: function(res){ 
                  clearCountdown;
                  res.data.forEach(function(item) {
                    var giphyURL = item.images.fixed_height.url;
                    display.append("<img class='gif' src='" + giphyURL + "'></img>");
                });
            }
        });
    };


  // PAGE TRANSITION //
  function loadTransition() {  
    
    var tl = new TimelineMax();
    
    tl
    .to(".screen-wipe-top", 0.5,{y: "50%", repeat: 1, yoyo: true})
    .to(".screen-wipe-bottom", 0.5,{y: "-50%", repeat: 1, yoyo: true}, 0)
    .to(".content-overlay", 0.5,{opacity : '1', repeat: 1, yoyo: true}, 0)
    
  }
  
});