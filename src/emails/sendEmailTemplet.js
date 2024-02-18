export const emailTemplet =  (token)=> {
    return `<!DOCTYPE html>
    <html>
    <head>
      <title>Email Template</title>
      <style>
        /* CSS styles for the email template */
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          padding: 20px;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    
        h1 {
          color: #333333;
        }
    
        p {
          color: #666666;
        }
    
        .button {
          display: inline-block;
          background-color: #4285f4;
          color: #ffffff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
        }
    
        .button:hover {
          background-color: #3367d6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Welcome to our Email verifycation</h1>
        <p>we are very happy to join us </p>
        <p>To get started, please click the button below:</p>
        <p><a href="http://localhost:3000/verify/${token}" class="button">Verify Your Acount</a></p>
        <p>If you have any questions or need further assistance, feel free to contact us.</p>
        <p>Best regards,</p>
        <p>The blabal Team</p>
      </div>
    </body>
    </html>`
}