/*var app = angular.module("app", ["ngRoute"]);

app.config(["$routeProvider", function($routeProvider){
	$routeProvider.
	when("/man",{templateUrl: "manutencao.html",controller: "myController"}).
	when("/",{templateUrl: "producao.html",controller: "myController"}).
	otherwise({redirectTo: "/"});
    
}]);

app.controller("myController", function($scope, $http, $location){

	var $carousel = $('.carousel').flickity();

	carregarCaroucel($carousel);

	$(".scroll").click(function(event){        
    	event.preventDefault();
      $('html,body').animate({scrollTop:$(this.hash).offset().top - 50}, 800);	
	});

	$(window).scroll(function() {
	   if($(window).scrollTop() + $(window).height() == $(document).height()) {
	   		$(".circulo").css("display","none");
	   }
	   else
	   {
	   		$(".circulo").css("display","block");
	   }
	});

});*/

var $carousel = $('.carousel').flickity();

	carregarCaroucel($carousel);


	$(".scroll").click(function(event){        
		event.preventDefault();
		$('html,body').animate({scrollTop:$(this.hash).offset().top - 50}, 800);	
});

$(".side-nav li").click(function() {
	$('.button-collapse').sideNav('hide');
});

$(window).scroll(function() {
	 if($(window).scrollTop() + $(window).height() == $(document).height()) {
			 $(".circulo").css("display","none");
	 }
	 else
	 {
			 $(".circulo").css("display","block");
	 }
});

	$('.parallax').parallax();

	// Initialize collapse button
	$(".button-collapse").sideNav();

	$("#btnContato").click(function(){

		if( $("#nome").val() != "" && $("#email").val() != "" && $("#mensagem").val() != "")
		{

			console.log($("#nome").val());
			console.log($("#email").val());
			console.log($("#mensagem").val());

			$.ajax({
			  url: 'contact.php', // or /users/self/media/recent for Sandbox
			  type: 'POST',
			  data: {
				name: $("#nome").val(),
				email: $("#email").val(),
				message: $("#mensagem").val()

			  },
				success: function(data)
				{
					$('#formContato input').val("");
					$('#formContato textarea').val("");
					$("#cdSucesso").css("display", "block");
					setTimeout(function(){$("#cdSucesso").css("display", "none");},3000);
			  },
				error: function(data)
				{
					$('#formContato input').val("");
					$('#formContato textarea').val("");
					$("#cdErro").css("display", "block");
					setTimeout(function(){$("#cdErro").css("display", "none");},3000);
			  }
			});	
		}
		else
		{
			alert("Preencha todos os campos");
		}
	});


function carregarCaroucel(item)
{
    //get dados api
/*################################################################################*/
//https://api.instagram.com/v1/users/search?q=lacerdasouzaengenharia&access_token=5536912247.3a6b548.2609b93a94dc4e6fbfb3072f2c0d2f9e
/*################################################################################*/
var token = '5536912247.3a6b548.2609b93a94dc4e6fbfb3072f2c0d2f9e', // learn how to obtain it below
    userid = 5536912247, // User ID - get it in source HTML of your Instagram profile or look at the next example :)
    num_photos = 10; // how much photos do you want to get
 
$.ajax({
  url: 'https://api.instagram.com/v1/users/' + userid + '/media/recent', // or /users/self/media/recent for Sandbox
  dataType: 'jsonp',
  type: 'POST',
  data: {access_token: token, count: num_photos},
  success: function(data){

    for( x in data.data ){
      //console.log(data);
      //var $cellElems = $('<div class="carousel-cell"><img data-flickity-lazyload="'+data.data[x].images.low_resolution.url+'"></div>');
      var $cellElems = $('<div class="carousel-cell"><img src="'+data.data[x].images.low_resolution.url+'"/></div>');
      item.flickity( 'append', $cellElems );
      // data.data[x].images.low_resolution.url - URL of image, 306х306
      // data.data[x].images.thumbnail.url - URL of image 150х150
      // data.data[x].images.standard_resolution.url - URL of image 612х612
      // data.data[x].link - Instagram post URL 
    }
    //item.flickity('playPlayer');

  },
  error: function(data){
    console.log(data); // send the error notifications to console
  }
});
$('.carousel').flickity({
  // options
  contain: true
});
item.flickity('playPlayer');
}
