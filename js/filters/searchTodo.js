angular.module('toDoMvc')
  .filter('search', function() {
    return function(value, keySearch) {
      if (value && keySearch) {
        var resultFilter = value.filter(el => {
          if (el.title.includes(keySearch)) {
            return el
          }

          if (el.content && el.content.includes(keySearch)) {
            return el
          }
        })

        return resultFilter
      }

      if (!keySearch) {
        return value
      }
    }
  })
