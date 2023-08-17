import knex from "knex";

const knexPg = knex({
    client: "pg",
    connection: {
        connectionString: process.env.DB_URL,
        ssl: {
            rejectUnauthorized: false
        }
    }
});

export default knexPg;
