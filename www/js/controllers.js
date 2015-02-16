angular.module('starter.controllers', [])

// Status : INC
.controller('AppCtrl', function($window, $rootScope, $scope) {
    // $scope.subjects = [];

    // $scope.$on('$ionicView.afterEnter', function() {
    //     // getAllSubjects();
    // });

    $scope.logout = function() {
        $rootScope.isLoggedIn = false;
        $window.location = "#/login";
    }

})

.controller('HomeCtrl', function($timeout, $scope, $window, Products) {
    console.log("HomeCtrl invoked");
    $scope.products = [];



    var getAllProducts = function() {
        console.log("getAllProducts invoked");
        Products.getFirst(100).then(function(products) {
            $scope.products = products;
            console.log("getAllProducts invoked: " + products.length);
            $scope.$broadcast('scroll.refreshComplete');
        });
    }

    $scope.doRefresh = function() {
        getAllProducts();
    }

    // getAllProducts();

    // if ($scope.products.length == 0) {
    //     $timeout(function() {
    //         getAllProducts();

    //         console.log("$timeout invoked");
    //     }, 1000);
    // };

    $timeout(function() {
        getAllProducts();

        console.log("$timeout invoked");
    }, 100);


    // $scope.$on('$ionicView.afterEnter', function() {
    //     getAllProducts();
    //     console.log("getAllProducts invoked");
    // });

    $scope.viewProduct = function(p) {
        $window.location = "#/app/product-detail/" + p.id;

    }
})


// Status : On test
.controller("ProductsCtrl", function($scope, Products, $window) {
    $scope.products = [];

    var getAllProducts = function() {
        Products.getFirst(100).then(function(products) {
            $scope.products = products;
        });
    }
    getAllProducts();

    // $scope.$on('$ionicView.afterEnter', function() {
    //     getAllProducts();
    //     console.log($scope.products);
    // });
    $scope.viewProduct = function(p) {
        $window.location = "#/app/product-detail/" + p.id;

    }

    $scope.editProduct = function(p) {
        $window.location = "#/app/update-product/" + p.id;

    }


})

.controller("ProductCtrl", function($scope, $cordovaCamera, DB, Data, $window, action, $stateParams, Products) {
    var productId = $stateParams.productId;
    $scope.newProduct = {};
    $scope.temp = {};
    $scope.temp.category = {};
    $scope.temp.brand = {};
    $scope.brands = Data.getAllBrands();
    $scope.categories = Data.getAllCategories();


    if (action === 'new') {

        $scope.isFeatured = {
            text: "Featured",
            checked: true
        };
    };

    if (action === 'update') {
        Products.getById(productId).then(function(p) {
            console.log(p[0]);
            $scope.newProduct = p[0];

            $scope.isFeatured = {
                text: "Featured",
                checked: Boolean($scope.newProduct.featured)
            };

            var image = document.getElementById('myImage');
            image.src = $scope.newProduct.image;

            $scope.temp.category.categoryName = $scope.newProduct.category;
            $scope.temp.brand.brandName = $scope.newProduct.brand;
        })

    };





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

        if (action === 'new') {
            var time = moment();
            var timeStamp = new Date(time).getTime();
            $scope.newProduct.id = timeStamp;
            $scope.newProduct.featured = Number($scope.isFeatured.checked)
            $scope.newProduct.brand = $scope.temp.brand.brandName;
            $scope.newProduct.category = $scope.temp.category.categoryName;
            DB.insertAll('products', [$scope.newProduct]);
            $window.location = "#/app/products";
        };

        if (action === 'update') {
            // Delete current product
            Products.deleteById(productId).then(function(result) {
                console.log(result);
                $scope.newProduct.featured = Number($scope.isFeatured.checked)
                $scope.newProduct.brand = $scope.temp.brand.brandName;
                $scope.newProduct.category = $scope.temp.category.categoryName;
                DB.insertAll('products', [$scope.newProduct]);
                $window.location = "#/app/products";
                // console.log($scope.newProduct);
                console.log($scope.newProduct);
            });



            // Insert existing product
            // $scope.newProduct.id = productId;


        };





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

.controller('SearchCtrl', function($scope, Products, $window, $stateParams) {
    $scope.searchKey = $stateParams.searchKey;

    $scope.products = [];

    var getAllProducts = function() {
        Products.getFirst(100).then(function(products) {
            $scope.products = products;
        });
    }
    getAllProducts();

    $scope.viewProduct = function(p) {
        $window.location = "#/app/product-detail/" + p.id;

    }

    $scope.editProduct = function(p) {
        $window.location = "#/app/update-product/" + p.id;

    }
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

.controller('LoginCtrl', function($scope, $timeout, $rootScope, $state, $window, $ionicViewService) {


    // $scope.auth = Auth;
    // // $scope.user = [];

    // $scope.login = function(provider) {
    //     // 1. Check if $authWithOAuthPopup is available
    //     $scope.auth.$authWithOAuthPopup(provider, function(error, authData) {

    //         if (error) {
    //             // 2. If $authWithOAuthPopup is not available   
    //             if (error.code === "TRANSPORT_UNAVAILABLE") {
    //                 // fall-back to browser redirects, and pick up the session
    //                 // automatically when we come back to the origin page
    //                 $scope.auth.$authWithOAuthRedirect(provider, function(error, authData) { /* ... */ });
    //             }
    //         }

    //     });
    // };

    $scope.login = function(user) {

        if (user.username === 'admin' && user.password === 'admin') {
            $rootScope.isLoggedIn = true;
            $ionicViewService.nextViewOptions({
                disableBack: true
            });

            $window.location = "#/app/home";

            console.log("logged in");
        };
    }

    $scope.skip = function() {
        $ionicViewService.nextViewOptions({
            disableBack: true
        });
        $window.location = "#/app/home";
    }

    // // On auth listener
    // $scope.auth.$onAuth(function() {
    //     $timeout(function() {
    //         $rootScope.user = $scope.auth.$getAuth();
    //         if ($rootScope.user) {
    //             $state.go('app.home');
    //         };

    //     });
    // });

});
