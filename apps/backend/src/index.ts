import { createApp } from "./utils/create-app.js";
import { createDb } from "./utils/create-db.js";

const db = createDb();

createApp(db);
