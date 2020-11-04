const mysqlConnection = require("../MysqlConnection")
const mysql = require("mysql2")
const isFunction = require("../../Helper/IsFunction")


const insert = async (title, path, onSuccess, onError) => {

    const pool =  mysqlConnection.getPools

    try{



        const query = "insert into Movie(title, path) VALUES ("+mysql.escape(title)+","+mysql.escape(path)+")";

        const result = await pool.query(query);

        if (isFunction(onSuccess)) {
            onSuccess(result);
        }
    }
    catch (e)
    {
        if (isFunction(onError)) {
            onError(e)
        }
    }
}

module.exports = {insert}