const router = require("express").Router();
const subjectControllers = require("../../controllers/subject");
const { isAdmin, isTeacher, isStudent } = require("../../middlewares");
const {
  addSubjectBodySchema,
  deleteSubjectBodySchema,
  updateSubjectNameBodySchema,
  updateSubjectCodeBodySchema,
} = require("../../middlewares/allowed_request_body_parameters/subject");
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

router.post("/", addSubjectBodySchema, addSubject);
router.delete("/delete", deleteSubjectBodySchema, deleteSubject);
router.patch("/update_name", updateSubjectNameBodySchema, updateSubjectName);
router.patch("/update_code", updateSubjectCodeBodySchema, updateSubjectCode);

module.exports = router;
