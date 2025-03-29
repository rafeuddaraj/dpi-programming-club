export function generateAssignmentMarksEmail(
  workshopName,
  assignmentName,
  viewMarksUrl
) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assignment Marks Available - CST Club DPI</title>
    <style type="text/css">
      /* Base styles */
      body, html {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        line-height: 1.5;
        color: #333;
      }
      
      /* Responsive styles */
      @media only screen and (max-width: 600px) {
        .email-container {
          width: 100% !important;
        }
        .content-padding {
          padding: 15px !important;
        }
        .header {
          padding: 20px 15px !important;
        }
        .button-container {
          width: 100% !important;
        }
        .button {
          display: block !important;
          width: 80% !important;
          padding: 16px 10px !important;
          text-align: center !important;
          margin: 0 auto !important;
        }
        .course-info {
          padding: 15px !important;
        }
      }
    </style>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: Arial, Helvetica, sans-serif; -webkit-font-smoothing: antialiased; font-size: 16px; line-height: 1.4; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
      <tr>
        <td align="center" style="padding: 20px 0;">
          <!-- Email Container -->
          <table class="email-container" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.05); border: 1px solid #e0e0e0;">
            <!-- Header with Gradient -->
            <tr>
              <td align="center" style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 40px 20px; color: #ffffff; text-align: center;">
                <!-- Text logo instead of image -->
                <div style="margin-bottom: 15px; font-size: 24px; font-weight: bold; letter-spacing: 1px;">CST Club - DPI</div>
                <h1 style="margin: 0; font-size: 28px; font-weight: bold; margin-bottom: 10px;">Assignment Marks Available</h1>
                <p style="margin: 0; font-size: 16px; opacity: 0.9;">Your results are ready to view</p>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td class="content-padding" style="padding: 40px 30px;">
                <!-- Main Message -->
                <p style="margin: 0 0 25px 0; color: #333333; font-size: 16px; text-align: center;">
                  We're pleased to inform you that your marks for <strong>${assignmentName}</strong> in <strong>${workshopName}</strong> have been released and are now available for viewing.
                </p>
                
                <!-- Course Info Box -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0; background-color: #f0f7ff; border-radius: 8px;">
                  <tr>
                    <td class="course-info" style="padding: 20px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td style="padding-left: 15px;">
                            <h3 style="margin: 0 0 5px 0; color: #1e40af; font-size: 18px;">${workshopName}</h3>
                            <p style="margin: 0 0 5px 0; color: #4b5563; font-size: 14px;">Assignment: ${assignmentName}</p>
                            <p style="margin: 0; color: #4b5563; font-size: 14px;">Date: ${new Date().toLocaleDateString()}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
                <p style="margin: 0 0 30px 0; color: #333333; text-align: center; font-size: 16px;">
                  Click the button below to view your marks and feedback:
                </p>
                
                <!-- Button - Improved for mobile responsiveness -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0;">
                  <tr>
                    <td align="center" class="button-container">
                      <table border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 300px;">
                        <tr>
                          <td align="center" bgcolor="#2563eb" style="border-radius: 6px;">
                            <a href="${viewMarksUrl}" target="_blank" class="button" style="display: inline-block; padding: 16px 36px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px; background-color: #2563eb; box-shadow: 0 2px 5px rgba(0,0,0,0.1); width: 100%; box-sizing: border-box; text-align: center;">
                              View Your Marks
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                
                <!-- Fallback Link -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 25px 0; background-color: #f9fafb; border-radius: 6px;">
                  <tr>
                    <td style="padding: 15px;">
                      <p style="margin: 0 0 10px 0; color: #4b5563; font-size: 14px;">
                        If the button above doesn't work, please copy and paste the following link into your browser:
                      </p>
                      <p style="margin: 0; font-family: monospace; word-break: break-all; font-size: 12px; color: #2563eb;">
                        ${viewMarksUrl}
                      </p>
                    </td>
                  </tr>
                </table>
                
                <!-- Additional Info -->
                <p style="margin: 25px 0 15px 0; color: #333333; text-align: center;">
                  Please review your marks and the provided feedback. If you have any questions about your assessment, please contact your instructor during office hours or via email.
                </p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td align="center" bgcolor="#f9fafb" style="padding: 25px; border-top: 1px solid #e5e7eb;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center">
                      <!-- Text logo instead of image -->
                      <div style="margin-bottom: 15px; font-size: 18px; font-weight: bold; color: #4b5563;">CST Club - DPI</div>
                      <p style="margin: 0 0 15px 0; font-size: 14px; color: #6b7280;">
                        © ${new Date().getFullYear()} CST Club - DPI. All rights reserved.
                      </p>
                      <p style="margin: 0; font-size: 14px;">
                        <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                        <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Contact Us</a>
                        <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Unsubscribe</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
    `;
}

// Preview component
export default function AssignmentMarksEmailPreview() {
  const sampleViewMarksUrl =
    "https://cst-club-dpi.vercel.app/courses/cst101/assignments/midterm/marks";

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <div
        dangerouslySetInnerHTML={{
          __html: generateAssignmentMarksEmail(
            "Computer Science Fundamentals",
            "Midterm Project",
            sampleViewMarksUrl
          ),
        }}
      />
    </div>
  );
}
