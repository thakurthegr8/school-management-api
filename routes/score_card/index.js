const router = require("express").Router();
const scoreCardControllers = require("../../controllers/score");
const { isStudent } = require("../../middlewares");
const {
  getSubjectByTeacherBodySchema,
  addScoreCardBodySchema,
  deleteScoreCardBodySchema,
  updateScoreCardScoreBodySchema,
} = require("../../middlewares/allowed_request_body_parameters/score_card");

router.get(
  "/by_student",
  isStudent,
  scoreCardControllers.getScoreCardByStudent
);
router.post(
  "/by_teacher",
  getSubjectByTeacherBodySchema,
  scoreCardControllers.getScoreCardByTeacher
);
router.post("/add", addScoreCardBodySchema, scoreCardControllers.addScoreCard);
router.delete(
  "/delete",
  deleteScoreCardBodySchema,
  scoreCardControllers.deleteScoreCard
);
router.patch(
  "/update_score",
  updateScoreCardScoreBodySchema,
  scoreCardControllers.updateScoreCardScore
);

module.exports = router;
