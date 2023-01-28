CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  category VARCHAR(255)
);

CREATE TABLE questions (
  question_id SERIAL PRIMARY KEY,
  quiz_id INTEGER NOT NULL,
  question VARCHAR(255) NOT NULL,
  option1 VARCHAR(255) NOT NULL,
  option2 VARCHAR(255) NOT NULL,
  option3 VARCHAR(255) NOT NULL,
  option4 VARCHAR(255) NOT NULL,
  correct_option VARCHAR(255) NOT NULL,
  FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);