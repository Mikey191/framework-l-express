const Application = require("./framework/Application");
const userRouter = require("./src/user-router");
const jsonParser = require("./framework/parseJson");
const parseUrl = require("./framework/parseUrl");

const PORT = process.env.PORT || 5000;

const app = new Application();
app.use(jsonParser);
app.use(parseUrl("http://localhost:5000"));

app.addRoute(userRouter);
app.listen(PORT, () => console.log(`Server is start on ${PORT} port!`));
