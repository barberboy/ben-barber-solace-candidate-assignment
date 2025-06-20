import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const setup = () => {
  const databaseURL = process.env.DATABASE_URL
  if (databaseURL) {
    const queryClient = postgres(databaseURL);
    const db = drizzle(queryClient);
    return db
  } else {
    throw new Error("DATABASE_URL is not set in the environment")
  }
}

export default setup();
