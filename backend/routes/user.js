const express = require("express");

const UserController = require("../controllers/user")

const router = express.Router();

//* SignUp:-
router.post("/signup", UserController.createUser);

//* LogIn:-
router.post("/login", UserController.userLogin);

module.exports = router;