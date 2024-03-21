import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { routes } from './handlers/user';

const app = new Elysia()
  .use(swagger())
  .use(routes)
  .get('/', () => 'hello world')

  .listen(3000);

console.log(process.env.NEON_DATABASE_URL);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

// app.handle(new Request('http://localhost:3000/')).then(console.log);
