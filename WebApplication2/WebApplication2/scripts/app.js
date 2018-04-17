//angular module
var app= angular.module("app", [])
//Registration Controller
app.controller('RegisterCtrl', function ($scope, $http) {
    $scope.SendData = function () {
        var register = $http({
            url: "api/Customers",
            dataType: "json",
            method: "POST",
            data: {
                id: $scope.ID , firstName: $scope.FirstName, lastName: $scope.LastName, gender: $scope.Gender, mobile: $scope.Mobile,
                email: $scope.Email, password: $scope.Password
            },
            headers:
                {
                    "ContentType": "application/json"
                }

        }).then(function (success) {
            goodAlert();
        },
        function (error) {
        badAlert();
      });
    }
});
//Login Controller
app.controller('LoginController', function ($scope, $http, userApi /*$rootScope,*/ /*$location*/) {
        $scope.AccessUser = function () {
            userApi.GetUser($scope.ID, $scope.Password).then(function (response) {
                if (response.data === null) {
                    badAlert();
                }
                else {
                    goodAlert();
                    //$rootScope.currentUser = response.data;
                    //$location.path("index.html");
                }
            }),
             function (response) {
                badAlert();
            }
        };
});

//Bootstrap JS Alerts
function goodAlert() {
    var alert = document.getElementById("goodalert");
    alert.style.display = "block";
}

function badAlert() {
    var alert = document.getElementById("badalert");
    alert.style.display = "block";
}