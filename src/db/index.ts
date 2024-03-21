import { type GeneratedAlways, Kysely } from 'kysely'
import { PostgresJSDialect } from 'kysely-postgres-js'
import postgres from 'postgres'
import { Database, PostTable, UserTable } from '../models/user'

// interface Database {
//     users: UserTable
//     posts: PostTable
// }

// const db = new Kysely<Database>({
//     dialect: new PostgresJSDialect({
//         postgres: postgres(process.env.DATABASE_URL || ''),
//     }),
// })

// export default db

const dialect = new PostgresJSDialect({
    postgres: postgres(process.env.DATABASE_URL || ''),
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely 
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how 
// to communicate with your database.
export const db = new Kysely<Database>({
    dialect,
})