import connectToDb from './server/init/connectToDb';
import syncPuzzles from './server/init/syncPuzzles';
import configureServer from './server/init/configureServer';
import startCronJobs from './server/init/startCronJobs';

startServer();

async function startServer() {
  const port = process.env.PORT || 4000;

  // Connect to DB and create a table for sessions which then needs to
  // be passed to the server's configuration
  const sessionStore = await connectToDb();

  // Update puzzles table in DB to match the puzzles in /puzzles
  await syncPuzzles();

  // Configure and initialize Express App
  const app = await configureServer(sessionStore);

  app.listen(port, () => {
    console.log(`Server open to connections @ http://localhost:${port}`);
  });

  // Runs a chron job that emails a daily summary for the site
  startCronJobs();
}
