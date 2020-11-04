const mysqlConnection = require("../MysqlConnection")
const mysql = require("mysql2")
const isFunction = require("../../Helper/IsFunction")


const insert = async (magnetLink, onSuccess, onError) => {

    const pool =  mysqlConnection.getPools

    try{

        const [rows] = await pool.query("select id from TorrentInformation where magnetLink=" + mysql.escape(magnetLink));

        const id = rows[0].id
        if (id === undefined)
        {
            if (isFunction(onError)) {
                onError("404")
            }
        }

        const insertQuery = "insert into PendingMovie(torrentInformationId) values ("+id+")"

        const insertResult = await pool.query(insertQuery)

        if (isFunction(onSuccess)) {
            onSuccess(insertResult);
        }

    }
    catch (e)
    {
        if (isFunction(onError)) {
            onError(e)
        }
    }
}

const getAll = async (onSuccess, onError) => {

    const pools = mysqlConnection.getPools;

    try {

        const query = "select PendingMovie.id, title, path from PendingMovie" +
            " inner join TorrentInformation TI on PendingMovie.torrentInformationId = TI.id;"

        const [rows] = await pools.query(query);

        if (isFunction(onSuccess))
        {
            onSuccess(rows)
        }
        else
        {
            return rows;
        }
    }
    catch (e)
    {

        if (isFunction(onError))
        {
            onError(e)
        }
        else
        {
            throw e;
        }

    }

}

module.exports = {insert, getAll}