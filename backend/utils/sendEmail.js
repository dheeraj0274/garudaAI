import nodemailer from 'nodemailer'


const sendEmail = async({to,subject,html})=>{
    
const transporter = nodemailer.createTransport({
  // service:"gmail",
  // family:4,
  
  // auth: {
  //   user: process.env.EMAIL_USER ,
  //   pass: process.env.GOOGLE_APP_PASSWORD
  // },
   host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
});


    console.log("EMAIL:", process.env.EMAIL_USER);
console.log("PASS:", process.env.GOOGLE_APP_PASSWORD);

    
       try {
        console.log(to , subject , html);
        
    await transporter.sendMail({
      from: `GARUDA-AI <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent to:", to);
  } catch (error) {
    console.error("ERROR", error.message);
    throw new Error('email sending failed')
  
  }
    
}

export default sendEmail;