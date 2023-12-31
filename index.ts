import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
// import sequelize from "./config/database";
import moment from "moment";
import bodyParser from "body-parser";
import adminRoutes from "./routes/admin/index.route";
import clientRoutes from "./routes/client/index.route";
import { systemConfig } from "./config/system";

dotenv.config();

// sequelize;

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

// App Local Variables
app.locals.moment = moment;
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes Admin
adminRoutes(app);

// Routes Client
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});