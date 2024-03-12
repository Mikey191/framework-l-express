const controller = require("./user-controller");
const Router = require("../framework/Router");
const router = new Router();

router.get("/users", controller.getUsers);
router.post("/users", controller.createUser);

module.exports = router;