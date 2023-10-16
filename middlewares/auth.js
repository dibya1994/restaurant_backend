const jwt=require("jsonwebtoken");
const SECRET_KEY=process.env.SECRET_KEY;

const auth = (req,res,next)=>{
    try {
        let token= req.headers.authorization;
        if(token)
        {
            // token=token.split(" ")[1]; //if you pass "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2ODY0MDk3MjF9.hK4RVzBUpiY9yrQAWw_PFPYDBy64DRdx7UHe47OS2d0"
            token=token.split(" ")[1];
            const user=jwt.verify(token, SECRET_KEY);
            req.userId=user.id;
            next();
            
        }
        else{
            res.status(401).json({message : "Invalid Token"});
        }  
    } catch (error) {
        // console.log(error);
        res.status(401).json({message : "Unauthorized User"});
    }
}


module.exports = auth;