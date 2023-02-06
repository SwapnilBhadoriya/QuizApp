const express = require("express");
const {verifyAdmin} = require('../middlewares/auth')

const router = express.Router();
const {
  createQuizHandler,
  getQuizzes,
  deleteQuiz,
  getQuiz,
  updateQuiz,
  updateQuestion,
  deleteQuestion,
  addQuestion
} = require("../controllers/admin");

router.use(verifyAdmin);

router.route("/create").post(createQuizHandler);
router.route("/quizzes").get(getQuizzes);
router.route("/:quiz_id").get(getQuiz).delete(deleteQuiz).patch(updateQuiz);
router.route('/question/:quiz_id').post(addQuestion);
router.route("/question/:question_id").patch(updateQuestion).delete(deleteQuestion);

module.exports = router;
