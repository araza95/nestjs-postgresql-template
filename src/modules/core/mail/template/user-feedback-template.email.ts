/**
 * @description This is the template for notifying platform owners about user feedback
 *
 * @param {string} param0.userName
 * @param {string} param0.feedbackContent
 * @param {number} param0.rating
 *
 * @returns Email template for user feedback notification
 */
const userFeedbackEmailTemplate = ({
  userName,
  feedbackContent,
  rating,
}: {
  userName: string;
  feedbackContent: string;
  rating: number;
}) => `
  <!doctype html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>User Feedback Notification</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
      <style>
          body {
              font-family: 'Poppins', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f9f9f9;
          }
          .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              border-radius: 8px;
              text-align: center;
          }
          .header {
              background-color: #007BFF;
              color: #ffffff;
              padding: 10px;
              border-top-left-radius: 8px;
              border-top-right-radius: 8px;
          }
          .content {
              padding: 20px;
              border-bottom-left-radius: 8px;
              border-bottom-right-radius: 8px;
          }
          p {
              color: #333333;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <h2>📝 New User Feedback Received!</h2>
          </div>
          <div class="content">
              <p>Hello,</p>
              <p>You have received new feedback from <strong>${userName}</strong>:</p>
              <p><strong>feedback: </strong>"${feedbackContent}"</p>
              <p><strong>Rating: </strong> ${rating}</p>
              <p>Please review the feedback to better understand user experience and expectations.</p>
              <p>Best regards,<br/>Your App Team 😊</p>
          </div>
      </div>
  </body>
  </html>`;

export default userFeedbackEmailTemplate;
