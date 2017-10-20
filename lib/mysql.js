import MySql from 'mysql';
import Config from '../config';

// 创建连接池
let sqlPool = MySql.createPool({
    host: Config.database.HOST,
    user: Config.database.USERNAME,
    password: Config.database.PASSWORD,
    database: Config.database.DATABASE
});


// 数据库操作
export function sqlQuery(sql, value)  {
    return new Promise( (resolve, reject) => {
        sqlPool.getConnection( (err, connection) => {
            if (err) {
                console.log(err);
                resolve(err)
            } else {
                connection.query(sql, value, (err, rows) => {
                    if ( err ) {
                        reject(err)
                    } else {
                        resolve(rows);
                    }

                    connection.release();
                });
            }
        });
    });
};


// 建表
export function createTable(sql) {
    return sqlPool(sql, []);
};