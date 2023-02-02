const { pool } = require("../config/dbConfig");

const getQuizzes = async function (req, res) {
  try {
    const result = await pool.query("Select * from quizzes order by id");
    return res.status(200).json({ success: true, quizzes: result.rows });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const createQuizHandler = async function (req, res) {
  const { title, description, questions } = req.body;
  try {
    const quiz_info = await pool.query(
      "Insert into quizzes(name,description) values($1,$2) returning id",
      [title, description]
    );
    console.log("req");
    const quiz_id = quiz_info.rows[0].id;

    console.log(questions);
    for (let i = 0; i < questions.length; i++) {
      const { questionText, options, correctAnswer } = questions[i];
      await pool.query(
        "Insert into questions(quiz_id,question,option1,option2,option3,option4,correct_option) values($1,$2,$3,$4,$5,$6,$7)",
        [
          quiz_id,
          questionText,
          options[0],
          options[1],
          options[2],
          options[3],
          correctAnswer,
        ]
      );
    }
    console.log(req.body);
    console.log(req.body.questions[0].options);
    return res.status(201).json({ success: true });
  } catch (error) {
    return res.json({ success: false, error });
  }
};
const deleteQuiz = async function (req, res) {
  try {
    await pool.query("Delete from quizzes where id=$1", [req.params.quiz_id]);
    return res.json({ success: true, msg: "Deleled Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const getQuiz = async function (req, res) {
  try {
    const result = await pool.query("Select * from quizzes where id=$1", [
      req.params.quiz_id,
    ]);
    return res.status(200).json({ success: true, quiz: result.rows });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const updateQuiz = async function (req, res) {
  try {
    const { name, description } = req.body;
    await pool.query("Update quizzes set name=$1,description=$2 where id=$3", [
      name,
      description,
      req.params.quiz_id,
    ]);
    return res.status(201).json({ success: true, msg: "Updation Successful" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const updateQuestion = async function (req, res) {
  try {
    const { question, option1, option2, option3, option4, correct_option } =
      req.body;
    await pool.query(
      "Update questions set question=$1,option1=$2,option2=$3,option3=$4,option4=$5,correct_option=$6 where question_id=$7",
      [
        question,
        option1,
        option2,
        option3,
        option4,
        correct_option,
        req.params.question_id,
      ]
    );
    return res
      .status(201)
      .json({ success: true, msg: "Question Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};

const addQuestion = async function (req,res) {
  try {
    const { questionText, options, correctAnswer } = req.body;
    await pool.query(
      "Insert into questions(quiz_id,question,option1,option2,option3,option4,correct_option) values($1,$2,$3,$4,$5,$6,$7)",
      [
        req.params.quiz_id,
        questionText,
        options[0],
        options[1],
        options[2],
        options[3],
        correctAnswer,
      ]
    );

    return res
      .status(201)
      .json({ success: true, msg: "Question added successfully ." });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
const deleteQuestion = async function (req, res) {
  try {
    await pool.query("Delete from questions where question_id=$1", [
      req.params.question_id,
    ]);
    return res
      .status(201)
      .json({ success: true, msg: "Question deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
module.exports = {
  createQuizHandler,
  getQuizzes,
  deleteQuiz,
  updateQuiz,
  getQuiz,
  updateQuestion,
  deleteQuestion,
  addQuestion,
};
