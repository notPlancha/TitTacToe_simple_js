var currentPlay = "X"

var circle = document.createElement("div");
circle.innerHTML =
  `
  <svg viewBox="0 0 80 80" style="height: 80px; width: 80px;">
    <circle fill="rgba(0,0,0,0)" stroke="black" stroke-width="3"
stroke-miterlimit="10" cx="40" cy="40" r="20"/>
  </svg>
  `;
circle.classList.add("circle");

var x = document.createElement("div");
x.innerHTML =
`
<svg viewBox="0 0 80 80" style="height: 80px; width: 80px;">
  <line stroke="black" x1 ="20" y1="20" x2="60" y2="60" stroke-width="3"/>
  <line stroke="black" x1 ="20" y1="60" x2="60" y2="20" stroke-width="3"/>
</svg>
`
x.classList.add("x");

function win(lastPlayed){
  //returns false if no one won
  let wins = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  let intsToStrings = function(arr){
    return arr.map(x => "box" + x.toString());
  };
  wins = wins.map(intsToStrings);

  let places = [];
  $(`[data-played="${lastPlayed}"]`).each(function(){
    places.push($(this).attr("id"));
  });
  var count;
  for (var i = 0; i < wins.length; i++) {
    count = 0;
    for (var i2 = 0; i2 < places.length; i2++) {
      if(wins[i].includes(places[i2])) count += 1;
    }
    if(count >= 3) return true;
  }
  return false;
}

$(".play-area").ready(function(){
  var winner = false;
  for (var i = 1; i <= 9; i++) {
    let $newDiv = $(document.createElement('div'))
      .addClass("box")
      .attr("id", "box" + i.toString())
      .attr("style", "grid-area: box" + i.toString() + ";")
      .attr("data-played", " ")
    ;
    $(".play-area").append($newDiv);
  }
  $(".next-play-image")
    .append(x.cloneNode(true))
    .append(circle.cloneNode(true))
  ;
  $(".next-play-image > .circle").hide();
  $(".box").on("click", function(){
    if($(this).attr("data-played") == " ") {
      $(this).attr("data-played", currentPlay);
      if(currentPlay == "X") $(this).append(x.cloneNode(true));
      else $(this).append(circle.cloneNode(true));

      if(win(currentPlay)){
        $(".next-play-caption > h2").text("Winner:");
        $(".box").off("click");
      }else if($('[data-played=" "]').length <= 0){
        $(".next-play-caption > h2").text("Draw");
        $(".next-play-image > .circle").hide();
        $(".next-play-image > .x").hide();
      }else{
        if(currentPlay == "X"){
          currentPlay = "O";
          $(".next-play-image > .x").hide();
          $(".next-play-image > .circle").show();
        }else{
          currentPlay="X"
          $(".next-play-image > .circle").hide();
          $(".next-play-image > .x").show();
        }
      }
    }
  })
})
