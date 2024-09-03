export const paymentSuccessfulEmail = ({
  tasker_name,
  title,
  owner_name,
  owner_email,
  price,
}: {
  tasker_name: string;
  title: string;
  owner_name: string;
  owner_email: string;
  price: number;
}): string => `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Released</title>
    <style>
        body {
            font-family: Arial, sans-serif;
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
            padding: 20px;
        }
        .header {
            background-color: #007BFF;
            color: #ffffff;
            padding: 10px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }
        p {
            color: #333333;
            margin: 10px 0;
        }
        strong {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>Payment Released</h2>
        </div>
        <p>Hello ${tasker_name},</p>
        <p>We are pleased to inform you that the payment for your task has been released.</p>
        <p> <strong>Task title</strong>: ${title}</p> 
        <p> <strong>Poster name</strong>: ${owner_name}</p>
        <p> <strong>Poster email</strong>: ${owner_email}</p>
        <p> <strong>Price</strong>: $${price}</p>
        <p>You can visit the <strong>Stripe Connect Dashboard</strong> to view your payouts & transactions.</p>
        <p>Thank you for your hard work!</p>
        <p>Best regards,<br/> <strong>YOUR PROJECT NAME LLC</strong></p>
    </div>
</body>
</html>
`;
