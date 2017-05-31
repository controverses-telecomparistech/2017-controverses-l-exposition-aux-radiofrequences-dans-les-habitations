/* #PRODUIRE{fond=cookiechoices_call.js,lang=fr}
   md5:4dac669942a45655400e8e1a0779238a */








function attachEventOnDOM (f) {
  if (document.addEventListener)
    document.addEventListener('DOMContentLoaded', f);
  else
    window.attachEvent('onload', f);
}
attachEventOnDOM(function(event) {
      cookieChoices.showCookieConsentBar(
                                         "En poursuivant votre navigation sur ce site, vous  acceptez  l\'utilisation de cookies pour vous proposer des contenus et services adaptés", 
                                         "OK", 
                                         "En savoir plus", 
                                         ""
                                        );
});