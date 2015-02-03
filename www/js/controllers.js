angular.module('starter.controllers', [])

// Status : INC
.controller('AppCtrl', function($scope, $timeout, $rootScope, $state, Subjects, $timeout, DB, $window) {
    // $scope.subjects = [];

    $scope.$on('$ionicView.afterEnter', function() {
        getAllSubjects();
    });

    // Chart.js Data
    $scope.data = [{
        value: 300,
        color: '#00C853',
        highlight: '#01E472',
        label: 'Present'
    }, {
        value: 50,
        color: '#F44336',
        highlight: '#EF9A9A',
        label: 'Absent'
    }, {
        value: 100,
        color: '#FBC02D',
        highlight: '#FFEE58',
        label: 'Late'
    }];

    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,

        //String - The colour of each segment stroke
        segmentStrokeColor: '#fff',

        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 0, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps: 100,

        //String - Animation easing effect
        animationEasing: 'easeOutBounce',

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: false,

        //String - A legend template
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

    };




    var getAllSubjects = function() {
        Subjects.getFirst(100).then(function(subjects) {
            $scope.subjects = subjects;
        });
    }
    getAllSubjects();




    $scope.checkAttendance = function(subject) {
        console.log(subject);
        $window.location = '#/app/check-attendance/' + subject.id;

    }
})




// Status : On test
.controller("ProductsCtrl", function($scope) {
  $scope.products = [];
})


.controller('CategoryCtrl', function($scope) {
    $scope.categories = [];
})

.controller('BrandsCtrl', function($scope) {
    $scope.brands = [];

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
