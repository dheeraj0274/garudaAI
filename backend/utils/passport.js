import dotenv from 'dotenv'

dotenv.config(
    {path:  process.env.NODE_ENV==='production' ? "./config/.env.production" : "./config/.env.development"}
)

import passport from 'passport'
import {Strategy as GoogleStratgy} from 'passport-google-oauth20'
import User from '../config/models/User.js'
import { signToken } from './authutiils.js'
import sendEmail from '../utils/sendEmail.js';
import path from 'path'
import fs from 'fs';


const configurePassport = ()=>{
    



    passport.use(
       new GoogleStratgy(
        {
            clientID:process.env.clientId,
            clientSecret:process.env.clientSecret,
            callbackURL:process.env.callbackURL,
           

        },
        
        
        async(accessToken , refreshToken , profile,done)=>{
            try {

                console.log('profile',profile)
                const email = profile.emails[0].value;
                let user = await User.findOne({email});
                console.log('client',process.env.clientId)

                if(user && user.authProvider!=='google'){
                    return done(null ,false , {
                        message:'Already registerd, Use email and password to login'
                    })
                }
                if(!user){
                     let templatePath = path.join(process.cwd()  ,'utils', 'congrats.html');
                     let welcome=fs.readFileSync(templatePath , 'utf-8');

                     welcome=welcome.replace("{{name}}" , profile.displayName)
                    user = await User.create({
                        name:profile.displayName,
                        email,
                        googleId:profile.id,
                        authProvider:'google'
                    })
                    sendEmail({
                        to:email,
                        subject:'Welcome to Garuda-AI',
                        html:welcome
                    }).catch(console.error)

                }
                const name = profile.displayName;
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