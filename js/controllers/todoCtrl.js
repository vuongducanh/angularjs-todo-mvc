angular.module('toDoMvc')
  .controller('TodoCtrl', function TodoCtrl($scope, data, $mdDialog) {
    $scope.todoMessage = {
      titleMessage: "title is required",
      contentMessage: "content is required",
      typeMessage: "type is required"
    }
    $scope.listToDo = [],
    $scope.originData = [],
    $scope.dataForm = {
      title: '',
      content: '',
      status: ''
    }
    $scope.dialogShow = false
    $scope.loading = true
    $scope.disableBtnAction = false
    $scope.typeDialog = '',
    $scope.pageLimit = 5

    data.getListToDo().then(res => {
      let dataTodo = res.data.sort(function (a, b) {
        return (b.id - a.id)
      })

      $scope.listToDo = dataTodo
      $scope.originData = dataTodo
      $scope.loading = false
    })
      .catch(err => {
        console.log(err)
        $scope.loading = false
      })

    $scope.paginateList = function() {
      let numberPaginate = Math.ceil($scope.listToDo.length / $scope.pageLimit)
      return new Array(numberPaginate);
    }

    $scope.handleDelete = function () {
      $scope.disableBtnAction = true
      data.deleteTodo($scope.dataForm.id).then(() => {
        const index = $scope.listToDo.findIndex(el => el.id === $scope.dataForm.id)
        $scope.listToDo.splice(index, 1)
        this.hideDialog()
        $scope.disableBtnAction = false
      })
        .catch(err => {
          console.log(err)
          $scope.disableBtnAction = false
        })
    }

    $scope.resetForm = function () {
      $scope.dataForm.title = ''
      $scope.dataForm.content = ''
      $scope.dataForm.status = ''
      $scope.dialogShow = false
    }

    $scope.showDialog = function (data, typeDialog) {
      $scope.dataForm = { ...data }
      $scope.typeDialog = typeDialog
      $scope.dialogShow = true
      $mdDialog.show({
        contentElement: '#dialogContent',
        clickOutsideToClose: false
      });
    }

    $scope.hideDialog = function () {
      this.resetForm()
      $mdDialog.hide();
    }

    $scope.createToDo = function () {
      if (!$scope.dataForm.title || !$scope.dataForm.content || !$scope.dataForm.status) return
      $scope.disableBtnAction = true
      data.createToDo($scope.dataForm).then(res => {
        $scope.listToDo.unshift(res.data)
        $scope.disableBtnAction = false
        this.hideDialog()
      })
        .catch(err => {
          console.log(err)
          $scope.disableBtnAction = false
        })
    }

    $scope.updateToDo = function () {
      if (!$scope.dataForm.title || !$scope.dataForm.content || !$scope.dataForm.status) return
      $scope.disableBtnAction = true
      data.updateTodo($scope.dataForm.id, $scope.dataForm).then(res => {
        const index = $scope.listToDo.findIndex(el => el.id === $scope.dataForm.id)
        $scope.listToDo[index] = res.data
        $scope.disableBtnAction = false
        this.hideDialog()
      })
        .catch(err => {
          console.log(err)
          $scope.disableBtnAction = false
        })
    }

    $scope.handleSearch = function() {
      var resultFilter = $scope.listToDo.filter(el => {
        if (el.title && el.title.includes($scope.keySearch)) {
          return el
        }

        if (el.content && el.content && el.content.includes($scope.keySearch)) {
          return el
        }
      })

      $scope.listToDo = resultFilter

      if (!$scope.keySearch) {
        $scope.listToDo = $scope.originData
      }
    }
  })
