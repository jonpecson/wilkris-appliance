angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $timeout, $rootScope, $state, Subjects, $timeout, DB){

    // $scope.auth = Auth;

    // $scope.isShow = false;
    // $scope.toggleSearch = function() {
    //     $scope.isShow = true;
    // }

    // $scope.login = function() {
    //     $state.go('login');
    // }

    // $scope.logout = function() {
    //     $scope.auth.$unauth();
    //     $rootScope.user = $scope.auth.$getAuth();
    // };


    $scope.subjects = [];

    $scope.$on('$ionicView.afterEnter', function() {
        $timeout(function() {
            Subjects.getFirst(100).then(function(subjects) {
                $scope.subjects = subjects;
            });
        }, 1);
    });
})

.controller("SubjectsCtrl", function($scope, Subjects, $timeout, DB) {
    $scope.subjects = [];

    $scope.$on('$ionicView.afterEnter', function() {
        $timeout(function() {
            Subjects.getFirst(100).then(function(subjects) {
                $scope.subjects = subjects;
            });
        }, 1);
    });
})

.controller("SubjectDetailCtrl", function($scope, $cordovaDatePicker, $filter, $ionicModal, DB, Data, Subjects, $filter, $timeout, $ionicPopup, $stateParams, $state) {

    var paramSTR = $stateParams.stateParams;
    var stateParamsArray = paramSTR.split('-');
    $scope.id = stateParamsArray[0];
    $scope.action = stateParamsArray[1];

    console.log($scope.id + " - " + $scope.action);

    $scope.days = Data.getAllDays();
    $scope.categories = Data.getAllCategories();


    $ionicModal.fromTemplateUrl('pick-days-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.pickDaysModal = modal;
    });

    $scope.initialize = function() {
        $scope.newSubject = {};
        $scope.newSubject.selectedDays = [];
        $scope.newSubject.timeFrom = new Date(2015, 0, 1, 7, 30, 0);
        $scope.newSubject.timeTo = new Date(2015, 0, 1, 9, 00, 0);
    }

    

    if ($scope.id == 0 && $scope.action == "create") {
        $scope.$on('$ionicView.afterEnter', function() {
            $timeout(function() {
                $scope.initialize();
            });
        }, 1);
    } else if ($scope.action == "update") {

        Subjects.getById($scope.id).then(function(subject) {

            $scope.subject = subject;
            $scope.newSubject = $scope.subject[0];
            $scope.newSubject.category = $scope.subject[0];
            $scope.newSubject.timeFrom = new Date($scope.subject[0].fromTime);
            $scope.newSubject.timeTo = new Date($scope.subject[0].toTime);
                    // $scope.newSubject.selectedDays = [];

            $scope.newSubject.selectedDays = $scope.subject[0].days.split(',');
            $scope.newSubject.sDays = $scope.newSubject.selectedDays.join(',');


        });

        // $scope.newSubject = subject

    };

    
    // $scope.daysFromDB = "Mon,Tue,Wed".split(",");
    $scope.showPickDays = function() {
        $scope.pickDaysModal.show();
    }

    $scope.hidePickDays = function() {
        $scope.pickDaysModal.hide();
        $scope.newSubject.sDays = $scope.newSubject.selectedDays.join(',');
    }

    $scope.updateDay = function(day) {
        $scope.newSubject.selectedDays = [];
        for (var i = 0; i <= $scope.days.length-1; i++) {
             if ($scope.days[i].isChecked) {
                $scope.newSubject.selectedDays.push($scope.days[i].day);
             }
        };
    }
    

    $scope.addSubject = function() {
        var time = moment();
        var timeStamp = new Date(time).getTime();

        if ($scope.newSubject.subjectName && $scope.newSubject.sDays &&
            $scope.newSubject.timeFrom && $scope.newSubject.timeTo &&
            $scope.newSubject.category.categoryName && $scope.newSubject.location) {

            DB.insertAll('subjects', [{
                    "id": timeStamp,
                    "subjectName": $scope.newSubject.subjectName,
                    "desc": $scope.newSubject.desc,
                    "days": $scope.newSubject.sDays,
                    "location": $scope.newSubject.location,
                    "icon": $scope.newSubject.category.icon,
                    "fromTime": $scope.newSubject.timeFrom,
                    "toTime": $scope.newSubject.timeTo
                }])
                // Show alert
            $scope.showAlert("added.");
        };
    }

    $scope.saveSubject = function() {

        if ($scope.newSubject.subjectName && $scope.newSubject.sDays &&
            $scope.newSubject.timeFrom && $scope.newSubject.timeTo &&
            $scope.newSubject.category.categoryName && $scope.newSubject.location) {

            Subjects.update($scope.id, $scope.newSubject).then(function(result) {
                console.log(result);
            });
            // Show alert
            $scope.showAlert("saved.");

            
        };
    }

    // An alert dialog
    $scope.showAlert = function(message) {
        var alertPopup = $ionicPopup.alert({
            title: 'Subject successfully ' + message
        });
        alertPopup.then(function(res) {
            // Cleanup form
            $scope.initialize()
            $state.go('app.subjects')
        });
    };


})

