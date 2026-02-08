import dotenv from 'dotenv'
dotenv.config({ path: './config/.env' })

import passport from 'passport'
import {Strategy as GoogleStratgy} from 'passport-google-oauth20'
import User from '../config/models/User.js'
import { signToken } from './authutiils.js'


const configurePassport = ()=>{
    console.log("ENV clientId:", process.env.clientId);
console.log("ENV GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);



    passport.use(
       new GoogleStratgy(
        {
            clientID:process.env.clientId,
            clientSecret:process.env.clientSecret,
            callbackURL:process.env.callbackURL,
           

        },
        
        
        async(accessToken , refreshToken , profile,done)=>{
            try {
                const email = profile.emails[0].value;
                let user = await User.findOne({email});
                console.log('client',process.env.clientId)

                if(user && user.authProvider==='google'){
                    return done(null ,false , {
                        message:'Already registerd, Use email and password to login'
                    })
                }
                if(!user){
                    user = await User.create({
                        name:profile.displayName,
                        email,
                        googleId:profile.id,
                        authProvider:'google'
                    })
                }

                const token = signToken(user._id);
                return done(null , {user,token})


            } catch (error) {
                return done(error , null);
            }
        }
       )
    )
}

export default configurePassport;