const mysqlConnection = require("../MysqlConnection")
const mysql = require("mysql2")
const isFunction = require("../../Helper/IsFunction")


const getById = async (id, onSuccess, onError) => {

    const pool =  mysqlConnection.getPools

    try{

        const query = "select * from Movie where id = " + mysql.escape(id);

        const [rows] = await pool.query(query);

        if (isFunction(onSuccess)) {
            onSuccess(rows);
        }
        else
        {
            return rows;
        }
    }
    catch (e)
    {
        if (isFunction(onError)) {
            onError(e)
        }
    }
}

module.exports = {getById}