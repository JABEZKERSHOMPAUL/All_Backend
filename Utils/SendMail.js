const nodemailer = require('nodemailer')


const sendMail =(email,subject,text)=>{

   try {
    const transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        service:'gmail',
        port:587,
        secure:true,
        auth:{
            user:'testmailnoreply989@gmail.com',
            pass:'xglmptwkgrolrpzm'
        }
    });

    transporter.sendMail({
        from:'testmailnoreply989@gmail.com',
        to:email,
        subject:subject,
        text:text
    })

    console.log('email sent successfully');
   } catch (error) {
     console.log(error);
   }
}

module.exports =sendMail