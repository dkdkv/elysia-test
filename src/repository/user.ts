import { DeleteResult, UpdateResult } from 'kysely'
import { db } from '../db'
import { User, NewUser, UserUpdate } from '../models/user'

export {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}

async function getUsers() {
    let query = db.selectFrom('users')
    return await query.selectAll().execute()
}

async function getUserById(id: number) {
    return await db.selectFrom('users').where('id', '=', id).selectAll()
        .executeTakeFirst()
}

async function createUser(user: NewUser) {
    return await db.insertInto('users').values(user).returning('id').executeTakeFirstOrThrow()
}

async function updateUser(id: number, user: UserUpdate) {
    return await db.updateTable('users').set(user).where('id', '=', id).returningAll().executeTakeFirstOrThrow()
}

async function deleteUser(id: number) {
    return await db.deleteFrom('users').where('id', '=', id).execute()
}