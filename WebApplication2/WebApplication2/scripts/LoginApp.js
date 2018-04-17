/// <reference path="C:\Users\Reverside\Desktop\WebApplication2\WebApplication2\netfloristViews/AdminDashboard.html" />
/// <reference path="C:\Users\Reverside\Desktop\WebApplication2\WebApplication2\netfloristViews/AddImage.html" />
/// <reference path="C:\Users\Reverside\Desktop\WebApplication2\WebApplication2\netfloristViews/AddImage.html" />
/// <reference path="C:\Users\Reverside\Desktop\WebApplication2\WebApplication2\netfloristViews/AddImage.html" />
var LoginApp = angular.module("LoginApp", ['loginService', 'ngCookies']);
//Login Controller
LoginApp.controller('LoginController', function ($scope, $http, userApi,$cookies,customerPersist) {
    $scope.AccessUser = function () {
        userApi.GetUser($scope.ID, $scope.Password).then(function (response) {
            if (response.data === null) {
                badAlert();
            }
            else {
                goodAlert();
                var customer = {
                    customerid: response.data.ID,
                    customername: response.data.firstName,
                    customersurname: response.data.lastName,
                    customeremail: response.data.email,
                    customermobile: response.data.mobile,
                    customergender: response.data.gender,
                    customerpassword:response.data.password
                }
                customerPersist.setCookieData(customer);
                console.log(customer);
                alert("Welcome " + customer.customername);
                //$rootScope.currentUser = response.data;
                setTimeout(window.location = "index.html", 4000);
            }
        }),
         function (response) {
             badAlert();
         }
    };

});
//View Customers
LoginApp.controller("CustomersController", function ($scope, $http, userApi,customerPersist) {
    getCustomers();
    function getCustomers() {
        userApi.GetCustomers().then(function (response) {
            $scope.customer = response.data;
        }), function () {
            badAlert();
        }
    }
});
LoginApp.controller("CustomerDetailsController", function ($scope, $http, userApi, customerPersist) {
    var customer = customerPersist.getCookieData();
    $scope.customerid = customer.customerid;
    $scope.customername = customer.customername;
    $scope.customeremail = customer.customeremail;
    $scope.customersurname = customer.customersurname;
    $scope.customermobile = customer.customermobile;
    $scope.customergender = customer.customergender;
    $scope.customerpassword = customer.customerpassword
    $scope.updateCustomer = function () {
        var customer = {
            ID: $scope.customerid,
            firstName: $scope.customername,
            lastName: $scope.customersurname,
            email: $scope.customeremail,
            password: $scope.customerpassword,
            mobile: $scope.customermobile,
            gender: $scope.customergender,
            password: $scope.customerpassword
        }
        userApi.PutCustomer(customer).then(function (response) {
            $scope.customerid = $scope.customerid;
            $scope.customername = undefined;
            $scope.customersurname = undefined;
            $scope.customeremail = undefined;
            $scope.customermobile = undefined;
            $scope.customergender = undefined;
            $scope.customerpassword = $scope.customerpassword;
            customerPersist.clearCookieData();
            alert("successfully updated customer information");
            window.location = "../Login.html";
        })
    }
    var customerData = [];
    $scope.customer = customer.customerid;

    $http({
        method: 'Get',
        url: "http://localhost:58815/api/Orders"
    }).then(function success(response) {
        $scope.OrderData = response.data;
        console.log($scope.OrderData);
        angular.forEach($scope.OrderData, function (key, value) {
            if ($scope.customer == key.ID) {
                customerData.push(key);
                $scope.data = customerData;
                console.log($scope.data);
            }
        });
    }, function error(response) {
        alert("Error!");
    });
    $scope.logOut = function () {
        customerPersist.clearCookieData();
        window.location = "../index.html";
    }
});
//Admin
LoginApp.controller('AdminController', function ($scope, $http, userApi,adminPersist) {
    $scope.adminLogin = function () {
        userApi.GetAdmin($scope.Email, $scope.Password).then(function (response) {
            if (response.data == null) {
                badAlert();
            }
            else {
                var administrator = {
                    adminname: response.data.Firstname,
                    adminsurname: response.data.Surname,
                    adminemail: response.data.Email
                }
                adminPersist.setCookieData(administrator);
                goodAlert();
                alert("Welcome " + administrator.adminname);
                setTimeout(window.location = "../netfloristViews/AdminDashboard.html", 4000);
            }
        }),
        function (response) {
            badAlert();
        }
    }
    $scope.logOut = function () {
        adminPersist.clearCookieData();
        alert("Logged out successfully");
        window.location = "../index.html";
    }
});

