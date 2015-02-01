angular.module('starter.services', [])

// let's create a re-usable factory that generates the $firebaseAuth instance
// .factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
//     var ref = new Firebase("https://sinulogdekabankalan.firebaseio.com//");
//     return $firebaseAuth(ref);
// }])

.factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;

    if (window.sqlitePlugin)
        self.db = window.sqlitePlugin.openDatabase({
            name: DB_CONFIG.name
        });
    else if (window.openDatabase)
        self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);



    self.init = function() {

        if (window.sqlitePlugin)
            self.db = window.sqlitePlugin.openDatabase({
                name: DB_CONFIG.name
            });
        else if (window.openDatabase)
            self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);


        for (var tableName in DB_CONFIG.tables) {
            var defs = [];
            var columns = DB_CONFIG.tables[tableName];
            for (var columnName in columns) {
                var type = columns[columnName];
                defs.push(columnName + ' ' + type);
            }
            var sql = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' (' + defs.join(', ') + ')';
            self.query(sql);
        }

        self.insertAll('subjects', [{
            "id": 0,
            "subjectName": "Psychology 1",
            "desc": "Gen. Psy. w/ Moral Regen & Drug Abuse Ed.",
            "days": "Mon,Wed,Fri",
            "location": "Room 11",
            "categoryName": "Education",
            "icon": "education/education-thumb.png",
            "fromTime": "Thu Jan 01 2015 07:30:00 GMT+0800 (Taipei Standard Time)",
            "toTime": "Thu Jan 01 2015 09:00:00 GMT+0800 (Taipei Standard Time)",
            "studentIds" : "1, 2, 3"

        }, {
            "id": 1,
            "subjectName": "Acctng. 1",
            "desc": "Principles of Accounting",
            "days": "Mon,Wed,Fri",
            "location": "Room 2",
            "categoryName": "Business",
            "icon": "business/business-thumb.png",
            "fromTime": "Thu Jan 01 2015 07:30:00 GMT+0800 (Taipei Standard Time)",
            "toTime": "Thu Jan 01 2015 09:00:00 GMT+0800 (Taipei Standard Time)",
            "studentIds" : "1, 2, 3"
        }, {
            "id": 2,
            "subjectName": "IT 101",
            "desc": "IT Fundamentals",
            "days": "Mon,Wed,Fri",
            "location": "Lab 2",
            "categoryName": "Technology",
            "icon": "tech/tech-thumb.png",
            "fromTime": "Thu Jan 01 2015 07:30:00 GMT+0800 (Taipei Standard Time)",
            "toTime": "Thu Jan 01 2015 09:00:00 GMT+0800 (Taipei Standard Time)",
            "studentIds" : "1, 2, 3"
        }, {
            "id": 3,
            "subjectName": "IT 102",
            "desc": "Programming 1",
            "days": "Mon,Wed,Fri",
            "location": "Room 11",
            "categoryName": "Technology",
            "icon": "tech/tech-thumb.png",
            "fromTime": "Thu Jan 01 2015 07:30:00 GMT+0800 (Taipei Standard Time)",
            "toTime": "Thu Jan 01 2015 09:00:00 GMT+0800 (Taipei Standard Time)",
            "studentIds" : "1, 2, 3"
        }]);

        self.insertAll('students',[{
        id: '01',
        firstName: 'John Anthony',
        lastName: 'Pecson',
        course: 'BSCS',
        yearLevelSection : '4',
        gender: 'Male',
        face: 'img/faces/JP.jpg'
    }, {
        id: '02',
        firstName: 'Joeven',
        lastName: 'Tribunalo',
        yearLevelSection : '4',
        course: 'BSCS',
        gender: 'Male',
        face: 'img/faces/JT.jpg'
    }, {
        id: '03',
        firstName: 'Shulamite',
        lastName: 'Bandola',
        yearLevelSection : '4',
        course: 'BSCS',
        gender: 'Female',
        face: 'img/faces/SB.jpg'
    }, {
        id: '04',
        firstName: 'Precious ',
        lastName: 'Abejero',
        course: 'BSCS',
        yearLevelSection : '4',
        gender: 'Female',
        face: 'img/faces/PA.jpg'
    }, {
        id: '05',
        firstName: 'Yam',
        lastName: 'Tanjusay',
        course: 'BSCS',
        yearLevelSection : '4',
        gender: 'Female',
        face: 'img/faces/MT.jpg'
    }, {
        id: '06',
        firstName: 'Jolly',
        lastName: 'Tabujara',
        course: 'BSCS',
        yearLevelSection : '4',
        gender: 'Female',
        face: 'img/faces/JT.jpg'
    }, {
        id: '07',
        firstName: 'Beth',
        lastName: 'Gonzaga',
        course: 'BSCS',
        yearLevelSection : '4',
        gender: 'Female',
        face: 'img/faces/BG.jpg'
    }, {
        id: '08',
        firstName: 'Gail',
        lastName: 'Dearo',
        course: 'BSCS',
        yearLevelSection : '4',
        gender: 'Female',
        face: 'img/faces/GD.jpg'
    }]);



    };


    self.insertAll = function(tableName, data) {
        var columns = [],
            bindings = [];

        for (var columnName in DB_CONFIG.tables[tableName]) {
            columns.push(columnName);
            bindings.push('?');
        }

        var sql = 'INSERT INTO ' + tableName + ' (' + columns.join(', ') + ') VALUES (' + bindings.join(', ') + ')';

        for (var i = 0; i < data.length; i++) {
            var values = [];
            for (var j = 0; j < columns.length; j++) {
                values.push(data[i][columns[j]]);
            }
            self.query(sql, values);
        }
    };

    self.delete = function(tablename, id) {
        var sql = 'DELETE '
    }

    self.query = function(sql, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        self.db.transaction(function(transaction) {
            transaction.executeSql(sql, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    self.fetchAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }

        return output;
    };

    return self;
})

