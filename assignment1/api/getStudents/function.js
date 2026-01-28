const { ConnectionPool } = require("mssql");
module.exports = async function (context, req) {
    const config = {
        // get from azure env variable function app
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        server: process.env.SQL_SERVER,
        database: process.env.SQL_DATABASE,
        options: { encrypt: true },
    };
    const pool = new ConnectionPool(config);
    try {
        await pool.connect();
        const result = await pool
            .request()
            .query(
                "SELECT Country, COUNT(*) AS StudentCount FROM Students GROUP BY Country",
            );
        context.res = { status: 200, body: result.recordset };
    } catch (err) {
        context.res = { status: 500, body: err.message };
    } finally {
        pool.close();
    }
};
