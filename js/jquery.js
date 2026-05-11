$(document).ready(function(){

    // Animation au scroll
    $(window).on("scroll", function() {
        $(".progress-bar").each(function() {
            let position = $(this).offset().top;
            let scroll = $(window).scrollTop() + $(window).height();

            if(scroll > position) {
                $(this).animate({
                    width: $(this).attr("data-level")
                }, 1000);
            }
        });
    });

    // Accordéon formation
    $(".accordion-content").hide();

    $(".accordion-header").click(function(){
        $(this).next(".accordion-content").slideToggle();
    });

});
$("#contact-form").on("submit", function(e){
    e.preventDefault();

    let email = $("#email").val();
    let name = $("#name").val();
    let message = $("#message").val();

    if(name === "" || email === "" || message === "") {
        alert("Tous les champs sont obligatoires !");
        return;
    }

    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(!email.match(emailPattern)) {
        alert("Email invalide !");
        return;
    }

    alert("Message envoyé avec succès !");
});