.factory('Subjects', function(DB) {
    var self = this;

    self.getFirst = function(number) {
        return DB.query("SELECT * FROM subjects LIMIT ?", [number])
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };

    self.getAllByName = function(name) {
        return DB.query("SELECT * FROM subjects WHERE name LIKE '%" + name.toLowerCase() + "%' ORDER BY subjectName")
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };



    self.getById = function(id) {
        return DB.query("SELECT * FROM subjects WHERE id = " + id)
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };

    self.getByStudentId = function(id) {
        return DB.query("SELECT * FROM subjects WHERE studentIds LIKE '%" + id + "%'")
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };



    self.update = function(id, data) {
        return DB.query("UPDATE subjects SET subjectName = '" + data.subjectName + "', desc = '" + data.desc + "', days = '" + data.selectedDays + "',location = '" + data.location + "',categoryName = '" + data.category.categoryName + "',icon = '" + data.category.icon + "',fromTime = '" + data.timeFrom + "',toTime = '" + data.timeTo + "',studentIds = '" + data.selectedStudents +"' WHERE id = " + id)
            .then(function(result) {
                return result;
            });
    };


    return self;
})

.factory('Students', function(DB) {
    var self = this;

    self.getFirst = function(number) {
        return DB.query("SELECT * FROM students LIMIT ?", [number])
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };

    self.getById = function(id) {
        return DB.query("SELECT * FROM students WHERE id = " + id)
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };

    self.getByIds = function(ids) {
        return DB.query("SELECT * FROM students WHERE id IN (" + ids + ")")
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };

    self.update = function(id, data) {
        return DB.query("UPDATE students SET firstName = '" + data.firstName + "', lastName = '" + data.lastName + "', gender = '" + data.gender + "',course = '" + data.course + "',yearLevelSection = '" + data.yearLevelSection + "',face = '" + data.face + "' WHERE id = " + id)
            .then(function(result) {
                return result;
            });
    };


    return self;
})

.factory('Attendance', function(DB) {
    var self = this;

    self.getFirst = function(number) {
        return DB.query("SELECT * FROM attendance LIMIT ?", [number])
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };

    self.getById = function(id) {
        return DB.query("SELECT * FROM attendance WHERE id = " + id)
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };

    self.getAttendanceRecord = function(studentId, subjectId) {
        return DB.query("SELECT * FROM attendance WHERE studentId = " + studentId + " AND subjectId = " + subjectId)
            .then(function(result) {
                return DB.fetchAll(result);
            });
    }

    self.update = function(id, data) {
        return DB.query("UPDATE attendance SET firstName = '" + data.firstName + "', lastName = '" + data.lastName + "', gender = '" + data.gender + "',course = '" + data.course + "',yearLevelSection = '" + data.yearLevelSection + "',face = '" + data.face + "' WHERE id = " + id)
            .then(function(result) {
                return result;
            });
    };


    return self;
})

.factory('Data', function() {
    //categories Enum
    var categories = [{
        categoryName: 'Arts',
        icon: 'arts/arts-thumb.png'
    }, {
        categoryName: 'Business',
        icon: 'business/business-thumb.png'
    }, {
        categoryName: 'Education',
        icon: 'education/education-thumb.png'
    }, {
        categoryName: 'Game Development',
        icon: 'games/games-thumb.png'
    }, {
        categoryName: 'Geology',
        icon: 'geo/geo-thumb.png'
    }, {
        categoryName: 'History',
        icon: 'history/history-thumb.png'
    }, {
        categoryName: 'Literature',
        icon: 'literature/literature-thumb.png'
    }, {
        categoryName: 'Multimedia',
        icon: 'movies/movies-thumb.png'
    }, {
        categoryName: 'Nature',
        icon: 'nature/nature-thumb.png'
    }, {
        categoryName: 'Science',
        icon: 'science/science-thumb.png'
    }, {
        categoryName: 'Social',
        icon: 'social/social-thumb.png'
    }, {
        categoryName: 'Sports',
        icon: 'sports/sports-thumb.png'
    }, {
        categoryName: 'Technology',
        icon: 'tech/tech-thumb.png'
    }, ];

    var days = [{
        isChecked: false,
        day: 'Mon'
    }, {
        isChecked: false,
        day: 'Tue'
    }, {
        isChecked: false,
        day: 'Wed'
    }, {
        isChecked: false,
        day: 'Thu'
    }, {
        isChecked: false,
        day: 'Fri'
    }, {
        isChecked: false,
        day: 'Sat'
    }, {
        isChecked: false,
        day: 'Sun'
    }];

    return {
        getAllCategories: function() {
            return categories;
        },
        getAllDays: function() {
            return days;
        }
    }
});
