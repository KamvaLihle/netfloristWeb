var loginService = angular.module('loginService', []);

loginService.factory('userApi', function ($http) {
    var url = "http://localhost:58815/api/"
    var userApi = {};

    userApi.GetAdmin = function (Email, Password) {
        return $http.get(url + 'Administrators?Email=' + Email + '&Password=' + Password)
    }
    userApi.GetUser = function (ID, Password) {
        return $http.get(url + 'Customers?ID=' + ID + '&Password=' + Password);
    }
    userApi.GetCustomers = function () {
        return $http.get(url + 'Customers/')
    }
    userApi.PutCustomer = function (customer) {
        var updateData = $http({
            method: 'PUT',
            url: url + 'Customers/' + customer.ID,
            data: customer
        });
        return updateData;
    }
    userApi.GetDriver = function (DriverEmail, Password) {
        return $http.get(url + 'Drivers?DriverEmail=' + DriverEmail + '&Password=' + Password);
    }
    userApi.GetDrivers = function () {
        return $http.get(url + 'Drivers/');
    }
    userApi.PutDriver = function (driver) {
        var updateData = $http({
            method: 'PUT',
            url: url + 'Drivers/' + driver.DriverID,
            data: driver
        });
        return updateData;
    }
    userApi.GetSupplier = function (SupplierEmail, SupplierPassword) {
        return $http.get(url + 'Suppliers?SupplierEmail=' + SupplierEmail + '&SupplierPassword=' + SupplierPassword);
    }
    userApi.GetSuppliers = function () {
        return $http.get(url + "Suppliers/");
    }
    userApi.GetProducts = function () {
        return $http.get(url + 'Products/');
    }
    userApi.PutProduct = function (product) {
        var updateData = $http({
            method: 'PUT',
            url: url + 'Products/' + product.ProductID,
            data: product
        });
        return updateData;
    }
    userApi.GetProductImage = function () {
        return $http.get(url + 'GetProductImage');
    }
    userApi.AddProduct = function (product) {
        return $http.post(url + 'Products/',product)
    }
    userApi.DeleteProduct = function (ProductID) {
        return $http.delete(url + "Products/" + ProductID);
    }
    userApi.UpdateProduct = function (prod) {
        return $http.put(url + "Products/" + prod.ProductID, prod);
    }
    userApi.GetImages = function () {
        return $http.get(url + 'Images/')
    }
    userApi.DeleteImage = function (ImageID) { 
        return $http.delete(url + 'Images/' + ImageID);
    }
    userApi.AddOrders = function (Order) {
        return $http.post(url + 'Orders/', Order);
    }
    userApi.GetOrders = function () {
        return $http.get(url + "Orders/");
    }
    userApi.UpdateOrder = function (order) {
        return $http.put(url + 'Orders/' + order.OrderID, order);
    }
    userApi.PutOrder = function(Orders){
        return $http.put(url + 'Orders/' + Orders.OrderID, Orders);
    }
    userApi.AddProductOrder = function (Order) {
        return $http.post(url + 'ProductOrders/', Order);
    }
    userApi.AddPayments = function (pay) {
        return $http.post(url + 'Payments/', pay);
    }
    userApi.GetDeliveries = function () {
        return $http.get(url + 'Deliveries/')
    }
    userApi.PutDeliveries = function (delivery) {
        return $http.put(url + 'Deliveries/' + delivery.CustomerID,delivery);
    }
    return userApi;
});

