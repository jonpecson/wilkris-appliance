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
            "desc": "Presonal Ref, 5cu. Ft.",
            "cod": 12575,
            "down": 2794,
            "three": 3619,
            "five": 2451,
            "eleven": 1435,
            "fourteen": 1226,
            "seventeen": 1114,
            "twenty": 1017,
            "twentyfour": 952,
            "lcp": 10601,
            "image": 'img/products/GEGAV3SAMRBSid0.jpg'
        }, {
            "id": 1,
            "featured": "1",
            "model": "GAV055BAYRAL",
            "brand": "GE",
            "category": "REF",
            "desc": "Single Door Ref, 5.2cu. Ft.",
            "cod": 16619,
            "down": 3693,
            "three": 4783,
            "five": 3239,
            "eleven": 1896,
            "fourteen": 1620,
            "seventeen": 1472,
            "twenty": 1344,
            "twentyfour": 1258,
            "lcp": 14010,
            "image": 'img/products/GEGAV055BAYRALid1.jpg'
        }, {
            "id": 2,
            "featured": "1",
            "model": "GMV070BAYRAW",
            "brand": "GE",
            "category": "REF",
            "desc": "2-door Direct Cool, 6.6cu, white",
            "cod": 20231,
            "down": 4495,
            "three": 5822,
            "five": 3943,
            "eleven": 2308,
            "fourteen": 1972,
            "seventeen": 1792,
            "twenty": 1637,
            "twentyfour": 1532,
            "lcp": 17065,
            "image": 'img/products/GEGMV070BAYRAWid2.jpg'
        }, {
            "id": 3,
            "featured": "1",
            "model": "GMV070BAYRAG",
            "brand": "GE",
            "category": "REF",
            "desc": "2-door Direct Cool, 6.6cu, gray",
            "cod": 20850,
            "down": 4633,
            "three": 6000,
            "five": 4063,
            "eleven": 2378,
            "fourteen": 2033,
            "seventeen": 1847,
            "twenty": 1687,
            "twentyfour": 1578,
            "lcp": 17576,
            "image": 'img/products/GEGMV070BAYRAGid3.jpg'
        }, {
            "id": 4,
            "featured": "1",
            "model": "GMV070BDYRAW",
            "brand": "GE",
            "category": "REF",
            "desc": "2-door Direct Cool, 8.6cu, w/ dispenser, gray",
            "cod": 21715,
            "down": 4825,
            "three": 6249,
            "five": 4232,
            "eleven": 2477,
            "fourteen": 2117,
            "seventeen": 1924,
            "twenty": 1757,
            "twentyfour": 1644,
            "lcp": 18306,
            "image": 'img/products/GEGMV070BDYRAWid4.jpg'
        }, {
            "id": 5,
            "featured": "1",
            "model": "HWM70VA",
            "brand": "HAIER",
            "category": "WASHING MACHINE",
            "desc": "7.5 kg. Twin tub",
            "cod": 8978,
            "down": 2010,
            "three": 2356,
            "five": 1595,
            "eleven": 934,
            "fourteen": 798,
            "seventeen": 725,
            "twenty": 0,
            "twentyfour": 0,
            "lcp": 7568,
            "image": 'img/products/haierHWM70VAid5.jpg'
        }, {
            "id": 6,
            "featured": "1",
            "model": "HWM89VA",
            "brand": "HAIER",
            "category": "WASHING MACHINE",
            "desc": "9.0 kg. Twin tub",
            "cod": 10786,
            "down": 2563,
            "three": 2919,
            "five": 1977,
            "eleven": 1157,
            "fourteen": 989,
            "seventeen": 898,
            "twenty": 0,
            "twentyfour": 0,
            "lcp": 9092,
            "image": 'img/products/haierHWM89VAid6.jpg'
        }, {
            "id": 7,
            "featured": "1",
            "model": "CT21A530",
            "brand": "SAMSUNG",
            "category": "TV",
            "desc": "SLIMFIT TV, 21 inches",
            "cod": 9576,
            "down": 2375,
            "three": 2677,
            "five": 1813,
            "eleven": 1061,
            "fourteen": 907,
            "seventeen": 824,
            "twenty": 753,
            "twentyfour": 704,
            "lcp": 8072,
            "image": 'img/products/samsungCT21A530id7.jpg'
        }, {
            "id": 8,
            "featured": "1",
            "model": "CT29Z50",
            "brand": "SAMSUNG",
            "category": "TV",
            "desc": "SLIMFIT TV, 29 inches",
            "cod": 16125,
            "down": 5120,
            "three": 5357,
            "five": 3627,
            "eleven": 2123,
            "fourteen": 1815,
            "seventeen": 1649,
            "twenty": 1506,
            "twentyfour": 1409,
            "lcp": 5934,
            "image": 'img/products/samsungCT29Z50id8.jpg'
        }, {
            "id": 9,
            "featured": "1",
            "model": "LA-22D400",
            "brand": "SAMSUNG",
            "category": "TV",
            "desc": "LCD TV, 22 inches",
            "cod": 12516,
            "down": 2849,
            "three": 4172,
            "five": 2825,
            "eleven": 1654,
            "fourteen": 1413,
            "seventeen": 1284,
            "twenty": 1173,
            "twentyfour": 1098,
            "lcp": 6045,
            "image": 'img/products/samsungLA-22D400id9.jpg'
        }, {
            "id": 10,
            "featured": "1",
            "model": "LA-32D403",
            "brand": "SAMSUNG",
            "category": "TV",
            "desc": "LCD TV, 32 inches",
            "cod": 20553,
            "down": 6249,
            "three": 6851,
            "five": 4640,
            "eleven": 2716,
            "fourteen": 2321,
            "seventeen": 2109,
            "twenty": 1926,
            "twentyfour": 1802,
            "lcp": 9927,
            "image": 'img/products/samsungLA-32D403id10.jpg'
        }, {
            "id": 11,
            "featured": "1",
            "model": "LA-40D503",
            "brand": "SAMSUNG",
            "category": "TV",
            "desc": "LCD TV, 40 inches",
            "cod": 34332,
            "down": 10725,
            "three": 11444,
            "five": 7750,
            "eleven": 4537,
            "fourteen": 3877,
            "seventeen": 3523,
            "twenty": 3217,
            "twentyfour": 3011,
            "lcp": 6582,
            "image": 'img/products/samsungLA-40D503id11.jpg'
        }, {
            "id": 12,
            "featured": "1",
            "model": "LA060MB",
            "brand": "LG",
            "category": "AIRCON",
            "desc": "WINDOW TYPE AIRCON .65HP manual cntrl",
            "cod": 11248,
            "down": 3462,
            "three": 3776,
            "five": 2557,
            "eleven": 1497,
            "fourteen": 1279,
            "seventeen": 1162,
            "twenty": 1061,
            "twentyfour": 993,
            "lcp": 5432,
            "image": 'img/products/lgLA060MBid12.jpg'
        }, {
            "id": 13,
            "featured": "1",
            "model": "LA080TB",
            "brand": "LG",
            "category": "AIRCON",
            "desc": "WINDOW TYPE AIRCON 0.8HP manual cntrl",
            "cod": 15645,
            "down": 4823,
            "three": 5265,
            "five": 3565,
            "eleven": 2087,
            "fourteen": 1783,
            "seventeen": 1620,
            "twenty": 1480,
            "twentyfour": 1385,
            "lcp": 7556,
            "image": 'img/products/lgLA080TBig13.jpg'
        }, {
            "id": 14,
            "featured": "1",
            "model": "TS NC092YDA1",
            "brand": "LG",
            "category": "AIRCON",
            "desc": "SPLIT-TYPE AIRCON 1hp, remote, indoor unit",
            "cod": 24931,
            "down": 7983,
            "three": 8347,
            "five": 5653,
            "eleven": 3309,
            "fourteen": 2828,
            "seventeen": 2569,
            "twenty": 2346,
            "twentyfour": 2196,
            "lcp": 12041,
            "image": 'img/products/lgTSNC092YDA1id14.jpg'
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


    self.deleteById = function(id) {
        return DB.query("DELETE FROM products  WHERE id = " + id)
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
