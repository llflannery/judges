import '../scss/main.scss';

$( document ).ready(function() {
    console.log( "ready!" );

//toggle down
$( ".summ" ).click(function() {
  $( this ).siblings('.stats').slideToggle( "slow", function() {});
  $( this ).find('i.fa-minus-square').toggle();
  $( this ).find('i.fa-plus-square').toggle();
  $( this ).toggleClass('selected');
});



$( ".summaryToggle" ).click(function() {
  // var that = $(this);
  // if( $('.minimize').is(':visible') ){
  //   // var myID = $(this).parent().attr('id');
  //   // console.log(myID);
  //   // scrollToAnchor(myID);
  //   $(this).parent().find('.topsummary .second .name a')[0].click(function(e){ e.preventDefault(); });
  //   console.log( $(this).parent().find('.topsummary .second .name a') );
  // } else {}

  $( this ).prev('.summarybox').slideToggle( "slow", function() {});
  $(this).find('.expand').toggle();
  $(this).find('.minimize').toggle();
});

$( ".surveyAll" ).click(function() {
  // if ( $(this).next().find('.stats').is(':visible') ){
  //   $(this).next().find('.stats').hide();
  // } else { }

  $(this).next().find('.stats').slideToggle( "slow", function() {});
  $(this).find('.expand').toggle();
  $(this).find('.minimize').toggle();
});




$( ".courtFilter" ).click(function() {
  $( this ).next('.courtHolder').slideToggle( "slow", function() {});
  $( ".courtFilter i.fa-caret-down" ).toggle();
  $( ".courtFilter i.fa-caret-up" ).toggle();
});



$(".sort").on("click", "i", function () {
  console.log(this);

  if ( $(this).parent().attr('id') === "sortRet" ){

    if ( $(this).attr('class') === 'fa fa-caret-down' ) {
      sortDesc('.judge .topsummary .third .retention','data-score');
    } else if ( $(this).attr('class') === 'fa fa-caret-up') {
      sortAsc('.judge .topsummary .third .retention','data-score');
    } else {  sortAsc('.judge .topsummary','data-score'); }

  } else if ( $(this).parent().attr('id') === "sortScore" ) {

    if ( $(this).attr('class') === 'fa fa-caret-down' ) {
      sortDesc('.judge .topsummary .third .rating','data-score');
    } else if ( $(this).attr('class') === 'fa fa-caret-up') {
      sortAsc('.judge .topsummary .third .rating','data-score');
    } else { sortAsc('.judge .topsummary','data-score');  }

  } else { console.log("what did I even push"); }

  $('.sort i').removeClass('selected');
  $(this).addClass('selected');
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
  $(this).parent().find('.entryHolder').css("visibility", "inherit");
  $('.courtbutton').removeClass('selected');
  $('.courtbutton#all').addClass('selected');
});

function filterFunction(myInput) {
  var input, filter, ul, li, a, div, i, txtValue, thisentryholder;
  thisentryholder = $(myInput).parent().find('.entryHolder').attr('id');
  input = myInput;
  filter = input.value.toUpperCase();
  div = document.getElementById(thisentryholder);
  a = div.getElementsByClassName("entry");

  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    txtValue.toUpperCase().indexOf(filter) > -1 ? a[i].style.display = "" : a[i].style.display = "none";
  }
}


$( ".entry" ).click(function() {
  document.getElementById("thisInput").value = $(this).text();
  $('.entryHolder').css("visibility", "hidden");
  var selectedID = $(this).attr('id');
  $('.judge').css('display','none');
  $('#judges').find('#' + selectedID).css('display','block');
});

$(".fa-times-circle").click(function () {
  $('#judges').find('.judge').css("display","block");
  $(this).siblings('#thisInput').val('');
  var e = $.Event('keyup');
  e.keyCode = 46; // enter

  $(this).siblings("#thisInput input[type='text']").select().trigger(e);
  $(this).siblings('#thisInput').trigger(e);
  $('.entryHolder').css("visibility", "hidden");
});


// function countJudges() {
//   var count = $(".judge:visible").length;
//   $('.buttonHolder').find('.numJudges span').text(count);
//   console.log(count);
// }


$(".courtbutton").click(function () {
  $('.courtbutton').removeClass('selected');
  $( this ).addClass('selected');

  var selectedID = $( this ).attr('id');

  $('#judges').find('.judge').hide();

  if ( selectedID === 'all' ) {
    $('#judges').find('.judge' ).show();
  } else { $('#judges').find('.judge.' + selectedID ).show(); }
  // countJudges();
});





});
