// import nodemailer from 'nodemailer'


// const sendEmail = async({to,subject,html})=>{
    
// const transporter = nodemailer.createTransport({
 
//    host: "smtp.gmail.com",
//   port: 465,
//   secure: true,

//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.GOOGLE_APP_PASSWORD,
//   }
// });


//     console.log("EMAIL:", process.env.EMAIL_USER);
// console.log("PASS:", process.env.GOOGLE_APP_PASSWORD);

    
//        try {
//         console.log(to , subject , html);
//         await transporter.verify();
        
//     await transporter.sendMail({
//       from: `GARUDA-AI <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       html,
//     });

//     console.log("✅ Email sent to:", to);
//   } catch (error) {
//     console.error("ERROR", error.message);
//     throw new Error('email sending failed')
  
//   }
    
// }

// export default sendEmail;



import {Resend} from 'resend'



const sendEmail=async({to , subject,text,html})=>{
  // const mg = mailgun.client({username:'api', key:process.env.MAILGUN_API})
   const resend = new Resend(process.env.RESEND_API);

  try {
       const msg =await resend.emails.send({
          from:"onboarding@resend.dev",
    to: to,
    subject: subject,
  
    html: html

  })

  console.log('message',msg)


} catch (error) {
  console.log('errror',error)
  
}

}

export default sendEmail;