LoginApp.controller('DriverController', function ($scope, $http, userApi, driverPersist) {
    $scope.driverLogin = function () {
        userApi.GetDriver($scope.DriverEmail, $scope.Password).then(function (response) {
            if (response.data == null) {
                badAlert();
            }
            else {
                var driver = {
                    driverid: response.data.DriverID,
                    drivername: response.data.DriverName,
                    driversurname: response.data.DriverSurname,
                    driveremail: response.data.DriverEmail,
                    driverpassword: response.data.Password,
                }
                driverPersist.setCookieData(driver);
                console.log(JSON.stringify(driver));
                goodAlert();
                setTimeout(window.location = "../netfloristViews/DriverDashboard.html");
            }
        }),
        function (response) {
            badAlert();
        } 
    }

    getDrivers();
    function getDrivers() {
        userApi.GetDrivers().then(function (response) {
            $scope.driver = response.data;
        }), function () {
            badAlert();
        }
    }
    
    $scope.logOut = function () {
        driverPersist.clearCookieData();
        window.location = "../index.html";
        }
});

LoginApp.controller('DriverDetailsController', function ($scope, $http, userApi, driverPersist) {
    var driver = driverPersist.getCookieData();
    $scope.drivername = driver.drivername;
    $scope.driversurname = driver.driversurname;
    $scope.driveremail = driver.driveremail;
    $scope.driverid = driver.driverid;
    $scope.driverpassword = driver.driverpassword;
    var driverData = [];
    $scope.driver = $scope.driverid;
    $scope.updateDriver = function () {
        var driver = {
            DriverID: $scope.driverid,
            DriverName: $scope.drivername,
            DriverSurname: $scope.driversurname,
            DriverEmail: $scope.driveremail,
            Password: $scope.driverpassword,
        }
        console.log(driver);
        userApi.PutDriver(driver).then(function (response) {
            $scope.driverid = $scope.driverid;
            $scope.drivername = undefined;
            $scope.driversurname = undefined;
            $scope.driveremail = undefined;
            $scope.driverpassword = $scope.driverpassword;
            driverPersist.clearCookieData(driver);
            alert("Successfully updated Information");
            window.location = "../netfloristViews/DriverLogin.html";
        })
    }
    $http({
        method: 'Get',
        url: "http://localhost:58815/api/Deliveries",
    }).then(function success(response) {
        $scope.deliveryData = response.data;
        console.log($scope.deliveryData);
        angular.forEach($scope.deliveryData, function (key, value) {
            if ($scope.driver == key.DriverID) {
                driverData.push(key);
                $scope.data = driverData;
                console.log($scope.data);
            }
        });
    },
     function error(){
         alert("Error!")
     });
     $scope.logOut = function () {
    driverPersist.clearCookieData();
    window.location = "../index.html";
}
});

