const oracledb = require('oracledb');
oracledb.initOracleClient({configDir: '/opt/oracle/instantclient_19_9/network/admin'});

cns = {
    user: "erick",
    password: "201404319",
    connectString : "35.192.155.94/ORCL18",
}


async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, { autoCommit });
    cnn.release();
    return result;
}

exports.Open = Open;