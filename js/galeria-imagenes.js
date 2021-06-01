
function generar_galeria_imagenes(selectorTablaHTML, numeroTotalImagenes, numeroColumnasPorFila, url, textoBoton) {

    $(selectorTablaHTML).empty();

    var spinerPrincipalHTML = "";
    spinerPrincipalHTML += "<thead>";
    spinerPrincipalHTML += "    <tr>";
    spinerPrincipalHTML += "        <th colspan=\"" + numeroColumnasPorFila + "\">";
    spinerPrincipalHTML += "            <div class=\"progress\" style=\"height:32px;\">"
    spinerPrincipalHTML += "                <div id=\"barra-progreso\" class=\"progress-bar\" style=\"width:0%; height:32px;\">0%</div>"
    spinerPrincipalHTML += "            </div>"
    spinerPrincipalHTML += "        </th>";
    spinerPrincipalHTML += "    </tr>";
    spinerPrincipalHTML += "</thead> ";

    $(selectorTablaHTML).append(spinerPrincipalHTML);
    $(selectorTablaHTML).append("<tbody></tbody>");

    var incrementoBarraProgreso = Math.floor(100 / (numeroTotalImagenes));
    var avanceBarraProgreso = 0;

    $.get(url, function (response) {

        contadorImagenesCargadas = 0;
        indiceFilaActual = 0;
        filas = new Array();
        filas[indiceFilaActual] = $("<tr></tr>");
        $(selectorTablaHTML + " tbody").append(filas[indiceFilaActual]);

        $.each(response, function (index, element) {

            if (((index + 1) % numeroColumnasPorFila) == 0) {
                indiceFilaActual++;
                filas[indiceFilaActual] = $("<tr></tr>");
                $(selectorTablaHTML + " tbody").append(filas[indiceFilaActual]);
            }

            var img = new Image();
            img.src = element.url;

            let imperial = "";
            let metric = "";
            let name = "";
            let life = "";
            let height = element.height;

            if (element.breeds[0] != undefined) {
                console.log(element.breeds[0].weight.imperial);
                imperial = element.breeds[0].weight.imperial;
                metric = element.breeds[0].weight.metric;
                name = element.breeds[0].name;
                life = element.breeds[0].life_span;
            }

            img.onload = function () {

                registroHTML = "<td class=\"text-center\">";
                registroHTML += "    <img id=\"imagen-" + element.id + "\" src=\"" + element.url + "\" class=\"img-thumbnail\" data-imperial='" + imperial + "' data-metric='" + metric + "' data-height='" + height + "' data-name='" + name + "' data-life='" + life + "' style=\"width:200px;height:150px;\" /><br/>";
                registroHTML += "    <button class=\"btn btn-info\" onclick=\"javascript:AbrirModal(this);\" style=\"width:100%; margin-top:1em;\"  >"
                registroHTML += "       <span id=\"ajax-loader-img-" + element.id + "\" class=\"spinner-border spinner-border-sm\"></span>"
                registroHTML += "       " + textoBoton
                registroHTML += "    </button>"
                registroHTML += "</td>";

                var registro = $(registroHTML).hide();

                $(filas[Math.floor(index / numeroColumnasPorFila)]).append(registro);
                $("#ajax-loader-img-" + element.id).hide();

                if (contadorImagenesCargadas == (numeroTotalImagenes - 1)) {
                    $(selectorTablaHTML + " td").fadeIn(2000);
                    console.log("Galería de imagenes completada")
                    actualizarBarraProgreso(100);
                } else {
                    contadorImagenesCargadas++;
                    avanceBarraProgreso += incrementoBarraProgreso;
                    actualizarBarraProgreso(avanceBarraProgreso);
                }
            }
        });

    });
}

