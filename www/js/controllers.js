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

.controller('CheckAttendanceCtrl', function($scope, $stateParams, Subjects, Students, $timeout, $filter, DB) {
    var id = $stateParams.stateParams;
    var studentIds = "";
    var subjectId = "";

    $scope.students = [];

    $timeout(function() {
        Subjects.getById(id).then(function(subject) {
            subjectId = subject[0].id;
            $scope.subjectTitle = subject[0].subjectName;
            studentIds = subject[0].studentIds;
            getAllStudents(studentIds);
        });


    }, 1);

    var getAllStudents = function(ids) {
        Students.getByIds(ids).then(function(students) {
            for (var key in students) {
                $scope.students.push({
                    id: students[key].id,
                    face: students[key].face,
                    fullName: students[key].firstName + ' ' + students[key].lastName,
                    course: students[key].course + ' ' + students[key].yearLevelSection,
                    gender: students[key].gender,
                    status: ''
                });
            };
        });
    }



    var addAttendanceData = function(student, status) {
        // subjectId, status
        var studentId = student.id;
        var currentDate = new Date();

        var time = moment();
        var timeStamp = new Date(time).getTime();

        DB.insertAll('attendance', [{
            "id": timeStamp,
            "status": status,
            "subjectId": subjectId,
            "studentId": studentId,
            "dateTime": currentDate
        }])
    }

    var deleteStudentOnList = function(student) {
        var index = $scope.students.indexOf(student)
        $scope.students.splice(index, 1);
    }

    $scope.markPresent = function(student) {
        var status = "Present";
        student.status = status;

        deleteStudentOnList(student);
        addAttendanceData(student, status);

    }


    $scope.markAbsent = function(student) {
        var status = "Absent";
        student.status = status;

        deleteStudentOnList(student);
        addAttendanceData(student, status);
    }

    $scope.markLate = function(student) {
        var status = "Late";
        student.status = status;

        deleteStudentOnList(student);
        addAttendanceData(student, status);

    }

})

.controller('AttendanceInfoCtrl', function($scope, $stateParams, Attendance, $filter, Students) {
    var stateParamsArray = $stateParams.stateParams.split('-');

    var studentId = stateParamsArray[0];
    var subjectId = stateParamsArray[1];
    $scope.subjectTitle = stateParamsArray[2];
    var attendanceList = [];

    Students.getById(studentId).then(function(student) {
        $scope.data = student[0];
        $scope.student = $scope.data;
    });

    Attendance.getAttendanceRecord(studentId, subjectId).then(function(attendance) {
        $scope.attendanceList = attendance;
        console.log($scope.attendanceList);
        $scope.presentCount = $filter('filter')($scope.attendanceList, {
            status: 'Present'
        });
        $scope.absentCount = $filter('filter')($scope.attendanceList, {
            status: 'Absent'
        });
        $scope.lateCount = $filter('filter')($scope.attendanceList, {
            status: 'Late'
        });

        // Chart.js Data
        $scope.data = [{
            value: $scope.presentCount.length,
            color: '#00C853',
            highlight: '#01E472',
            label: 'Present'
        }, {
            value: $scope.absentCount.length,
            color: '#F44336',
            highlight: '#EF9A9A',
            label: 'Absent'
        }, {
            value: $scope.lateCount.length,
            color: '#FBC02D',
            highlight: '#FFEE58',
            label: 'Late'
        }];
    });




    $scope.getDate = function(dateVal) {
        var d = moment(dateVal).format('MMM D, YYYY');
        return d;
    }

    $scope.getTime = function(dateVal) {
        var t = moment(dateVal).format('h:mm A');
        return t;
    }
})

// Status : On test
.controller("ProductsCtrl", function($scope, Subjects, $timeout, DB, $window) {
    $scope.subjects = [];

    $scope.$on('$ionicView.afterEnter', function() {
        $timeout(function() {
            Subjects.getFirst(100).then(function(subjects) {
                $scope.subjects = subjects;
            });
        }, 1);
    });

    $scope.viewSubject = function(subject) {
        $window.location = '#/app/subject-info/' + subject.id;

    }



    $scope.editSubject = function(subject) {
        $window.location = '#/app/subject-detail/' + subject.id + '-update';

    }

    $scope.deleteSubject = function(subject) {
        console.log(subject.id);
    }
})

