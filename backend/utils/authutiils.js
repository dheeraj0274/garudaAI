import jwt from 'jsonwebtoken'


export const signToken = (userId)=>{
     return  jwt.sign(
        {_id:userId},
        process.env.JWT_SECRET,
        {expiresIn:'1d'}

      )
}


export const verifyToken = (token)=>{
    jwt.verify(token , process.env.JWT_SECRET);
}



