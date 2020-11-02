const mysql = require("mysql")


const addMovie = (name, path, onSuccess, onError) => {

    const sql = "insert into testTable(movieName, path) values ("+mysql.escape(name)+", "+mysql.escape(path)+")"

    sendQuery(sql, onSuccess, onError)

}

const deleteMovie = (id, onSuccess, onError) => {

    const sql = "delete from testTable where id="+ mysql.escape(id);
    sendQuery(sql, onSuccess, onError)
}

const getMovies = (onSuccess, onError) => {
    const sql = "select * from testTable"

    sendQuery(sql, (result) => {

        const rows = Object.values(JSON.parse(JSON.stringify(result)))

        onSuccess(rows)
    }, onError)
}

const sendQuery = (sql, onSuccess, onError) =>
{
    const conn = createConnection();

    conn.connect((err) => {
        if (err){
            onError(err)
        }

        conn.query(sql, function (err, result) {
            if (err)
            {
                onError(err)
            }

            onSuccess(result)
        })
    })
}


const createConnection = () =>
{
    return mysql.createConnection({
        host: 'localhost',
        user: "testuser",
        password: "localdb",
        database: "Test"
    })
}


module.exports = {addMovie, deleteMovie, getMovies}