app = (function(){

    let _author;
    let _blueprints;

    var _refreshAuthorState = function (author, blueprintObjects) {
        
        _author = author;
        _blueprints = blueprintObjects.map((blueprint) => {
            return { name: blueprint.name, puntos: blueprint.points.length }
        });

        if (author === "" || author == null) {
            alert("¡Debe poner un nombre en el buscador!");
        } else {
            $("#result-name").text(author + "'s Blueprints:");
        }
        $("#result-blueprints-detail td ").remove();
        _blueprints.map((blueprint) => {
            $("#result-blueprints-detail").append(
                "<tr><td>" + blueprint.name + "</td>" +
                "<td>" + blueprint.puntos + "</td>" 
                //"<td><input id=" + blueprint.name + " type = 'button' onclick='app.printBlueprint(this)' value='Open'/></td></tr>"                 
            );
        });

        let totalPuntos = _blueprints.reduce((total, currentValue) => total + currentValue.puntos, 0);
        $("#result-total-points").text("Total user's points: " + totalPuntos);

    };

    var actualizarAutor = function (author){
        _author = author;
    };

    var actualizarBlueprint = function(author){
        _author = author;
        apimock.getBlueprintsByAuthor(author, _refreshAuthorState);
        
    };

    var innerMockModule = {
        getAuthorBlueprints: function () {
            let author = $("#author-name").val();
            actualizarBlueprint(author);
        }
    };
    return innerMockModule;

})();