LoginApp.controller("DeliveriesController", function ($scope, $http, userApi, adminPersist) {
    var administrator = adminPersist.getCookieData();
    $scope.adminname = administrator.adminname;
    getDeliveries();
    function getDeliveries() {
        userApi.GetDeliveries().then(function (response) {
            $scope.deliver = response.data;
        }), function () {
            alert("Could not get delivery data");
        }
    }

    $scope.EditDeliveryStatus = function (d) {
        var Orders = {
            OrderID: d.OrderID,
            Products: d.Products,
            ID: d.CustomerID,
            ReceiverName: d.ReceiverName,
            ReceiverSurname: d.ReceiverSurname,
            ReceiverCellNumber: d.ReceiverCellNumber,
            ReceiverEmail: d.ReceiverEmail,
            StreetAddress: d.StreetAddress,
            Suburb: d.Suburb,
            City: d.City,
            PostalCode:d.PostalCode,
            OrderStatus: d.DeliveryStatus,
            DriverID: d.DriverID,
            Quantity: d.Quantity,
            OrderDate: d.OrderDate,
            DeliveryDate: d.DeliveryDate,
            totalAmount:d.totalAmount
        }
        console.log(Orders);
        userApi.PutOrder(Orders).then(function (response) {
            $scope.deliver = response.data;
            $scope.OrderID = $scope.OrderID;
            $scope.Products = $scope.Products;
            $scope.CustomerID = $scope.CustomerID;
            $scope.ReceiverName = $scope.ReceiverName;
            $scope.ReceiverSurname = $scope.ReceiverSurname;
            $scope.ReceiverEmail = $scope.ReceiverEmail;
            $scope.StreetAddress = $scope.StreetAddress;
            $scope.Suburb = $scope.Suburb;
            $scope.City = $scope.City;
            $scope.PostalCode = $scope.PostalCode;
            $scope.DriverID = $scope.DriverID;
            $scope.Quantity = $scope.Quantity;
            $scope.OrderDate = $scope.OrderDate;
            $scope.DeliveryDate = $scope.DeliveryDate;
            $scope.DeliveryStatus = $scope.DeliveryStatus;
            $scope.totalAmount = $scope.totalAmount;
            alert("Successfully updated deliveries");
            setTimeout(window.location = "../netfloristViews/AdminDashboard.html", 4000);
        }),
        function (error) {
            alert("Could not updated delivery");
        }
    }
    $scope.logOut = function () {
        adminPersist.clearCookieData();
        window.location = "../index.html";
    }
});
LoginApp.controller("SupplierController", function ($scope, $http, userApi,supplierPersist) {
    $scope.supplierLogin = function () {
        userApi.GetSupplier($scope.SupplierEmail, $scope.SupplierPassword).then(function (response) {
            if (response.data == null) {
                badAlert();
            }
            else {
                var supplier = {
                    supplierid: response.data.SupplierID,
                    suppliername: response.data.SupplierName,
                    supplieremail: response.data.SupplierEmail,
                    supplierpassword: response.data.SupplierPassword
                }

                supplierPersist.setCookieData(supplier);
                goodAlert();
                alert("Hello" + supplier.suppliername);
                console.log(supplier);
                setTimeout(window.location = "../netfloristViews/SupplierDashboard.html", 4000);
            }
        }),
        function (response) {
            badAlert();
        }
    }
    getSuppliers();
    function getSuppliers() {
        userApi.GetSuppliers().then(function (response) {
            $scope.supplier = response.data;
        }), function () {
            badAlert();
        }
    }

});
LoginApp.controller("SupplierDetailsController", function ($scope, $http, userApi, supplierPersist) {
    var supplier = supplierPersist.getCookieData();
    $scope.suppliername = supplier.suppliername;
    $scope.supplieremail = supplier.supplieremail;
    $scope.supplierid = supplier.supplierid;
    $scope.supplierpassword = supplier.supplierpassword;
    var supplierData = [];
    $scope.supplier = supplier.supplierid;

    $http({
        method: 'Get',
        url: "http://localhost:58815/api/Products",
    }).then(function success(response) {
        $scope.productData = response.data;
        console.log($scope.productData);
        angular.forEach($scope.productData, function (key, value) {
            if ($scope.supplier == key.SupplierID) {
                supplierData.push(key);
                $scope.data = supplierData;
                console.log($scope.data);
            }
        });

    },
    function error(response) {
        alert("ERRRROOOORR!");
    });
    $scope.logOut = function () {
        supplierPersist.clearCookieData();
        window.location = "../index.html";
    }

})
//View Products with Images
LoginApp.controller("ProductImageController", function ($scope, $http, userApi, userPersist) {
    getProducts();
    function getProducts() {
        userApi.GetProductImage().then(function (response) {
            $scope.product = response.data;
            
        }), function () {
            badAlert();
        }
    }
    
   
});
LoginApp.controller("ProductsController", function ($scope, $http, userApi,adminPersist) {
    getProduct();
    function getProduct() {
        userApi.GetProducts().then(function (response) {
            $scope.product = response.data;
            var administrator = adminPersist.getCookieData();
            $scope.adminname = administrator.adminname;
        }), function () {
            badAlert();
        }
    }

    $scope.AddProducts = function () {
        var AddProd = {
            ProductID: $scope.ProductID,
            ProductName: $scope.ProductName,
            ProductDescription: $scope.ProductDescription,
            ProductCategory: $scope.ProductCategory,
            ProductPrice: $scope.ProductPrice,
            ProductQuantity: $scope.ProductQuantity,
            SupplierID: $scope.SupplierID
        };
        userApi.AddProduct(AddProd).then(function (response) {
            
            $scope.ProductID = undefined;
            $scope.ProductName = undefined;
            $scope.ProductDescription = undefined;
            $scope.ProductCategory = undefined;
            $scope.ProductPrice = undefined;
            $scope.ProductQuantity = undefined;
            $scope.SupplierID = undefined;
            alert("Successfully added product");
            location.reload();
        }),
        function (response) {
            badAlert();

        };
    };
    $scope.DeleteProducts = function (prod) {
        userApi.DeleteProduct(prod.ProductID).then(),
        function () {
            alert("Deleted Successfully");
            location.reload();
            removeProductByID(prod.ProductID);
        };
    };
    var removeProductByID = function (ProductID) {
        for(var i = 0; i< $scope.ProductID.length; i++) {
            if($scope.prod[i].ProductID == ProductID){
                $scope.prod.splice(i,1);
            }
            break;
        }
    }
    $scope.EditProducts = function () {
        var product = {
            ProductID: $scope.ProductID,
            ProductName: $scope.ProductName,
            ProductDescription: $scope.ProductDescription,
            ProductCategory: $scope.ProductCategory,
            ProductPrice: $scope.ProductPrice,
            ProductQuantity: $scope.ProductQuantity,
            SupplierID: $scope.SupplierID
        }
        userApi.PutProduct(product).then(function (response) {
            $scope.ProductID = undefined;
            $scope.ProductName = undefined;
            $scope.ProductDescription = undefined;
            $scope.ProductCategory = undefined;
            $scope.ProductPrice = undefined;
            $scope.ProductQuantity = undefined;
            $scope.SupplierID = undefined;
            alert("Successfully updated product");
            window.location = "../netfloristViews/AdminDashboard.html";
        })
    }
    $scope.logOut = function () {
        adminPersist.clearCookieData();
        window.location = "../Index.html";
    }
});
LoginApp.controller("ShoppingBasketController", function ($scope, $cookies, $http, $rootScope, userApi, customerPersist) {
    //getting products from the service
    getProducts();
    function getProducts() {
        userApi.GetProductImage().then(function (response) {
            $scope.Product = response.data;
            var customer = customerPersist.getCookieData();
            $scope.customername = customer.customername;
            
        }), function () {
            badAlert();
        }
    }
    

    $scope.products = getProducts();
    var cart = $scope.cart = [];
    $scope.total = 0;
    $scope.Quantity = 0;

    $scope.AddToCart = function (Picture,ProductName,ProductPrice) {

        if ($scope.cart.length === 0)
        {
            $scope.Quantity = 1;
            $scope.cart.push({Picture:Picture,ProductName: ProductName,ProductPrice: ProductPrice, Quantity: $scope.Quantity});
        }
        else
        {
            var repeat = false;
            for (var i = 0; i < $scope.cart.length; i++) {
                if ($scope.cart[i].ProductName == ProductName) {
                    repeat = true;
                    $scope.cart[i].Quantity++;
                }
            }
            if (!repeat) {
                $scope.Quantity = 1;
                $scope.cart.push({ Picture: Picture, ProductName: ProductName, ProductPrice: ProductPrice, Quantity: $scope.Quantity});
            }
        }
        $scope.total += ProductPrice;
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('total', JSON.stringify($scope.total));
    }
   
    $scope.logOut = function () {
        customerPersist.clearCookieData();
        location.reload();
    }

});

