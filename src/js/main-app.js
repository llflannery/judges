import '../scss/main.scss';

$( document ).ready(function() {
    console.log( "ready!" );

$( ".summ i" ).click(function() {
  console.log("hellooooo");
  $( this ).parent().siblings('.stats').slideToggle( "slow", function() {});
});



$( ".summaryToggle" ).click(function() {
  console.log("helloooooMEEE");
  $( this ).prev('.summarybox').slideToggle( "slow", function() {});

  $(this).find('.expand').toggle();
  $(this).find('.minimize').toggle();
});

$(".sortRet").on("click", function () {
    // sortAsc('.judge .topsummary .third .retention','data-score');
    sortDesc('.judge .topsummary .third .retention','data-score');
});

function sortAsc(sortElement, dataAttr) {
  var $wrapper = $('#judges'),
      $articles = $wrapper.find(sortElement);
  [].sort.call($articles, function(a,b) {
      return +$(a).attr(dataAttr) - +$(b).attr(dataAttr);
  });
  $articles.each(function(){
      $wrapper.append( this.closest('.judge') );
  });
}

function sortDesc(sortElement, dataAttr) {
  console.log('im running');
  var $wrapper = $('#judges'),
      $articles = $wrapper.find(sortElement);
  [].sort.call($articles, function(a,b) {
      return -1*(+$(a).attr(dataAttr) - +$(b).attr(dataAttr));
  });
  $articles.each(function(){
      $wrapper.append( this.closest('.judge') );
  });
}

$(".namesearch").keyup(function (e) {
  filterFunction(this);
  $(this).parent().siblings('.entryHolder').css("visibility", "inherit");
});

function filterFunction(myInput) {
  var input, filter, ul, li, a, div, i, txtValue, thisentryholder;
  thisentryholder = $(myInput).parent().siblings('.entryHolder').attr('id');
  input = myInput;
  filter = input.value.toUpperCase();
  div = document.getElementById(thisentryholder);
  a = div.getElementsByClassName("entry");

  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    txtValue.toUpperCase().indexOf(filter) > -1 ? a[i].style.display = "" : a[i].style.display = "none";
  }
}


});
