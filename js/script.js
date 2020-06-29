/*********************************************************************************************************************************************/
/* 							IGDB API CALLS START								*/
/****************************************************/
$( document ).ready(function (e) {
	addButtons()
	postRequest('http://localhost:8080/https://api-v3.igdb.com/games/', "fields name, cover.image_id, platforms ; limit 8; where platforms = 6 & rating > 75 & pulse_count > 5 & cover != null; sort release_dates desc;")
  .then(data => {
		makeGameSlider(data)
	})
  .catch(error => console.error(error))
})

$('#getPopularGames').on("click", function (e) {
	$('.games__container').empty()
	addButtons()
	postRequest('http://localhost:8080/https://api-v3.igdb.com/games/', "fields name, cover.image_id, platforms ; limit 8; where platforms = 6 & rating > 75 & pulse_count > 10 & cover != null; sort popularity desc;")
  .then(data => {
		makeGameSlider(data)
	})
  .catch(error => console.error(error))
})

$('#getRecentGames').on("click", function (e) {
	$('.games__container').empty()
	addButtons()
	postRequest('http://localhost:8080/https://api-v3.igdb.com/games/', "fields name, cover.image_id, platforms ; limit 8; where platforms = 6 & cover.image_id != null & pulse_count > 30 & release_dates.date <= 1560643200 & cover != null; sort release_dates desc;")
  .then(data => {
		makeGameSlider(data)
	})
  .catch(error => console.error(error))
})

$('#getUpcomingGames').on("click", function (e) {
	$('.games__container').empty()
	addButtons()
	postRequest('http://localhost:8080/https://api-v3.igdb.com/games/', "fields name, cover.image_id, release_dates.date; where platforms = 6 & release_dates.date>=1560643200; limit 8;")
  .then(data => {
		makeGameSlider(data)
	})
  .catch(error => console.error(error))
})

$( document ).ready(function (e) {
	postRequest('http://localhost:8080/https://api-v3.igdb.com/pulses/', "fields title, summary, author, published_at, image, website.url; where author != null; limit 8; sort published_at desc;")
  .then(data => {
		jQuery.each(data, function(index, val) {
		// Add Picture
		$(".news").append("<div class=\"news__entry entry"+index+"\">")
		$(".news__entry.entry"+index).append("<div class=\"news__entry__image entry"+index+"\">")
		$(".news__entry__image.entry"+index).append("<img src=\""+val.image+"\">")
		// Add Content Wrapper and descending wrappers
		$(".news__entry.entry"+index).append("<div class=\"news__entry__content entry"+index+"\">")
		$(".news__entry__content.entry"+index).append("<div class=\"news__entry__content__title entry"+index+"\">")
		$(".news__entry__content.entry"+index).append("<div class=\"news__entry__content__author entry"+index+"\">")
		$(".news__entry__content.entry"+index).append("<div class=\"news__entry__content__date entry"+index+"\">")
		$(".news__entry__content.entry"+index).append("<div class=\"news__entry__content__source entry"+index+"\">")
		$(".news__entry__content.entry"+index).append("<div class=\"news__entry__content__summary entry"+index+"\">")
		// Fill with Content
		$(".news__entry__content__title.entry"+index).append("<h3>"+val.title+"</h3>")
		$(".news__entry__content__author.entry"+index).append("<div>"+val.author+"</div>")
		$(".news__entry__content__date.entry"+index).append("<div>"+val.published_at+"</div>")
		$(".news__entry__content__source.entry"+index).append("<a href=\""+val.website.url+"\">Source Link</a>")
		$(".news__entry__content__summary.entry"+index).append("<p>"+val.summary+"</p>")
		})
	})
	.catch(error => console.error(error))
})

// CORRESPONDING FUNCTIONS
function postRequest(url, data) {
	return fetch(url, {
		credentials: 'same-origin', // 'include', default: 'omit'
		method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
		body: data, // Coordinate the body type with 'Content-Type'
		headers: new Headers({
		'Content-Type': 'raw',
		'user-key' : '2bb2b4e94e423cf9bd1e04266b179551'
		}),
	})
	.then(response => response.json())
}

function addButtons() {
	$('.games__container').append("<button class=\"games__container__button--display-left\" onclick=\"plusDivs(-1)\">&#10094;</button>")
	$('.games__container').append("<button class=\"games__container__button--display-right\" onclick=\"plusDivs(+1)\">&#10095;</button>")
}