LoginApp.controller("BasketController", function ($scope, customerPersist, userApi,$rootScope) {
    $scope.items = JSON.parse(localStorage.getItem('cart'));
    $scope.total = JSON.parse(localStorage.getItem('total'));
    var customer = customerPersist.getCookieData();
    $scope.orderId = 0;
    $scope.orderDate = "";
    $scope.itemOrder = JSON.parse(localStorage.getItem('orderId'));
    $scope.orderDate = JSON.parse(localStorage.getItem('orderDate'));
    console.log(JSON.stringify($scope.itemOrder));
    $scope.removeItems = function (ProductName, ProductPrice) {

        $scope.items = JSON.parse(localStorage.getItem('cart'));
        $scope.total = JSON.parse(localStorage.getItem('total'));
        $scope.total = JSON.parse(localStorage.getItem('total'));
        for (var i = 0; i < $scope.items.length; i++) {

            if ($scope.items[i].Quantity > 1) {
                $scope.items[i].Quantity-= 1;
                localStorage.setItem('cart',JSON.stringify($scope.items))
            }
            else if ($scope.items[i].ProductName == ProductName) {
                $scope.items.splice(i,1);
                localStorage.setItem('cart', JSON.stringify($scope.items));
            }
        }
        $scope.total -= ProductPrice;
        localStorage.setItem('total', JSON.stringify($scope.total));
        
    }

    $scope.placeAnOrder = function () {
        $scope.totalAmount = $scope.total;
        $scope.ID = customer.customerid;
        $scope.ReceiverName = $scope.ReceiverName;
        $scope.ReceiverSurname = $scope.ReceiverSurname;
        $scope.ReceiverEmail = $scope.ReceiverEmail;
        $scope.ReceiverCellNumber = $scope.ReceiverCellNumber;
        $scope.StreetAddress = $scope.StreetAddress;
        $scope.Suburb = $scope.Suburb;
        $scope.City = $scope.City;
        $scope.PostalCode = $scope.PostalCode;
        $scope.DeliveryDate = $scope.DeliveryDate;
        $scope.OrderStatus = $scope.OrderStatus;
        var OrderDetails = {
            totalAmount: $scope.total,
            ID: $scope.ID,
            ReceiverName: $scope.ReceiverName,
            ReceiverSurname: $scope.ReceiverSurname,
            ReceiverEmail: $scope.ReceiverEmail,
            ReceiverCellNumber: $scope.ReceiverCellNumber,
            StreetAddress: $scope.StreetAddress,
            Suburb: $scope.Suburb,
            City: $scope.City,
            PostalCode: $scope.PostalCode,
            DeliveryDate: $scope.DeliveryDate,
            OrderStatus: "Pending",
        };
        userApi.AddOrders(OrderDetails).then(function (response) {
            $scope.Order = response.data;
            $scope.totalAmount = undefined;
            $scope.ID = undefined;
            $scope.ReceiverName = undefined;
            $scope.ReceiverSurname = undefined;
            $scope.ReceiverEmail = undefined;
            $scope.ReceiverCellNumber = undefined;
            $scope.StreetAddress = undefined;
            $scope.Suburb = undefined;
            $scope.City = undefined;
            $scope.PostalCode = undefined;
            $scope.DeliveryDate = undefined;
            $scope.OrderStatus = "pending";
            window.location = '../netfloristViews/Payment.html';
            $scope.SaveOrders();
            alert("Successful");
        }),
        function (response) {
            alert("Failed to Add Orders");
        }

    }

    $scope.SaveOrders = function (ProductName) {

        for (var k = 0; k <= $scope.items.length; k++) {

            $scope.Products = $scope.items[k].ProductName;
            $scope.Quantity = $scope.items[k].Quantity;
            var itemsOrdered = {
                'OrderID': $scope.Order.OrderID,
                'ProductID':$scope.ProductID,
                'Products': $scope.Products,
                'Quantity': $scope.Quantity
            }
            $scope.orderId = $scope.Order.OrderID;
            $scope.orderDate = $scope.Order.OrderDate;
            console.log(itemsOrdered);
            userApi.AddProductOrder(itemsOrdered).then(function (response) {
                $scope.Order.OrderID = undefined;
                $scope.ProductID = undefined;
                $scope.Products = undefined;
                $scope.Quantity = undefined;
                
                localStorage.setItem('orderId', JSON.stringify($scope.orderId));
                localStorage.setItem('orderDate', JSON.stringify($scope.orderDate));
                alert("Successful");
                console.log(response);
            }),
             function (response) {
                 alert("Failed To Add");
             }
        }
    };
});
LoginApp.controller("ImageController", function ($location,$scope, $http, userApi, fileUpload) {
    $scope.uploadFile = function () {
        var file = $scope.myFile;
        console.log('file is ');
        console.dir(file);
        var uploadUrl = 'http://localhost:58815/api/Images';
        alert("Successfully Added Image");
        location.reload();
        fileUpload.uploadFileToUrl(file, uploadUrl);
    };
    getImage();
    function getImage () {
        userApi.GetImages().then(function (response) {
            $scope.image = response.data;
        }), function () {
            alert('Failed to display Image');
        }
    }


    $scope.removeImage = function (img) {
        userApi.DeleteImage(img.ImageID)
        .then(function () {
            alert("successfully removed image");
            window.location = "../netfloristViews/AdminDashboard.html"; 
            removeImageByID(img.ImageID);
        });
    };
    var removeImageByID = function (ImageID) {
        for (var i = 0; i < $scope.ImageID.length; i++) {
            if ($scope.img[i].ImageID == ImageID) {
                $scope.img.splice(i, 1);
                break;
            }
        };
    };
});
LoginApp.controller("PaymentController", function ($scope, $rootScope, userApi, customerPersist, $http) {
    var customer = customerPersist.getCookieData();
    $scope.items = JSON.parse(localStorage.getItem('cart'));
    $scope.total = JSON.parse(localStorage.getItem('total'));
    $scope.itemOrder = JSON.parse(JSON.stringify(localStorage.getItem('orderId')));
    $scope.orderDate = JSON.parse(localStorage.getItem('orderDate'));
    $scope.ID = customer.customerid;
    $scope.paymentId = 0;
    $scope.customername = customer.customername;
    //$scope.OrderID = $rootScope.order.OrderID;
    $scope.AddPay = function () {
        var PaymentDetails = {
            BankName: $scope.BankName,
            CardholderName: $scope.CardholderName,
            CardNumber: $scope.CardNumber,
            ExpiryMonth: $scope.ExpiryMonth,
            ExpiryYear: $scope.ExpiryYear,
            CVV: $scope.CVV,
            Email: $scope.Email,
            Address: $scope.Address,
            City: $scope.City,
            PostalCode: $scope.PostalCode,
            //OrderID: $scope.OrderID,
            ID: $scope.ID

        }
        console.log(PaymentDetails);
        userApi.AddPayments(PaymentDetails).then(function (response) {
            $scope.orders = response.data;
            $scope.BankName = undefined;
            $scope.CardholderName = undefined;
            $scope.CardNumber = undefined;
            $scope.ExpiryMonth = undefined;
            $scope.ExpiryYear = undefined;
            $scope.CVV = undefined;
            $scope.Email = undefined;
            $scope.Address = undefined;
            $scope.City = undefined;
            $scope.PostalCode = undefined;
            $scope.ID;
            //$scope.OrderID;
            alert("Order Successfully placed");
            window.location = "../netfloristViews/Receipt.html";
        }),
        function (response) {
            alert("failed to make payment");

        }

    }
});