// Status : Done
.controller("SubjectDetailCtrl", function($scope, $cordovaDatePicker, $filter, $ionicModal, DB, Data, Subjects, $filter, $timeout, $stateParams, $state) {

    var stateParamsArray = $stateParams.stateParams.split('-');

    $scope.id = stateParamsArray[0];
    $scope.action = stateParamsArray[1];

    // Form controls initialization
    $scope.days = Data.getAllDays();
    $scope.categories = Data.getAllCategories();

    // 1. Initialization of data
    $scope.initialize = function() {
        $scope.newSubject = {};
        $scope.locallySelectedDays = [];
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
            $scope.newSubject = subject[0];
            $scope.newSubject.category = subject[0];
            $scope.newSubject.timeFrom = new Date(subject[0].fromTime);
            $scope.newSubject.timeTo = new Date(subject[0].toTime);

            $scope.locallySelectedDays = subject[0].days.split(',');
            $scope.newSubject.selectedDays = $scope.locallySelectedDays.join(',');

            $scope.newSubject.selectedStudents = subject[0].studentIds;
        });
    };


    // 2. pick days modal definition
    $ionicModal.fromTemplateUrl('templates/pick-days-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.pickDaysModal = modal;
    });

    $scope.showPickDays = function() {
        $scope.pickDaysModal.show();
    }

    $scope.hidePickDays = function() {
        $scope.pickDaysModal.hide();
        $scope.newSubject.selectedDays = $scope.locallySelectedDays.join(',');
    }

    $scope.updateDays = function(day) {
        $scope.locallySelectedDays = [];
        for (var i = 0; i <= $scope.days.length - 1; i++) {
            if ($scope.days[i].isChecked) {
                $scope.locallySelectedDays.push($scope.days[i].day);
            }
        };
    }

    // 3. add new Subject function definition
    $scope.addSubject = function() {
        var time = moment();
        var timeStamp = new Date(time).getTime();

        if ($scope.newSubject.subjectName && $scope.newSubject.selectedDays &&
            $scope.newSubject.timeFrom && $scope.newSubject.timeTo &&
            $scope.newSubject.category.categoryName && $scope.newSubject.location) {

            DB.insertAll('subjects', [{
                    "id": timeStamp,
                    "subjectName": $scope.newSubject.subjectName,
                    "desc": $scope.newSubject.desc,
                    "days": $scope.newSubject.selectedDays,
                    "location": $scope.newSubject.location,
                    "icon": $scope.newSubject.category.icon,
                    "fromTime": $scope.newSubject.timeFrom,
                    "toTime": $scope.newSubject.timeTo
                }])
                // Show alert
                // $scope.showAlert("added.");
            $state.go('app.subjects')
        };
    }

    // 4. update Subject function definition
    $scope.saveSubject = function() {

        if ($scope.newSubject.subjectName && $scope.newSubject.selectedDays &&
            $scope.newSubject.timeFrom && $scope.newSubject.timeTo &&
            $scope.newSubject.category.categoryName && $scope.newSubject.location) {

            Subjects.update($scope.id, $scope.newSubject).then(function(result) {
                console.log(result);
            });
            // Show alert
            // $scope.showAlert("saved.");
            $state.go('app.subjects')


        };
    }
})

// Status : Currently working
.controller("SubjectInfoCtrl", function($scope, $stateParams, Subjects, $ionicModal, Students, $timeout, $filter, $window) {
    $scope.id = $stateParams.stateParams;

    // 1. retrive subject
    $scope.subject = {};
    $scope.students = [];


    $scope.refreshSubjectInfo = function() {
            $timeout(function() {
                Subjects.getById($scope.id).then(function(subject) {
                    $scope.subject = subject[0];
                    $scope.subject.category = subject[0];
                    $scope.subject.timeFrom = new Date(subject[0].fromTime);
                    $scope.subject.timeTo = new Date(subject[0].toTime);

                    $scope.locallySelectedStudents = $scope.subject.studentIds.split(',');
                    $scope.subject.selectedStudents = $scope.locallySelectedStudents.join(',');

                    $scope.subject.selectedDays = subject[0].days;


                    // 2. retrieve students belong to the subjects
                    var studentIds = $scope.subject.studentIds;
                    $scope.refreshStudentList(studentIds);
                });
            }, 1);
        }
        // 1. retrieve subjects info of a student
    $scope.refreshSubjectInfo();

    // 2. retrieve students belong to the subjects
    $scope.refreshStudentList = function(ids) {
        $scope.students = [];
        $timeout(function() {
            Students.getByIds(ids).then(function(students) {
                $scope.students = students;
            });
        }, 1);

    }

    $scope.doRefresh = function() {
        $scope.refreshSubjectInfo();
        $scope.$broadcast('scroll.refreshComplete');
    }



    // 3. retrieve list of students for pick students modal
    $scope.studentList = [];

    // populate the student lists
    $scope.$on('$ionicView.afterEnter', function() {
        $timeout(function() {
            Students.getFirst(100).then(function(students) {
                for (var key in students) {
                    $scope.studentList.push({
                        id: students[key].id,
                        fullName: students[key].firstName + ' ' + students[key].lastName,
                        isChecked: false
                    });
                };
            });
        }, 1);
    });

    // 3. pick student modal definition
    $ionicModal.fromTemplateUrl('templates/pick-students-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.pickStudentsModal = modal;
    });

    // pickStudentsModal implementation
    $scope.showPickStudents = function() {
        $scope.pickStudentsModal.show();
    }

    $scope.hidePickStudents = function() {
        $scope.pickStudentsModal.hide();
        $scope.subject.selectedStudents = $scope.locallySelectedStudents.join(',');
        Subjects.update($scope.id, $scope.subject).then(function(result) {
            console.log(result);
        });

        // $scope.refreshStudentList();
    }

    $scope.updateStudents = function(studentId) {
        $scope.locallySelectedStudents = [];
        for (var i = 0; i <= $scope.studentList.length - 1; i++) {
            if ($scope.studentList[i].isChecked) {
                $scope.locallySelectedStudents.push($scope.studentList[i].id);
            }
        };
    }

    $scope.getAttendanceInfo = function(student) {
        var studentId = student.id;
        // var subjectId = $scope.subject.id;
        // // var subjectId = subject.id;

        // console.log(studentId + ' ' + subjectId);

        $window.location = '#/app/attendance-info/' + studentId + '-' + $scope.subject.id + '-' + $scope.subject.subjectName;
    }

})

