const path = require("path");
const dotenv = require("dotenv");

const envLocal = path.join(__dirname, ".env.local");
const envDefault = path.join(__dirname, ".env");

dotenv.config({ path: envLocal, quiet: true });
dotenv.config({ path: envDefault, quiet: true });
