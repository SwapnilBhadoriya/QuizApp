const createQuizHandler = async function(req,res){

    try {
        console.log(req.body);
        console.log(req.body.questions[0].options);
        return res.json({success:true});
    } catch (error) {
        
    }
}



module.exports = {createQuizHandler};