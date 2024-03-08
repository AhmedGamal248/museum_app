import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
      user: "ag2849315@gmail.com",
      pass: "ymkqewznkajvsgsq",
    },
  });

  transporter.verify((error ,success)=>{
    if(error) {
        console.log(error)
    } else {
        console.log('success')
    }
  })


  
  const sendEmailsWithOtp = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions)
        return
    } catch (error) {
        console.log(error)
    }
  }

  export {
    sendEmailsWithOtp
  }