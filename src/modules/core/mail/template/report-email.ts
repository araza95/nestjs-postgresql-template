export const reportEmailTemplate = ({
  reportType,
  reason,
  details,
  reporterEmail,
  reportedAgainstEmail,
  reference_id,
}: {
  reportType: string;
  reason: string;
  details: string;
  reporterEmail: string;
  reportedAgainstEmail: string;
  reference_id: number;
}): string => `
<!doctype html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Report Notification</title>
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
            padding-bottom: 20px;
            border: 2px solid #f8d7da;
      		padding-left:0px;
      		padding-right: 0px;
        }
        .header {
            background-color: #dc3545;
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
        .details {
            background-color: #f8d7da;
            color: #dc3545;
            padding: 15px;
            margin: 20px 0;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h2>New Report Notification</h2>
        </div>
        <p>Hello <strong>Devin</strong>,</p>
        <p>A new report has been submitted.</p>
        <p><strong>Report Type:</strong> ${reportType}</p>
        <div class="details">
            <p><strong>reported against: </strong>${reportedAgainstEmail}</p>
            <p><strong>Reason: </strong>${reason}</p>
            <p><strong>Additional Details: </strong>${details}</p>
            <p><strong>Reference ID: </strong>${reference_id}</p>
            <p><strong>Reported At: </strong>${new Date().toLocaleString()}</p>
        </div>
        <p><strong>Reported by:</strong> ${reporterEmail}</p>
        <p>Please review the report and take appropriate action.</p>
        <p>Thank you!</p>
    </div>
</body>

</html>

`;