.controller('StudentsCtrl', function($scope, $rootScope, $timeout, Students, $window) {

    $scope.students = [];

    $scope.$on('$ionicView.afterEnter', function() {
        $timeout(function() {
            Students.getFirst(100).then(function(students) {
                $scope.students = students;
            });
        }, 1);
    });

    $scope.viewStudent = function(student) {
        $window.location = '#/app/student-info/' + student.id;

    }

    $scope.editStudent = function(student) {
        $window.location = '#/app/student-detail/' + student.id + '-update';

    }

    $scope.deleteStudent = function(student) {
        console.log(student.id);
    }


})

.controller('StudentDetailCtrl', function($scope, $stateParams, DB, Students, $state, $ionicPopup, $cordovaCamera) {
    var paramSTR = $stateParams.stateParams;
    var stateParamsArray = paramSTR.split('-');
    $scope.id = stateParamsArray[0];
    $scope.action = stateParamsArray[1];

    console.log($scope.id + " " + $scope.action);

    $scope.genders = ['Male', 'Female'];

    $scope.initialize = function() {
        $scope.newStudent = {};
    }

    if ($scope.id == 0 && $scope.action == "create") {
        // Show controls and data for creating new student
        $scope.initialize();


    } else if ($scope.action == "update") {
        Students.getById($scope.id).then(function(student) {
            $scope.data = student[0];
            $scope.newStudent = $scope.data;

            var image = document.getElementById('myImage');
            image.src = student[0].face;
            // $scope.newStudent.gender = student[0].face;
            console.log($scope.newStudent.face);
        });

    }

    $scope.addStudent = function() {

        var time = moment();
        var timeStamp = new Date(time).getTime();
        // Todo $scope.newStudent.face
        if ($scope.newStudent.firstName && $scope.newStudent.lastName &&
            $scope.newStudent.gender && $scope.newStudent.course &&
            $scope.newStudent.yearLevelSection) {

            DB.insertAll('students', [{
                    "id": timeStamp,
                    "firstName": $scope.newStudent.firstName,
                    "lastName": $scope.newStudent.lastName,
                    "gender": $scope.newStudent.gender,
                    "course": $scope.newStudent.course,
                    "yearLevelSection": $scope.newStudent.yearLevelSection,
                    "$scope.newStudent.yearLevelSection": $scope.newStudent.face
                }])
                // Show alert
            $state.go('app.students')
        };
    }

    $scope.saveStudent = function() {
        if ($scope.newStudent.firstName && $scope.newStudent.lastName &&
            $scope.newStudent.gender && $scope.newStudent.course &&
            $scope.newStudent.yearLevelSection) {

            Students.update($scope.id, $scope.newStudent).then(function(result) {
                console.log(result);
            });
            // Show alert
            // $scope.showAlert("saved.");
            $state.go('app.students')
        }
    }

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

            $scope.newStudent.face = "data:image/jpeg;base64," + imageData;
            console.log($scope.face);

        }, function(err) {
            // An error occured. Show a message to the user
        });
    }
})

.controller('StudentInfoCtrl', function($scope, $stateParams, Students, Subjects, $window) {
    $scope.id = $stateParams.stateParams;

    Students.getById($scope.id).then(function(student) {
        $scope.data = student[0];
        $scope.student = $scope.data;
    });

    Subjects.getByStudentId($scope.id).then(function(subjects) {
        $scope.subjects = subjects;
    });

    $scope.getAttendanceInfo = function(subject) {
        var studentId = $scope.id;
        // var subjectId = subject.id;

        console.log(studentId + ' ' + subject.id);

        $window.location = '#/app/attendance-info/' + studentId + '-' + subject.id + '-' + subject.subjectName;
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
