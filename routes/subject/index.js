const router = require("express").Router();
const subjectControllers = require("../../controllers/subject");
const { isAdmin, isTeacher, isStudent } = require("../../middlewares");
const {
  getSubjectByAdmin,
  getSubjectByTeacher,
  getSubjectByStudent,
  addSubject,
  deleteSubject,
  updateSubjectName,
  updateSubjectCode,
} = subjectControllers;

router.get("/admin", isAdmin, getSubjectByAdmin);
router.get("/teacher", isTeacher, getSubjectByTeacher);
router.get("/student", isStudent, getSubjectByStudent);

router.post("/", isAdmin, addSubject);
router.delete("/delete", isAdmin, deleteSubject);
router.patch("/update_name", isAdmin, updateSubjectName);
router.patch("/update_code", isAdmin, updateSubjectCode);

module.exports = router;
