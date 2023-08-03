import knex from "knex";

const knexPg = knex({
    client: "pg",
    connection: process.env.DB_URL,
});

export default knexPg;
