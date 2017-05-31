jQuery(document).ready(function() {

   $("#btmenu").click(function(){
		$('NAV').slideToggle("slow");			
        return false;   
   });
     
});   


$(function() {

	// Find all YouTube videos
	var $allVideos = $("iframe[src^='http://www.youtube.com']"),

	    // The element that is fluid width
	    $fluidEl = $(".texte");

	// Figure out and save aspect ratio for each video
	$allVideos.each(function() {

		$(this)
			.data('aspectRatio', this.height / this.width)
			
			// and remove the hard coded width/height
			.removeAttr('height')
			.removeAttr('width');

	});

	// When the window is resized
	// (You'll probably want to debounce this)
	$(window).resize(function() {

		var newWidth = $fluidEl.width();
		
		// Resize all videos according to their own aspect ratio
		$allVideos.each(function() {

			var $el = $(this);
			$el
				.width(newWidth)
				.height(newWidth * $el.data('aspectRatio'));

		});

	// Kick off one resize to fix all videos on page load
	}).resize();

});


   
function charge(cible, url)
{
 document.getElementById(cible).innerHTML = "<center><img src='/images/attente.gif' style='width:40px;'></center>" ;
 $('#'+cible).load(url) ;
}


function favoris(NomSite,UrlSite) {

	if(window.sidebar) window.sidebar.addPanel(NomSite,UrlSite,""); //Mozilla, FireFox,...
	else if (window.external) window.external.AddFavorite(UrlSite, NomSite); //Internet explorer Windows
	else if (document.all && (navigator.userAgent.indexOf('Win') < 0)) alert ("Utilisez POMME + D \n pour ajouter " + NomSite + " dans vos favoris !"); //Internet explorer MAC
	else if (window.opera && window.print) alert ("Utilisez CTRL + T \n pour ajouter " + NomSite + " dans vos favoris !"); //Opera
	else alert ("Cette fonction n'est pas disponible pour votre navigateur."); }



