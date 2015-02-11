// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'tc.chartjs'])

.run(function($ionicPlatform, DB) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                // StatusBar.styleDefault();
                StatusBar.hide();
            }

            // Initialize database
            DB.init();
        });
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/menu.html",
            controller: 'AppCtrl'
        })

        .state('app.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/home.html"
                }
            }
        })

        .state('app.products', {
            url: "/products",
            views: {
                'menuContent': {
                    templateUrl: "templates/products.html",
                    controller: 'ProductsCtrl'
                }
            }
        })

        .state('app.new-product', {
            url: "/new-product",
            views: {
                'menuContent': {
                    templateUrl: "templates/product.html",
                    controller: 'ProductCtrl',
                    resolve: {
                        action: function() {
                            return 'new';
                        }
                    }
                }
            }
        })

        .state('app.update-product', {
            url: "/update-product/:productId",
            views: {
                'menuContent': {
                    templateUrl: "templates/product.html",
                    controller: 'ProductCtrl',
                    resolve: {
                        action: function() {
                            return 'update';
                        }
                    }
                }
            }
        })

        .state('app.product-detail', {
            url: "/product-detail/:productId",
            views: {
                'menuContent': {
                    templateUrl: "templates/product-detail.html",
                    controller: 'ProductDetailCtrl'
                }
            }
        })



        .state('app.search', {
            url: "/search/:searchKey",
            views: {
                'menuContent': {
                    templateUrl: "templates/search.html",
                    controller: 'SearchCtrl'
                }
            }
        })

        // .state('app.search-by-category', {
        //     url: "/search-by-category/:searchKey",
        //     views: {
        //         'menuContent': {
        //             templateUrl: "templates/search.html",
        //             controller: 'SearchCtrl',
        //              resolve: {
        //                 searchBy: function() {
        //                     return 'category';
        //                 }
        //             }
        //         }
        //     }
        // })

        // .state('app.search-by-brand', {
        //     url: "/search-by-brand/:searchKey",
        //     views: {
        //         'menuContent': {
        //             templateUrl: "templates/search.html",
        //             controller: 'SearchCtrl',
        //              resolve: {
        //                 searchBy: function() {
        //                     return 'brand';
        //                 }
        //             }
        //         }
        //     }
        // })

        .state('app.feedback', {
            url: "/feedback",
            views: {
                'menuContent': {
                    templateUrl: "templates/feedback.html",
                    controller: 'FeedbackCtrl'
                }
            }
        })

        .state('app.about', {
            url: "/about",
            views: {
                'menuContent': {
                    templateUrl: "templates/about.html",
                    controller: 'AboutCtrl'
                }
            }
        })

        .state('login', {
            url: "/login",
            templateUrl: "templates/login.html",
            controller: 'LoginCtrl'
        });

        // if none of the above states are matched, use this as the fallback
        // $urlRouterProvider.otherwise('/app/home');
        $urlRouterProvider.otherwise('/app/home');
    })
    .filter('fromNow', ['$window', function($window) {
        return function(dateString) {
            return $window.moment(new Date(dateString)).fromNow()
        };
    }])
    .filter('time', function($filter) {
        return function(input) {
            if (input == null) {
                return "";
            }

            var _date = $filter('date')(new Date(input), 'HH:mm a');

            return _date.toUpperCase();
        };
    })
    .constant('DB_CONFIG', {
        name: 'WilkrisDb.beta.1.0.7',
        tables: {
            products: {
                id: 'integer primary key',
                featured: 'text',
                model: 'text',
                brand: 'text',
                category: 'text',
                desc: 'text',
                cod: 'real',
                down: 'real',
                three: 'real',
                five: 'real',
                eleven: 'real',
                fourteen: 'real',
                seventeen: 'real',
                twenty: 'real',
                twentyfour: 'real',
                lcp: 'real',
                image: 'blob'
            }
        }
    });
