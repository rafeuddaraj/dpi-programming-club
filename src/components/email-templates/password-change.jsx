export function generateOTPEmail(userName, otpCode, expiryMinutes = 1) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CST Club - DPI Verification Code</title>
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
        .otp-code {
          font-size: 24px !important;
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
            <!-- Header -->
            <tr>
              <td class="header" align="center" bgcolor="#2563eb" style="padding: 30px 20px; color: #ffffff;">
                <h1 style="margin: 0; font-size: 24px; font-weight: bold; margin-bottom: 5px;">CST Club - DPI</h1>
                <p style="margin: 0; font-size: 18px;">Verification Code</p>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td class="content-padding" style="padding: 30px 20px;">
                <!-- Greeting -->
                <p style="margin: 0 0 15px 0; color: #333333;">
                  Dear <span style="font-weight: 600;">${userName}</span>,
                </p>
                
                <!-- Main Message -->
                <p style="margin: 0 0 20px 0; color: #333333;">
                  Here is your verification code to complete your request:
                </p>
                
                <!-- OTP Code -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 25px 0;">
                  <tr>
                    <td align="center">
                      <div style="background-color: #eff6ff; border: 1px solid #dbeafe; border-radius: 6px; padding: 20px; max-width: 400px;">
                        <p class="otp-code" style="margin: 0; font-family: monospace; font-weight: bold; font-size: 32px; letter-spacing: 5px; text-align: center; padding: 15px; background-color: #ffffff; border: 1px solid #bfdbfe; border-radius: 4px; color: #1e40af;">${otpCode}</p>
                      </div>
                    </td>
                  </tr>
                </table>
                
                <!-- Instructions -->
                <p style="margin: 0 0 15px 0; color: #333333; text-align: center;">
                  This code will expire in <strong>${expiryMinutes} minutes</strong>.
                </p>
                
                <!-- Security Note -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 25px 0; background-color: #f9fafb; border-radius: 6px; border-left: 4px solid #f59e0b;">
                  <tr>
                    <td style="padding: 15px;">
                      <p style="margin: 0; color: #4b5563; font-size: 14px;">
                        <strong>Security Notice:</strong> If you didn't request this code, please ignore this email or contact our support team immediately.
                      </p>
                    </td>
                  </tr>
                </table>
                
                <!-- Signature -->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 25px; border-top: 1px solid #e5e7eb; padding-top: 20px;">
                  <tr>
                    <td>
                      <p style="margin: 0 0 5px 0; color: #333333;">Best regards,</p>
                      <p style="margin: 0; font-weight: 600; color: #333333;">The CST Club - DPI Team</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td align="center" bgcolor="#f9fafb" style="padding: 20px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0 0 10px 0; font-size: 14px; color: #6b7280;">
                  © ${new Date().getFullYear()} CST Club - DPI. All rights reserved.
                </p>
                <p style="margin: 0; font-size: 14px;">
                  <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
                  <a href="#" style="color: #2563eb; text-decoration: none; margin: 0 10px;">Contact Us</a>
                </p>
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