function makeGameSlider(data) {
	jQuery.each(data, function(index, val) {
		$("<div class=\"mySlides "+ index +"\">").appendTo(".games__container")
		$("<div class=\"game__name\">").append(document.createTextNode(val.name)).appendTo(".mySlides."+index);
	})
	console.log(data);
	jQuery.each(data, function(index, val) {
		console.log("Index:"+index+" Name:"+val.name)
		$("<img src=\"//images.igdb.com/igdb/image/upload/t_screenshot_huge/"+val.cover.image_id+".jpg\">").appendTo(".mySlides."+index)
		slider()
	})
}
/****************************************************/
/* 							IGDB API CALLS END									*/
/*********************************************************************************************************************************************/

/*********************************************************************************************************************************************/
/* 					SLIDER FUNCTIONALITY START							*/
/****************************************************/
var slideIndex = 1;

function slider () {
	var slideIndex = 1;
	showDivs(slideIndex);
}

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; 
  }
  x[slideIndex-1].style.display = "block"; 
}
/****************************************************/
/* 					SLIDER FUNCTIONALITY END								*/
/*********************************************************************************************************************************************/

/*********************************************************************************************************************************************/
/* 		Togglers & Nav Button Animations START				*/
/****************************************************/
$("#toggleGames").click(function(){
	if ($(".games-wrapper").css("display") == "none") {
		$(".games-wrapper").toggle();
		if ($(".news-wrapper").css("display") == "block") {
			$(".news-wrapper").toggle();
		}
		if ($(".stuff-wrapper").css("display") == "block") {
			$(".stuff-wrapper").toggle();
		}
	}
	// Set Active Class
	$("#toggleGames").toggleClass("active");
	if ($('#toggleNews').hasClass("active")) {
		$("#toggleNews").toggleClass("active");
	}
	if ($('#toggleStuff').hasClass("active")) {
		$("#toggleStuff").toggleClass("active");
	}
})

$("#toggleNews").click(function(){
	if ($(".news-wrapper").css("display") == "none") {
		$(".news-wrapper").toggle();
		if ($(".games-wrapper").css("display") == "block") {
			$(".games-wrapper").toggle();
		}
		if ($(".stuff-wrapper").css("display") == "block") {
			$(".stuff-wrapper").toggle();
		}
	}
	// Set Active Class
	$("#toggleNews").toggleClass("active");
	if ($('#toggleGames').hasClass("active")) {
		$("#toggleGames").toggleClass("active");
	}
	if ($('#toggleStuff').hasClass("active")) {
		$("#toggleStuff").toggleClass("active");
	}
})

$("#toggleStuff").click(function(){
	if ($(".stuff-wrapper").css("display") == "none") {
		$(".stuff-wrapper").toggle();
		if ($(".games-wrapper").css("display") == "block") {
			$(".games-wrapper").toggle();
		}
		if ($(".news-wrapper").css("display") == "block") {
			$(".news-wrapper").toggle();
		}
	}
	// Set Active Class
	$("#toggleStuff").toggleClass("active");
	if ($('#toggleGames').hasClass("active")) {
		$("#toggleGames").toggleClass("active");
	}
	if ($('#toggleNews').hasClass("active")) {
		$("#toggleNews").toggleClass("active");
	}
})
/****************************************************/
/* 		Togglers & Nav Button Animations END					*/
/*********************************************************************************************************************************************/

/*********************************************************************************************************************************************/
/* 									FORM START											*/
/****************************************************/
document.querySelector("#submit").addEventListener('click', function(e) { submitClicked(e) }, false);
function submitClicked (e) {
    e.preventDefault();
    var vorname = document.forms["kontakt-form"]["vorname"].value;
    if (vorname == "") {
        alert("Vorname muss ausgefüllt werden!");
        return false;
    }
    var nachname = document.forms["kontakt-form"]["nachname"].value;
    if (nachname == "") {
        alert("Nachname muss ausgefüllt werden!");
        return false;
    }
    var text = document.forms["kontakt-form"]["text"].value;
    if (text == "") {
        alert("Nachricht muss ausgefüllt werden!");
        return false;
    }
    $("#stuff").append("<div class=\"success\"><p>Erfolgreich übermittelt! Danke für Ihre Nachricht.</p></div>")
}
/****************************************************/
/* 									FORM END												*/
/*********************************************************************************************************************************************/