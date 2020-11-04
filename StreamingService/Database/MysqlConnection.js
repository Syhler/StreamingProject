const mysql = require("mysql2/promise")




const getConnectionData = () => {
    return{
        host: 'localhost',
        user: "testuser",
        password: "localdb",
        database: "StreamingService"
    }
}

const pool = mysql.createPool(getConnectionData());



module.exports = {getPools: pool}
