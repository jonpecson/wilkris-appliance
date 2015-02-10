angular.module('starter.controllers', [])

// Status : INC
.controller('AppCtrl', function($scope, $timeout, $rootScope, $state, $timeout, DB, $window) {
    // $scope.subjects = [];

    $scope.$on('$ionicView.afterEnter', function() {
        // getAllSubjects();
    });
})


// Status : On test
.controller("ProductsCtrl", function($scope, Products, $window) {
    $scope.products = [];
    console.log("Hey");

    var getAllProducts = function() {
        console.log("Hey");
        Products.getFirst(100).then(function(products) {
            $scope.products = products;
            console.log($scope.products);

        });
    }
    getAllProducts();

    $scope.$on('$ionicView.afterEnter', function() {
        getAllProducts();
        console.log($scope.products);
    });
    $scope.viewProduct = function(p) {
        console.log("Product detail");
        $window.location = "#/app/product-detail/" + p.id;

    }

})

.controller("ProductCtrl", function($scope, $cordovaCamera, DB, Data, $window, action) {
    console.log(action);
    $scope.newProduct = {};
    $scope.temp = {};
    $scope.isFeatured = {
        text: "Featured",
        checked: true
    };


    $scope.brands = Data.getAllBrands();
    $scope.categories = Data.getAllCategories();




    $scope.takePicture = function() {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            // find the element with id myImage 
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;

            $scope.newProduct.image = "data:image/jpeg;base64," + imageData;
            console.log($scope.face);

        }, function(err) {
            // An error occured. Show a message to the user
        });
    }


    $scope.saveProduct = function() {

        var time = moment();
        var timeStamp = new Date(time).getTime();
        $scope.newProduct.id = timeStamp;
        $scope.newProduct.featured = Number($scope.isFeatured.checked)
        $scope.newProduct.brand = $scope.temp.brand.brandName;
        $scope.newProduct.category = $scope.temp.category.categoryName;
        console.log(Number($scope.isFeatured.checked));
        DB.insertAll('products', [$scope.newProduct]);
        $window.location = "#/app/products";


    }

})

.controller("ProductDetailCtrl", function($scope, $stateParams, Products) {
    var id = $stateParams.productId;

    Products.getById(id).then(function(product) {
        $scope.product = product[0];
        // get the image reference
        var image = document.getElementById('myImage');
        // assign product image
        image.src = $scope.product.image;
    });
})

.controller('SearchCtrl', function($scope) {
    $scope.products = [];
})


.controller("FeedbackCtrl", function($scope) {
    $scope.submit = function() {
        $scope.feedback = {};

    }
})

.controller("AboutCtrl", function($scope, $ionicSlideBoxDelegate) {
    // $scope.navSlide = function(index) {
    //     $ionicSlideBoxDelegate.slide(index, 500);
    // }

})

.controller('LoginCtrl', function($scope, Auth, $timeout, $rootScope, $state) {


    $scope.auth = Auth;
    // $scope.user = [];

    $scope.login = function(provider) {
        // 1. Check if $authWithOAuthPopup is available
        $scope.auth.$authWithOAuthPopup(provider, function(error, authData) {

            if (error) {
                // 2. If $authWithOAuthPopup is not available   
                if (error.code === "TRANSPORT_UNAVAILABLE") {
                    // fall-back to browser redirects, and pick up the session
                    // automatically when we come back to the origin page
                    $scope.auth.$authWithOAuthRedirect(provider, function(error, authData) { /* ... */ });
                }
            }

        });
    };

    // On auth listener
    $scope.auth.$onAuth(function() {
        $timeout(function() {
            $rootScope.user = $scope.auth.$getAuth();
            if ($rootScope.user) {
                $state.go('app.home');
            };

        });
    });

});
