const mysqlConnection = require("../MysqlConnection")
const mysql = require("mysql2")
const isFunction = require("../../Helper/IsFunction")


const insert = async (data, onSuccess, onError) => {

    const pool = mysqlConnection.getPools

    const insertQueryTorrentInformation = "insert into TorrentInformation(title, path, magnetLink) " +
        "values (" + mysql.escape(data.title) + ", " + mysql.escape(data.path) + ", " + mysql.escape(data.magnetLink) + ")"

    try{

        const result = await pool.query(insertQueryTorrentInformation);

        const insertId = result[0].insertId
        const insertDownloadMovie = "insert into DownloadMovie(torrentInformationId) " +
            "values("+insertId+")"
        const downloadMovieResult = await pool.query(insertDownloadMovie);


        if (isFunction(onSuccess))
        {
            onSuccess({
                torrentInformation: result,
                downloadMovie: downloadMovieResult
            });
        }

        return downloadMovieResult;

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

const update = async (id, isFinished, onSuccess, onError) => {

    if (id === undefined || isFinished === undefined)
    {
        throw new Error("Id or isFinished was undefined" + "id: " + id + " isFinished: " + isFinished)
    }

    const pool = mysqlConnection.getPools

    try
    {
        const updateQuery = "update DownloadMovie set isFinishDownloaded = "+mysql.escape(isFinished)+" where id =" + mysql.escape(id)

        const result = await pool.query(updateQuery);

        if (isFunction(onSuccess))
        {
            onSuccess(result)
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

module.exports = {insert, update}