const express = require("express");
const router = express.Router();

router.route("/").post(adminLogin);
router.route("/user").get(getAllUser);
router.route("/user/:id").get(getSingleUser).delete(deleteUser)
/*


/ = login 
/user = sarre user send kru ga 
/user/:id = single user detail


*/




module.exports = router;