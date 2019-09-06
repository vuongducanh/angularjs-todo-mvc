angular.module('toDoMvc')
  .factory('apiTodo', function($http) {

    var api = {};

    api.getListToDo = function () {
      return $http({
        method: 'GET',
        url: 'https://5d70b5c1d3448a001411ac90.mockapi.io/listTodo/todo'
      });
    }

    api.createToDo = function (data) {
      return $http({
        method: 'POST',
        url: 'https://5d70b5c1d3448a001411ac90.mockapi.io/listTodo/todo',
        data: data
      })
    }

    api.deleteTodo = function (id) {
      return $http({
        method: 'DELETE',
        url: `https://5d70b5c1d3448a001411ac90.mockapi.io/listTodo/todo/${id}`
      })
    }

    api.updateTodo = function (id, data) {
      return $http({
        method: 'PUT',
        url: `https://5d70b5c1d3448a001411ac90.mockapi.io/listTodo/todo/${id}`,
        data: data
      })
    }

    return api;
  })
