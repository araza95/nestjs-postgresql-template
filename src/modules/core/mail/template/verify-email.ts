const template = (email: string, code: string) => `<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Verify Your Email</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">

    <style>
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0px rgba(0, 123, 255, 0.5);
            }
            100% {
                box-shadow: 0 0 0 20px rgba(0, 123, 255, 0);
            }
        }

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
            <h2>Verify Your Email 🔒</h2>
        </div>
        <div class="content">
            <p style="margin-top:0px; padding-top:1rem">We received a request to verify your email address for your Task Book account.</p>
            <p>Email: <strong>${email}</strong></p>
            <p class="code" id="verificationCode">${code}</p>
            <p>This code will expire in 5 minutes, so please use it as soon as possible. ⏳</p>
            <span class="button" onClick="copyToClipboard()">Copy your code 📋</span>
            <p>Or, enter the code manually in the app. 🔑</p>
            <p>Thank you,<br/>Task Book Team 😊</p>
        </div>
    </div>
    <script>
        function copyToClipboard() {
            // Create a temporary input element to hold the verification code
            const tempInput = document.createElement('input');
            // Get the verification code from the element (e.g., a p tag or directly from a variable)
            tempInput.value = document.getElementById('verificationCode').innerText;
            // Append the temporary input to the document body
            document.body.appendChild(tempInput);
            // Select the value inside the input
            tempInput.select();
            // Execute the copy command
            document.execCommand('copy');
            // Remove the temporary input from the document
            document.body.removeChild(tempInput);

            // Optional: Display a message confirming the code has been copied
            alert('Verification code copied to clipboard! ✅');
        }
    </script>
</body>

</html>`;

export default template;
