const mysqlDatabase = require("../MysqlConnection")


const insert = (data, onSuccess, onError) => {


    const insertQuery = "insert into TorrentInformation(title, path, magnetLink) " +
        "values ("+mysql.escape(data.title)+", "+mysql.escape(data.path)+", "+mysql.escape(data.magnetLink)+")"


}