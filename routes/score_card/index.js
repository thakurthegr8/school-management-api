const router = require("express").Router();
const scoreCardControllers = require("../../controllers/score");
const { isTeacher, isStudent } = require("../../middlewares");

router.get(
  "/by_student",
  isStudent,
  scoreCardControllers.getScoreCardByStudent
);
router.post(
  "/by_teacher",
  isTeacher,
  scoreCardControllers.getScoreCardByTeacher
);
router.post("/add", isTeacher, scoreCardControllers.addScoreCard);
router.delete("/delete", isTeacher, scoreCardControllers.deleteScoreCard);
router.patch(
  "/update_score",
  isTeacher,
  scoreCardControllers.updateScoreCardScore
);

module.exports = router;
