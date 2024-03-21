import { Elysia, t } from 'elysia'
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../repository/user'
import { NewUser, User, UserUpdate } from '../models/user'


export const routes = new Elysia({ prefix: '/api' })

routes
    .get('/users', () => getUsers())
    .get('/user/:id', ({ params: { id } }) => getUserById(Number(id)))
    .post('/user', ({ body }) => {
        return createUser(body as NewUser)
    }
        , {
            body: t.Object({
                username: t.String(),
                email: t.String(),
                password: t.String()
            }),
            response: t.Object({
                id: t.Numeric()
            })
        })
    // async function updateUser(id: number, user: UserUpdate) {
    //     return db.updateTable('users').set(user).where('id', '=', id).execute() as Promise<UpdateResult[]>
    // }
    .put('/user/:id', ({ params: { id }, body }) => {
        return updateUser(Number(id), body as UserUpdate)
    }
        , {
            params: t.Object({
                id: t.Numeric()
            }),
            body: t.Object({
                username: t.String({ minLength: 1 }),
                email: t.String({ minLength: 3, pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$' }),
                password: t.String({ minLength: 6 })
            })
        })
    .delete('/user/:id', ({ params: { id } }) => {
        return deleteUser(Number(id))
    }
        , {
            params: t.Object({
                id: t.Numeric()
            })
        })
    .post('/form', ({ body }) => body)
    .post(
        '/json/:id',
        ({ body, params: { id }, query: { name } }) => ({
            ...body,
            id,
            name
        }),
        {
            params: t.Object({
                id: t.String()
            }),
            query: t.Object({
                name: t.String()
            }),
            body: t.Object({
                username: t.String(),
                password: t.String(),
                age: t.Numeric(),
                // data is json object with some properties, not only name
                data: t.Object({}),
                date: t.Date(),
                timestamp: t.Optional(t.String())
            }),
            response: t.Object({
                username: t.String(),
                password: t.String(),
                age: t.Numeric(),
                id: t.String(),
                name: t.String(),
                data: t.Object({}),
                date: t.Date(),
                timestamp: t.Optional(t.String())
            }, { description: 'sample description' })
        }
    )