LoginApp.directive('ngFiles', ['$parse', function ($parse) {
    return {
        link: function (scope, element, attrs) {
            var Change = $parse(attrs.ngFiles);
            var modelSetter = Change.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

LoginApp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function (file, uploadUrl) {
        var formdata = new FormData();
        formdata.append('file', file);
        $http.post(uploadUrl, formdata, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }),
         function (success) {
        }
        ,(function (success) {
            alert("error");
        });
    }
}]);

LoginApp.factory('customerPersist', ['$cookies', function ($cookies) {
    var customer = "";
    return {
        setCookieData: function (customerName) {
            $cookies.putObject("customer", customerName, { 'path': "/" });
        },
        getCookieData: function () {
            customer = $cookies.getObject("customer");
            return customer;
        },
        clearCookieData: function () {
            customerName = $cookies.remove("customer",{ 'path': "/" });
        }
    }
}]);
LoginApp.factory('driverPersist', ['$cookies', function ($cookies) {
    var driver = "";
    return {
        setCookieData: function (driverName) {
            $cookies.putObject("driver", driverName, { 'path': "/" });
        },
        getCookieData: function () {
            driver = $cookies.getObject("driver");
            return driver;
        },
        clearCookieData: function () {
            driverName = $cookies.remove("driver", { 'path': "/" });
        }
    }
}]);
LoginApp.factory('adminPersist', ['$cookies', function ($cookies) {
    var administrator = "";
    return {
        setCookieData: function (administratorName) {
            $cookies.putObject("administrator", administratorName, { 'path': "/" });
        },
        getCookieData: function () {
            administrator = $cookies.getObject("administrator");
            return administrator;
        },
        clearCookieData: function () {
            administratorName = $cookies.remove("administrator", { 'path': "/" });
        }
    }
}]);
LoginApp.factory('supplierPersist', ['$cookies', function ($cookies) {
    var supplier = "";
    return {
        setCookieData: function (supplierName) {
            $cookies.putObject("supplier", supplierName, { 'path': "/" });
        },
        getCookieData: function () {
            supplier = $cookies.getObject("supplier");
            return supplier;
        },
        clearCookieData: function () {
            supplierName = $cookies.remove("supplier", { 'path': "/" });
        }
    }
}]);
//Bootstrap JS Alerts
function goodAlert() {
    var alert = document.getElementById("goodalert");
    alert.style.display = "block";
} 

function badAlert() {
    var alert = document.getElementById("badalert");
    alert.style.display = "block";
}