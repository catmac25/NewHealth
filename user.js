const express = require("express");
const {updateUser, deleteUser, getSingleUser} = require("../Controllers/userController");
const {authenticate, restrict} = require("../auth/verifyToken");

const router = express.Router();

router.get('/:id',authenticate, getSingleUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;