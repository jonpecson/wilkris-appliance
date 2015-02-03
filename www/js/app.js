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
            StatusBar.styleDefault();
            // StatusBar.hide();
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

    .state('app.check-attendance', {
        url: "/check-attendance/:stateParams",
        views: {
            'menuContent': {
                templateUrl: "templates/check-attendance.html",
                controller: 'CheckAttendanceCtrl'
            }
        }
    })

    .state('app.browse', {
        url: "/browse",
        views: {
            'menuContent': {
                templateUrl: "templates/browse.html"
            }
        }
    })

    .state('app.students', {
        url: "/students",
        views: {
            'menuContent': {
                templateUrl: "templates/students.html",
                controller: 'StudentsCtrl'
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

    .state('app.subject-detail', {
        url: "/subject-detail/:stateParams",
        views: {
            'menuContent': {
                templateUrl: "templates/subject-detail.html",
                controller: 'SubjectDetailCtrl'
            }
        }
    })

    .state('app.subject-info', {
        url: "/subject-info/:stateParams",
        views: {
            'menuContent': {
                templateUrl: "templates/subject-info.html",
                controller: 'SubjectInfoCtrl'
            }
        }
    })

    .state('app.student-detail', {
        url: "/student-detail/:stateParams",
        views: {
            'menuContent': {
                templateUrl: "templates/student-detail.html",
                controller: 'StudentDetailCtrl'
            }
        }
    })

    .state('app.student-info', {
        url: "/student-info/:stateParams",
        views: {
            'menuContent': {
                templateUrl: "templates/student-info.html",
                controller: 'StudentInfoCtrl'
            }
        }
    })

    .state('app.attendance-info', {
        url: "/attendance-info/:stateParams",
        views: {
            'menuContent': {
                templateUrl: "templates/attendance-info.html",
                controller: 'AttendanceInfoCtrl'
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

.filter('time',function($filter){
    return function(input) {
        if(input==null) {return "";}

        var _date = $filter('date')(new Date(input), 'HH:mm a');

        return _date.toUpperCase();
    };
})

.constant('DB_CONFIG', {
    name: 'AttendanceTrackerDbv1.0.1.beta.1.27',
    tables: {
        subjects: {
            id: 'integer primary key',
            subjectName: 'text',
            desc: 'text',
            days: 'text',
            location: 'text',
            categoryName:  'text',
            icon: 'text',
            fromTime: 'text',
            toTime: 'text',
            studentIds : 'text'
        },
        students: {
            id: 'integer primary key',
            firstName: 'text',
            lastName: 'text',
            gender: 'text',
            course: 'text',
            yearLevelSection:  'text',
            face: 'blob'
        },
        attendance: {
            id: 'integer primary key',
            subjectId: 'integer',
            studentId: 'integer',
            status: 'text',
            dateTime:  'text'
        }
    }
});
