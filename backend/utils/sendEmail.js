



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


// import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";




// const sendEmail =async(email,otp)=>{
//   const mailerSend = new MailerSend({
//     apiKey: process.env.MAIL_API_KEY,
// });

// const sentFrom = new Sender("dy911848@gmail.com", "GARUD-AI");

// const recipients = [
//     new Recipient(email, "User")
// ];

// const personalization = [
//   {
//     email: email,
//     data: {
//       OTP_CODE:otp
//     },
//   }
// ];




//   try {
//     const emailParams = new EmailParams()
//     .setFrom(sentFrom)
//     .setTo(recipients)
//     .setReplyTo(sentFrom)
//     .setSubject("This is a Subject")
//     .setTemplateId('3zxk54v0p0qgjy6v')
//     .setPersonalization(personalization);

//     await mailerSend.email.send(emailParams);
//     console.log('Email sent')

  



    
//   } catch (error) {
//     console.log('error',error)
//     throw new Error('email sending failed')
//   }
// }

// export default sendEmail;