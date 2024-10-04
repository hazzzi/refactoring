import jsonServer from 'json-server';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);

const db = new Low(new JSONFile(join(__dirname, '/mock/db.json')), {});

await db.read();

/** Custom Routing */
server.get('/users', (req, res) => {
  res.send(db.data.users);
});

const router = jsonServer.router('server/mock/db.json');
server.use(router);
server.use(jsonServer.bodyParser);

server.listen(3001, () => {
  console.log('JSON Server is running');
});
