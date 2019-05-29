 $(document).ready(function() {
  
  var content = $(".container"); 
  var display = $(".gif-display"); 
  var intro = $(".intro-screen");
  
// 'TV STATIC SCREEN' INTRO ANIMATION //

  setTimeout(function() {
    intro.fadeOut(3000);
    content.fadeIn(1000, function() {
    });
    },1500);
  
// SEARCH CLICK EVENTS //

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

// DISPLAY SEARCH RESULTS //

  function displayGifs() {
      
    var searchTerm = $(".search-field").val();
    var url = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=kJRLU4rL7DZPj4ioHjxH8WIe7foyFk2u&limit=50";
    
    display.html("").css({"background-image":"none", "height":"auto"});
  
      $.ajax(
      {
        type: 'GET',
        url: url, 
        success: function(res){
          
          // Display a GIF div for each result //
                  res.data.forEach(function(item) {
                    var giphyURL = item.images.fixed_height.url;
                    display.append("<div class='gif-wrapper'><img class='gif' src='" + giphyURL + "'></img><div class='gif-overlay'><input type='text' value='" + giphyURL + "'><span id='msg'></span><i class='fas fa-link fa-2x'></i></div></div>");
                });
                
         // Toggle GIF overlay panel on hover and set link icon display property to block //

                $(".gif-wrapper").each(function(i) {
                  var gifOverlay = $(this).children("div");
                  var linkIcon =  $(this).find("i");
                  var msg = $(this).find("span");

                    $(this).on( {
                       mouseenter: function() {
                          gifOverlay.animate({"height":"50px"});
                          linkIcon.css("display", "block");
                       }, 
                       mouseleave: function() {
                          gifOverlay.animate({"height":"0px"});
                          linkIcon.css("display", "none");
                          msg.text("");
                       },
                       click: function() {
                        var input = $(this).find("input");

                          input.select();
                          document.execCommand("copy");
                          console.log("GIF link copied to clipboard");
                          msg.text("Link copied to clipboard");
                       }
                    });
                })
            }
        });
    };


// PAGE TRANSITION FUNCTION //
  function loadTransition() {  
    var tl = new TimelineMax();
    tl
    .to(".screen-wipe-top", 0.5,{y: "50%", repeat: 1, yoyo: true})
    .to(".screen-wipe-bottom", 0.5,{y: "-50%", repeat: 1, yoyo: true}, 0)
    .to(".content-overlay", 0.5,{display : 'block', repeat: 1, yoyo: true}, 0)
    .to(".content-overlay", 0.5,{opacity : '1', repeat: 1, yoyo: true}, 0)
  }
  
}); // END DOCUMENT.READY