function generar_galeria_imagenes_Raza(selectorTablaHTML, numeroTotalImagenes, numeroColumnasPorFila, url, textoBoton) {

    $(selectorTablaHTML).empty();

    var spinerPrincipalHTML = "";
    spinerPrincipalHTML += "<thead>";
    spinerPrincipalHTML += "    <tr>";
    spinerPrincipalHTML += "        <th colspan=\"" + numeroColumnasPorFila + "\">";
    spinerPrincipalHTML += "            <div class=\"progress\" style=\"height:32px;\">"
    spinerPrincipalHTML += "                <div id=\"barra-progreso\" class=\"progress-bar\" style=\"width:0%; height:32px;\">0%</div>"
    spinerPrincipalHTML += "            </div>"
    spinerPrincipalHTML += "        </th>";
    spinerPrincipalHTML += "    </tr>";
    spinerPrincipalHTML += "</thead> ";

    $(selectorTablaHTML).append(spinerPrincipalHTML);
    $(selectorTablaHTML).append("<tbody></tbody>");

    var incrementoBarraProgreso = Math.floor(100 / (numeroTotalImagenes));
    var avanceBarraProgreso = 0;

    contadorImagenesCargadas = 0;
    indiceFilaActual = 0;
    filas = new Array();
    filas[indiceFilaActual] = $("<tr></tr>");
    $(selectorTablaHTML + " tbody").append(filas[indiceFilaActual]);

    var i = 0;
    for (i = 0; i < numeroTotalImagenes; i++) {

        let indiceCiclo = i;

        if (((indiceCiclo + 1) % numeroColumnasPorFila) == 0) {
            indiceFilaActual++;
            filas[indiceFilaActual] = $("<tr></tr>");
            $(selectorTablaHTML + " tbody").append(filas[indiceFilaActual]);
        }

        $.get(url, function (b) {

            var img = new Image();
            img.src = b[0].url;
            let imperial = b[0].breeds[0].weight.imperial;
            let metric = b[0].breeds[0].weight.metric;
            let height = b[0].height;
            let name = b[0].breeds[0].name;
            let life = b[0].breeds[0].life_span;

            img.onload = function () {
                registroHTML = "<td id='img_" + indiceCiclo + "' class=\"text-center\">";
                registroHTML += "    <img id=\"imagen-" + b[0].id + "\" src=\"" + b[0].url + "\" class=\"img-thumbnail\" data-imperial='" + imperial + "' data-metric='" + metric + "' data-height='" + height + "' data-name='" + name + "' data-life='" + life + "' style=\"width:200px;height:150px;\" /><br/>";
                registroHTML += "    <button class=\"btn btn-info\" onclick=\"javascript:AbrirModal(this);\" style=\"width:100%; margin-top:1em;\"  >"
                registroHTML += "       <span id=\"ajax-loader-img-" + b[0].id + "\" class=\"spinner-border spinner-border-sm\"></span>"
                registroHTML += "       " + textoBoton
                registroHTML += "    </button>"
                registroHTML += "</td>";

                var registro = $(registroHTML).hide();

                $(filas[Math.floor(indiceCiclo / numeroColumnasPorFila)]).append(registro);
                $("#ajax-loader-img-" + b[0].id).hide();

                if (contadorImagenesCargadas == (numeroTotalImagenes - 1)) {
                    $(selectorTablaHTML + " td").fadeIn(2000);
                    console.log("Galería de imagenes de raza completada.")
                    actualizarBarraProgreso(100);
                } else {
                    contadorImagenesCargadas++;
                    avanceBarraProgreso += incrementoBarraProgreso;
                    actualizarBarraProgreso(avanceBarraProgreso);
                }
            }
        });
    };

}

function btnAction(identificadorImagen) {

    console.log("mostrar spiner para reflejar la ejecución de la llamada ajax de fondo");
    $("#ajax-loader-img-" + identificadorImagen).show();

    $.get(getBtnActionURL(), function (response) {

        //iterar por el único elemento que debería devolver la respuesta
        $.each(response, function (index, element) {
            //crear imagen para precargar antes de reemplazar por la existente
            var newImagen = new Image();
            newImagen.src = element.url;

            //cuando la imagen ya se encuentra descargada
            newImagen.onload = function () {

                $("#imagen-" + identificadorImagen).fadeOut(1000, function () {
                    // se reemplaza la seleccionada, una vez que ya se ha desvanecido, por la nueva ya descargada 
                    $("#imagen-" + identificadorImagen).attr("src", element.url);

                    // se oculta el spiner
                    $("#ajax-loader-img-" + identificadorImagen).hide();

                    // se vuelve a mostrar, pero con la nueva imagen
                    $("#imagen-" + identificadorImagen).fadeIn(2000);
                });

            };
        });
    });
}

function AbrirModal(obj) {

    var img = $(obj).closest('.text-center').find('img');
    var name = img.data('name');
    var url = img.attr('src');
    let imperial = img.data('imperial');
    let metric = img.data('metric');
    let height = img.data('height');
    let life = img.data('life');

    if ($('#miModal').length > 0) {

        $('.modal-header').empty();
        $('.modal-body').empty();


        if (name != "") {
            $('.modal-header').append('<strong>' + name + '</strong>');
        }

        if (url != "") {
            $('.modal-body').append('<img src="' + url + '" class=\"img-thumbnail\" />');
        }
        var list = "<ul class=\"list-group\">";

        if (height != "") {
            list = list + "<li class=\"list-group-item\">Estatura promedio en cms: " + formatNumber(height) + "</li>";
        }

        if (imperial != "") {
            list = list +  "<li class=\"list-group-item\">Peso hembra: Entre" + imperial + " kg</li>";
        }

        if (metric != "") {
            list = list + "<li class=\"list-group-item\">Peso Macho: Entre " + metric + " kg</li>";
        }

        if (life != "") {
            list = list + "<li class=\"list-group-item\">Promedio esperanza de vida: Entre " + life + " años</li>";
        }

        list = list + "</ul>";

        $('.modal-body').append(list);

        $("#miModal").modal("show");

    }
}

function actualizarBarraProgreso(porcentaje) {
    $("#barra-progreso").css("width", porcentaje + "%");
    $("#barra-progreso").html(porcentaje + "%");

    if (porcentaje == 100) {
        $("#barra-progreso").parent().fadeOut(2000);
    }
}

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$2,')
}