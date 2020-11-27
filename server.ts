import connectToDb from './server/init/connectToDb';
import syncPuzzles from './server/init/syncPuzzles';
import addMiddleware from './server/init/addMiddleware';

startServer();

async function startServer() {
  const port = process.env.PORT || 4000;

  // Connect to DB and create a table for sessions
  const sessionStore = await connectToDb();

  // Update puzzles table in DB to match the puzzles in /puzzles
  await syncPuzzles();

  // Configure and initialize Express App
  const app = await addMiddleware(sessionStore);

  app.listen(port, () => {
    console.log(`Server open to connections @ http://localhost:${port}`);
  });
}
