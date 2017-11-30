(function() {
    var app = angular.module('starter.noteStore', []);

    // ---> Factory
    app.factory('noteStore', function() {
         
        /*
        // para eliminar el local storage (INICIO)
        $window.localStorage.clear();
        $ionicHistory.clearCache();
        $ionicHistory.clearHistory();
        // para eliminar el local storage (FIN)
        */
        var notas = angular.fromJson(window.localStorage['notas'] || '[]');
        // persistencia - inicio
        function persist() {
            window.localStorage['notas'] = angular.toJson(notas);
        }
        // persistencia - final
        
        return {
           list: function() {
               return notas;
           },
           get: function(id) {
               return notas.filter(function(nota){
                   return nota.id === id;
               })[0];
           },
           create: function(nota) {
               notas.push(nota);
               persist();
           },
           update: function(nota) {
               for(var i = 0; i < notas.length; i++){
                    if (notas[i].id === nota.id) {
                        notas[i] = nota;
                        persist();
                        return;
                    }
                }
           },
           remove: function(id) {
               for(var i = 0; i < notas.length; i++){
                    if (notas[i].id === id) {
                        notas.splice(i, 1);
                        persist();
                        return;
                    }
                }
           }
       };
    });
}());