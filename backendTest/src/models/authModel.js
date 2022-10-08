const { dbConn } = require("../config");

const getUser = async (user, next) => {
    try {
        var querySql = 'SELECT * FROM ?? WHERE ?? = ? ';
        const [rows, fields] = await dbConn.promise().query(querySql, ['user', 'username', user]);
        if (rows.length > 0) {
            // console.log(rows);
            return [1, rows[0]];
        } else {
            return [0, null];
        }
    } catch (e) {
        next(e);
    }
};

const add = async (uname, pass, next) => {
    try {
        var querySql = 'INSERT INTO ?? (??,??,??) VALUES (?,?,?)';
        const [rows, fields] = await dbConn.promise()
                        .query(querySql, ['user', 
                            'name', 'username', 'password',
                            null, uname, pass
                        ]);
        console.log(rows);
        if (rows.insertId > 0) {
            var res = {
                id: rows.insertId,
                name: null, 
                username: uname
            };
            return [1, res];
        } else {
            return [0, null];
        }
    } catch (e) {
        return [-2, e.message];
        // next(e);
    }
};


module.exports = {
    getUser,
    add,
};