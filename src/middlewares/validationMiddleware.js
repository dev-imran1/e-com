export const validationMiddleware =(req,res,next)=>{
    const {displayName,email,password} = req.body;

    if (req.body.hasOwnProperty('displayName') && req.body.hasOwnProperty('email') &&req.body.hasOwnProperty('password')) {
        if([displayName,email,password].some((field) => field === '')){
            res.send("all file required")
        }
    }else{
        res.send("invalid")
    }
    next();
}