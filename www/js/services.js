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

        self.insertAll('products', [{
            "id": 0,
            "featured": "1",
            "model": "GAV3SAMRBS",
            "brand": "GE",
            "category": "REF",
            "desc": "Presonal Ref, 3cu. Ft.",
            "cod": 12575,
            "down" : 2794,
            "three": 3619,
            "five": 2451,
            "eleven" : 1435,
            "fourteen" : 1226,
            "seventeen" : 1114,
            "twenty" : 1017,
            "twentyfour" : 952,
            "lcp" : 10601,
            "image": 'img/business/business-thumb.png'
        }, {
            "id": 1,
            "featured": "1",
            "model": "GAV3SAMRBS",
            "brand": "GE",
            "category": "REF",
            "desc": "Presonal Ref, 3cu. Ft.",
            "cod": 12575,
            "down" : 2794,
            "three": 3619,
            "five": 2451,
            "eleven" : 1435,
            "fourteen" : 1226,
            "seventeen" : 1114,
            "twenty" : 1017,
            "twentyfour" : 952,
            "lcp" : 10601,
            "image": 'img/business/business-thumb.png'
        }, {
            "id": 2,
            "featured": "1",
            "model": "GAV3SAMRBS",
            "brand": "GE",
            "category": "REF",
            "desc": "Presonal Ref, 3cu. Ft.",
            "cod": 12575,
            "down" : 2794,
            "three": 3619,
            "five": 2451,
            "eleven" : 1435,
            "fourteen" : 1226,
            "seventeen" : 1114,
            "twenty" : 1017,
            "twentyfour" : 952,
            "lcp" : 10601,
            "image": 'img/business/business-thumb.png'
        }, {
            "id": 3,
            "featured": "1",
            "model": "GAV3SAMRBS",
            "brand": "GE",
            "category": "REF",
            "desc": "Presonal Ref, 3cu. Ft.",
            "cod": 12575,
            "down" : 2794,
            "three": 3619,
            "five": 2451,
            "eleven" : 1435,
            "fourteen" : 1226,
            "seventeen" : 1114,
            "twenty" : 1017,
            "twentyfour" : 952,
            "lcp" : 10601,
            "image": 'img/business/business-thumb.png'
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

.factory('Products', function(DB) {
    var self = this;

    self.getFirst = function(number) {
        return DB.query("SELECT * FROM products LIMIT ?", [number])
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };


    self.getById = function(id) {
        return DB.query("SELECT * FROM products WHERE id = " + id)
            .then(function(result) {
                return DB.fetchAll(result);
            });
    };



    self.update = function(id, data) {
        return DB.query("UPDATE products SET subjectName = '" + data.subjectName + "', desc = '" + data.desc + "', days = '" + data.selectedDays + "',location = '" + data.location + "',categoryName = '" + data.category.categoryName + "',icon = '" + data.category.icon + "',fromTime = '" + data.timeFrom + "',toTime = '" + data.timeTo + "',studentIds = '" + data.selectedStudents +"' WHERE id = " + id)
            .then(function(result) {
                return result;
            });
    };


    return self;
})

.factory('Data', function() {
    //categories Enum
    var categories = [{
        categoryName: 'Television',
        icon: 'img/wilkris/tv.png'
    }, {
        categoryName: 'Refrigerator',
        icon: 'img/wilkris/ref.png'
    }, {
        categoryName: 'Aircon',
        icon: 'img/wilkris/aircon.png'
    }, {
        categoryName: 'Washing Machine',
        icon: 'img/wilkris/washing.png'
    }];

    var brands = [{
        brandName: 'GE',
        icon: 'img/wilkris/logo/ge.png'
    }, {
        brandName: 'LG',
        icon: 'img/wilkris/logo/lg.jpg'
    }, {
        brandName: 'Haier',
        icon: 'img/wilkris/logo/haier1.jpg'
    }, {
        brandName: 'Samsung',
        icon: 'img/wilkris/logo/samsung.jpg'
    }];

    return {
        getAllCategories: function() {
            return categories;
        },
        getAllBrands: function() {
            return brands;
        }
    }
});
