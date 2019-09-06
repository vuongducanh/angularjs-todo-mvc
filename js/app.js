angular.module('toDoMvc', ['material.svgAssetsCache', 'ngRoute', 'ngResource', 'ngMaterial', 'ngMessages'])
  .config(function($routeProvider) {

    var routerConfig = {
      controller: 'TodoCtrl',
      templateUrl: 'toDoMvc-index.html',
      resolve: {
        data: function(apiTodo) {
          return apiTodo
        }
      }
    }

    $routeProvider
      .when('/', routerConfig)
      .otherwise({
				redirectTo: '/'
			});
  })
