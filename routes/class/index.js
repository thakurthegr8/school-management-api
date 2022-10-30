const router = require("express").Router();
const classControllers = require("../../controllers/class");
const { isAdmin,isTeacher,isStudent } = require("../../middlewares");

router.get("/admin", isAdmin, classControllers.getClass);
router.get("/teacher", isTeacher, classControllers.getClassByTeacher);
router.get("/student", isStudent, classControllers.getClassByStudent);

router.post("/add", classControllers.addClass);
router.delete("/delete", classControllers.deleteClass);

router.patch("/add_student", classControllers.addStudentInClass);
router.delete("/delete_student", classControllers.deleteStudentInClass);

router.patch("/update_teacher", classControllers.updateTeacherInClass);

module.exports = router;
