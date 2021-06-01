$( document ).ready(function() {

  

});

window.onload = function() {
    //Acciones para Gatos
    $( ".cargaimagengatos" ).each(function( index ) {
        console.log( index + ": " + $( this ).text() );
        $.ajax({
            method: "GET",
            url: "https://api.thecatapi.com/v1/images/search?e6c15222-54de-4de1-88dc-6395e6665b8c",
            dataType: "json",
            data: {}
          }).done(json => $(this).attr("src",json[0].url));
      });

      


    

      //Acciones para Perros
      $( ".cargaimagenperros" ).each(function( index ) {
        console.log( index + ": " + $( this ).text() );
        $.ajax({
            method: "GET",
            url: "https://api.thedogapi.com/v1/images/search?b0ef2d52-535c-4120-bf7f-08613770b768",
            dataType: "json",
            data: {}
          }).done(json => $(this).attr("src",json[0].url));
      });

  }

