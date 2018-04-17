var RegisterCtrl = function ($scope, $http) {
    $scope.SendData = function (Data) {
        var GetAll = new Object();
        GetAll.FirstName = Data.firstName;
        GetAll.Surname = Data.lastName;
        GetAll.Gender = Data.gender;
        GetAll.Mobile = data.mobile;
        GetAll.SecondGet = new Object();
        GetAll.SecondGet.EmailID = Data.email;
        GetAll.SecondGet.Password = Data.password;


        $http({
            url: "NewRoute/firstCall",
            dataType: 'json',
            method: 'POST',
            data: GetAll,
            headers:
                {
                    "ContentType": "application/json"
                }

        }).success(function (response) {
            $scope.value = response;
        })
        .error(function (error) {
            alert(error);
        });
    }
};