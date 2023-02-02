const {pool} = require('../config/dbConfig');


const getQuizzes = async function(req,res){
    try {
        const result = await pool.query('Select * from quizzes order by id');
        return res.status(200).json({success:true,quizzes:result.rows});
    } catch (error) {
        
        return res.status(500).json({success:false,error});
    }
}

 const getQuizQuestions = async function(req,res){
    try {
        
        const result = await pool.query('Select * from questions where quiz_id=$1 order by question_id',[req.params.quiz_id]);
        return res.status(200).json({success:true,questions:result.rows});
    } catch (error) {
        
        return res.status(500).json({success:false});
    }
}


const getAnswers = async function(req,res){
    try {
        const result = await pool.query('Select correct_option from questions where quiz_id=$1 order by question_id',[req.params.quiz_id]);
        return res.status(200).json({success:true,answers:result.rows});
    } catch (error) {
        
        return res.status(500).json({success:false,error});
    }
}
module.exports = {getQuizzes,getQuizQuestions,getAnswers};