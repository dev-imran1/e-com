export const auth = async(req,res,next)=>{
    const token = req.header("Authorization").replace("Brearer ","")
    console.log(token)
    next()
}