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

$(".play-area").ready(function(){
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
      if(currentPlay == "X"){
        $(this).append(x.cloneNode(true));
        currentPlay = "O";
        $(".next-play-image > .x").hide();
        $(".next-play-image > .circle").show();
      }else{
        $(this).append(circle.cloneNode(true));
        currentPlay="X"
        $(".next-play-image > .circle").hide();
        $(".next-play-image > .x").show();
      }
    }

  })



})
