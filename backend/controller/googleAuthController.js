import passport from "passport";

export const googleAuthCallback = (req,res,next)=>{
    passport.authenticate(
        "google",
        {session:false},
        (err,data,info)=>{
            if(err){

            }
            if(!data){

            }

            const {token,user}= data;


            res.cookie('token',token,{
                httpOnly:true,
                sameSite:'strict',
                secure:process.env.NODE_ENV==='production',
                maxAge:24*60*60*1000
            })

            return res.status(200).json({
                success:true,
                message:'User registered',
                user
            })
        }
    )(req,res,next)
}