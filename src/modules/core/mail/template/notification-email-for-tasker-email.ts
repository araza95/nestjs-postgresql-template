/**
 * @description Email template for notifying a tasker that someone has applied to their task
 *
 * @param {string} taskerEmail - The email of the tasker
 * @param {string} posterEmail - The email of the poster
 * @param {string} taskTitle - The title of the task
 *
 * @returns {string} - Returns the email template
 */
const notificationForTaskerApplicationEmail = (
  taskerEmail: string,
  posterEmail: string,
  taskTitle: string,
): string => `
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Application Notification</title>
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
            /*padding: 20px;*/
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
            border: 3px solid #007BFF;
            padding: 0 2rem 1rem 2rem;
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
        }

        .code {
            font-size: 24px;
            font-weight: bold;
            background-color: #E8F0FE;
            color: #007BFF;
            padding: 20px;
            margin: 20px 0;
            border-radius: 5px;
            display: inline-block;
            animation: pulse 2s infinite;
        }

        .button {
            background-color: #007BFF;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            display: inline-block;
            margin-top: 20px;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out, transform 0.2s ease;
        }

        .button:hover {
            background-color: #0056b3;
            transform: scale(1.05);
        }

        p {
            color: #333333;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h2>🌟 Someone Has Applied to Your Task!</h2>
        </div>
        <div class='content'>

            <p>Hello ${taskerEmail},</p>
            <p>We're excited to let you know that someone has shown interest in your profile .</p>
            <p>You have been invite to complete "<strong>${taskTitle}</strong>" TASK!</p>
            <p>Poster's Email: <strong>${posterEmail}</strong></p>
            <p>Please log in to your Task Book account to review the application and interact with the applicant.</p>
            <a href="login_link_here" class="button">Review Application 🚀</a>
            <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
            <p>Thank you for using Task Book!</p>
            <p>Warm regards,<br/>The Task Book Team 😊</p>
        </div>
    </div>
</body>

</html>`;

export default notificationForTaskerApplicationEmail;
