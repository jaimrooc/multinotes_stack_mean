(function() {
    // ------------------------------> Module <------------------------------ //
    var app = angular.module('starter', ['ionic']);
    

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
            url:'/create/',
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
    app.controller('ListCtrl', function($rootScope, $scope, $ionicPopup, $state, $http){

        $scope.notest = [];

        $scope.remove = function(id) {
            $http({
				method: 'DELETE',
				url: 'http://localhost:10443/simpleNotes/' + id
			}).then(function successCallback(response) {
				//$scope.notest = response.data;
			}, function errorCallback(response) {
				//$scope.notest = response.status;
			});
        };

        // Triggered on a button click, or some other target
        $scope.showPopup = function() {
            $state.go('create');
        };

        $http({
			method: 'GET',
			url: 'http://localhost:10443/simpleNotes',
		}).then(function successCallback(response) {
            $scope.notest = response.data;
		}, function errorCallback(response) {
			$scope.user = response.status;
		});
    });

    app.controller('EditCtrl', function($scope, $state, $ionicHistory, $http){
        $http({
            method: 'GET',
            url: 'http://localhost:10443/simpleNotes/' + $state.params.id
        }).then(function successCallback(response) {
            $scope.nota = response.data;
        }, function errorCallback(response) {
            console.log(response);
        });

        $scope.save = function() {
           // $scope.notest.update($scope.nota);

            $http({
                method: 'PUT',
                url: 'http://localhost:10443/simpleNotes/' + $state.params.id,
                data : $scope.nota
            }).then(function successCallback(response) {
                // $scope.notest = response.data;
                console.log(response);
            }, function errorCallback(response) {
                console.log(response);
            });

            $state.go("list",{},{reload: true})
        }
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

    app.controller('CreateCtrl', function($scope, $state, $http){
        $scope.nota = {};

        $scope.save = function() {
            //$scope.notest.update($scope.nota);
            
            $http({
                method: 'POST',
                url: 'http://localhost:10443/simpleNotes',
                data : $scope.nota
            }).then(function successCallback(response) {
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(response.data);
            });

            $state.go("list",{},{reload: true})
        }
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
