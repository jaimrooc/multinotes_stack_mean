(function() {
    // ------------------------------> Module <------------------------------ //
    var app = angular.module('starter', ['ionic', 'starter.noteStore']);

    // ------------------------------> Config <------------------------------ //
    app.config(function($stateProvider, $urlRouterProvider){
        // ### ruta: lista
        $stateProvider.state('list', {
            url:'/list',
            templateUrl:'templates/list.html'
        });
        // ### ruta: editar
        $stateProvider.state('edit', {
            url:'/edit/:id',
            controller:'EditCtrl',
            templateUrl:'templates/edit.html'
        });
        // ### ruta: crear
        $stateProvider.state('create', {
            url:'/create/:tipo',
            controller:'CreateCtrl',
            templateUrl:'templates/edit.html'
        });
        $urlRouterProvider.otherwise('list');
    });


    // ------------------------------> Directives <------------------------------ //
    app.directive('elastic', ['$timeout', function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, element) {
                $scope.initialHeight = $scope.initialHeight || element[0].style.height;
                var resize = function() {
                    element[0].style.height = $scope.initialHeight;
                    element[0].style.height = "" + element[0].scrollHeight + "px";
                };
                element.on("input change", resize);
                $timeout(resize, 0);
            }
        };
    }]);

    // ------------------------------> Controller <------------------------------ //
    app.controller('ListCtrl', function($scope, $ionicPopup, $state, noteStore){
        $scope.notas = noteStore.list();
        $scope.remove = function(id) {
            noteStore.remove(id);
        };

        // Triggered on a button click, or some other target
        $scope.showPopup = function() {
            $scope.data = {
                tipoNota:'text'
            }
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                templateUrl: 'templates/modal.html',
                title: '<h3 class="positive">Tipo de Nota:</h3>',
                subTitle: 'Seleccione el tipo de nota que desea crear',
                scope: $scope,
                buttons: [
                    // ---> Boton cancelar
                    {text: 'Cancelar',type: 'button-assertive'},
                    // ---> Boton crear
                    {
                        text: '<b>Crear</b>',
                        type: 'button-balanced',
                        onTap: function(e) {
                            $state.go('create', {tipo:$scope.data.tipoNota});
                            /*
                            if (!$scope.data.wifi) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.data.wifi;
                            }
                            */
                        }
                    },]
            });
            /*
            // regitra envento
            myPopup.then(function(res) {
                console.log('Tapped!', res);
            });
            */
        };


        $scope.showInterstatalCero = function() {
          if(AdMob) {
            AdMob.prepareInterstitial({
              adId:'ca-app-pub-3400035925342390/5821567865',
              //isTesting:false,
              autoShow:true
            });
          } else {
            alert('NO, adMob');
          }
        };
        $scope.showInterstatal = function() {
          /*
          if(AdMob) {
            AdMob.prepareInterstitial({
              adId:'ca-app-pub-3400035925342390/5821567865',
              //isTesting:false,
              autoShow:true
            });
          } else {
            alert('NO, adMob');
          }
          */
            'use strict';

            var admobData = {};

            // Determine platform
            if (/(android)/i.test(navigator.userAgent)) {
              admobData = {
                  banner: 'ca-app-pub-3400035925342390/4344834664',
                  interst: 'ca-app-pub-3400035925342390/5821567865'
              };
            } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
              admobData = {
                  banner: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                  interst: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
              };
            } else {
              admobData = {
                  banner: 'ca-app-pub-3400035925342390/4344834664',
                  interst: 'ca-app-pub-3400035925342390/5821567865'
              };
            }

              if(AdMob) {
                AdMob.prepareInterstitial({
                  adId:admobData.interst,
                  //isTesting:false,
                  autoShow:true
                });
              }

        };
        $scope.showInterstatal5 = function() {

          var cantidadClicks = angular.fromJson(window.localStorage['notas_cantidad_clicks'] || 0);

            alert('ingreso: '+cantidadClicks);
          if (cantidadClicks >= 7) {
          cantidadClicks=-1;
          try {
            if(AdMob) {
              AdMob.prepareInterstitial({
                adId:'ca-app-pub-3400035925342390/5821567865',
                //isTesting:false,
                autoShow:true
              });
            } else {
              alert('NO, adMob');
            }
          } catch (e) {

          } finally {

          }

          }

          window.localStorage['notas_cantidad_clicks'] = (cantidadClicks + 1);
        };
    });

    app.controller('EditCtrl', function($scope, $state, $ionicHistory, noteStore){
        $scope.id = $state.params.id;
        $scope.nota = angular.copy(noteStore.get($scope.id));

        // Habilitar la edicion
        $scope.nota.esEditar = true;

        $scope.save = function() {
            noteStore.update($scope.nota);
            $state.go('list');
        }

        // Eventos lista (Inicio)
        $scope.notaListaAdd = function() {
          if($scope.nota.descripcion.trim() != '') {
            var codigo = 0;
            if ($scope.nota.listaNotas.length == 0) {
                codigo++;
            } else {
                codigo = $scope.nota.listaNotas[$scope.nota.listaNotas.length - 1].id + 1;
            }
            $scope.nota.listaNotas.push({id:codigo,desc:$scope.nota.descripcion,estaChequeado:false});
            $scope.nota.descripcion = '';
          } else {
            alert('Debe ingresar una descripcion de tarea');
          }
        }
        $scope.notaListaRemove = function(id) {
            $scope.nota.listaNotas.splice(id, 1);
        }
        $scope.cambiarEstadoTariea = function(id) {
            $scope.nota.listaNotas[id].estaChequeado = !$scope.nota.listaNotas[id].estaChequeado;
        }
        // Eventos lista (Fin)
    });

    app.controller('historyOfBack', function($scope, $state, $ionicHistory, $ionicPopup) {
        $scope.myGoBack = function() {
            if ($state.current.name === 'create') {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Advertencia!!!',
                    template: 'Desea ignorar los cambios existentes?'
                });
                confirmPopup.then(function(res) {
                    if(res) {
                        $ionicHistory.goBack();
                    } else {
                        // bton cancelar
                    }
                });
            } else {
                $ionicHistory.goBack();
            }
        };
    });

    app.controller('CreateCtrl', function($scope, $state, noteStore){
        $scope.nota = {
            id: new Date().getTime().toString(),
            titulo: '',
            descripcion: '',
            esEditar: false,
            tipoNota: 'text', //text=texto; check=chequeo
            listaNotas: []
        };
        $scope.tareaToAdd = '';

        $scope.nota.tipoNota = $state.params.tipo;

        $scope.save = function() {
            if ($scope.nota.titulo.trim() == '') {
                var date = new Date();
                var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                $scope.nota.titulo = str;
            }

            noteStore.create($scope.nota);
            $state.go('list');
        }

        // Eventos lista (Inicio)
        $scope.notaListaAdd = function() {
          if($scope.nota.descripcion.trim() != '') {
            var codigo = 0;
            if ($scope.nota.listaNotas.length == 0) {
                codigo++;
            } else {
                codigo = $scope.nota.listaNotas[$scope.nota.listaNotas.length - 1].id + 1;
            }
            $scope.nota.listaNotas.push({id:codigo,desc:$scope.nota.descripcion,estaChequeado:false});
            $scope.nota.descripcion = '';
          } else {
            alert('Debe ingresar una descripcion de tarea');
          }
        }
        $scope.notaListaRemove = function(id) {
            $scope.nota.listaNotas.splice(id, 1);
        }
        $scope.cambiarEstadoTariea = function(id) {
            $scope.nota.listaNotas[id].estaChequeado = !$scope.nota.listaNotas[id].estaChequeado;
        }
        // Eventos lista (Fin)
    });

    // ------------------------------> RUN <------------------------------ //
    app.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

    })
}());