.controller("SubjectInfoCtrl", function($scope, $stateParams, Subjects) {
    $scope.id = $stateParams.stateParams;




    Subjects.getById($scope.id).then(function(subject) {
            console.log(subject);

            $scope.subjectInfo = subject;
            $scope.subject = $scope.subjectInfo[0];
            $scope.subject.category = $scope.subjectInfo[0];
            $scope.subject.timeFrom = new Date($scope.subjectInfo[0].fromTime);
            $scope.subject.timeTo = new Date($scope.subjectInfo[0].toTime);
                    // $scope.subject.selectedDays = [];

            $scope.subject.selectedDays = $scope.subjectInfo[0].days.split(',');
            $scope.subject.sDays = $scope.subject.selectedDays.join(',');


        });

    $scope.students = [{
        id: '01',
        firstName: 'John Anthony',
        lastName:'Pecson',
        course: 'BSCS',
        gender: 'Male',
        face: 'img/faces/JP.jpg'
    }, {
        id: '02',
        firstName: 'Joeven',
        lastName:'Tribunalo',
        course: 'BSCS',
        gender: 'Male',
        face: 'img/faces/JT.jpg'
    }, {
        id: '03',
        firstName: 'Shulamite',
        lastName:'Bandola',
        course: 'BSCS',
        gender: 'Female',
        face: 'img/faces/SB.jpg'
    }, {
        id: '04',
        firstName: 'Precious ',
        lastName:'Abejero',
        course: 'BSCS',
        gender: 'Female',
        face: 'img/faces/PA.jpg'
    }, {
        id: '05',
        firstName: 'Yam',
        lastName:'Tanjusay',
        course: 'BSCS',
        gender: 'Female',
        face: 'img/faces/MT.jpg'
    }, {
        id: '06',
        firstName: 'Jolly',
        lastName:'Tabujara',
        course: 'BSCS',
        gender: 'Female',
        face: 'img/faces/JT.jpg'
    }, {
        id: '07',
        firstName: 'Beth',
        lastName:'Gonzaga',
        course: 'BSCS',
        gender: 'Female',
        face: 'img/faces/BG.jpg'
    }, {
        id: '08',
        firstName: 'Gail',
        lastName:'Dearo',
        course: 'BSCS',
        gender: 'Female',
        face: 'img/faces/GD.jpg'
    }];
})
.controller('StudentsCtrl', function($scope, $rootScope, $timeout) {

    $scope.students = [{
        id: '01',
        fullName: 'John Anthony Pecson',
        course: 'BSCS',
        gender: 'Male',
        face: 'img/faces/JP.jpg'
    }, {
        id: '02',
        fullName: 'Joeven Tribunalo',
        course: 'BSCS',
        gender: 'Male',
        face: 'img/faces/JT.jpg'
    }, {
        id: '03',
        fullName: 'Shulamite Bandola',
        course: 'BSCS',
        gender: 'Female',
        face: 'img/faces/SB.jpg'
    }, {
        id: '04',
        fullName: 'Precious Abejero',
        course: 'BSCS',
        gender: 'Female',
        face: 'img/faces/PA.jpg'
    }, {
        id: '05',
        fullName: 'Yam Tanjusay',
        course: 'BSCS',
        gender: 'Female',
        face: 'img/faces/MT.jpg'
    }, {
        id: '06',
        fullName: 'Jolly Tabujara',
        course: 'BSCS',
        gender: 'Female',
        face: 'img/faces/JT.jpg'
    }, {
        id: '07',
        fullName: 'Beth Gonzaga',
        course: 'BSCS',
        gender: 'Female',
        face: 'img/faces/BG.jpg'
    }, {
        id: '08',
        fullName: 'Gail Dearo',
        course: 'BSCS',
        gender: 'Female',
        face: 'img/faces/GD.jpg'
    }];


    //   var ref = new Firebase('https://sinulogdekabankalan.firebaseio.com/chats');
    //   var sync = $firebase(ref);
    //   $scope.chats = sync.$asArray(); 
    //   // var refreshDates = function () {
    //   //     $timeout(refreshDates, 1000);
    //   // };
    //   // refreshDates();

    // $scope.getCurrentDate = function(timeAgo) {
    //   var time = moment(timeAgo);
    //   // var validateTime = new Date(time).getTime().toString()
    //   // console.log(time);
    //   return time;
    // };


    // $scope.sendChat = function(chat) {
    //   var time = moment();
    //   var timeStamp = new Date(time).getTime(); 
    //   console.log(new Date(time).getTime()); 

    //   console.log($rootScope.user.facebook);
    //     $scope.chats.$add({
    //         user: $rootScope.user.facebook.displayName,
    //         face: $rootScope.user.facebook.cachedUserProfile.picture.data.url,
    //         message: chat.message,
    //         timestamp : timeStamp
    //     });
    //     chat.message = "";
    // }

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
