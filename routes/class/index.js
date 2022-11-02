const router = require("express").Router();
const classControllers = require("../../controllers/class");
const { isAdmin, isTeacher, isStudent } = require("../../middlewares");
const {
  addClassBodySchema,
  deleteStudentInClassBodySchema,
  addStudentInClassBodySchema,
  updateTeacherInClassBodySchema,
  deleteClassBodySchema,
} = require("../../middlewares/allowed_request_body_parameters/class");

router.get("/admin", isAdmin, classControllers.getClass);
router.get("/teacher", isTeacher, classControllers.getClassByTeacher);
router.get("/student", isStudent, classControllers.getClassByStudent);

router.post("/add", addClassBodySchema, classControllers.addClass);
router.delete("/delete", deleteClassBodySchema, classControllers.deleteClass);

router.patch(
  "/add_student",
  addStudentInClassBodySchema,
  classControllers.addStudentInClass
);
router.delete(
  "/delete_student",
  deleteStudentInClassBodySchema,
  classControllers.deleteStudentInClass
);

router.patch(
  "/update_teacher",
  updateTeacherInClassBodySchema,
  classControllers.updateTeacherInClass
);

module.exports = router;
