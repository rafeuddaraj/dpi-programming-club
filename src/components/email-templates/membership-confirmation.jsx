import Signature from "./signature";

export default function MembershipConfirmationTemplate({
  userName = "New Member",
  secretCode = "CST12345",
}) {
  // Base styles that work across devices
  const baseStyles = {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    margin: "0",
    padding: "0",
    width: "100%",
    minWidth: "330px", // Set minimum width to 330px
    backgroundColor: "#f8fafc",
  };

  // Format current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <table
      cellPadding="0"
      cellSpacing="0"
      border="0"
      style={{
        ...baseStyles,
        maxWidth: "650px",
        margin: "0 auto",
        borderCollapse: "collapse",
      }}
    >
      <tbody>
        {/* Email Container */}
        <tr>
          <td
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            }}
          >
            <table cellPadding="0" cellSpacing="0" border="0" width="100%">
              <tbody>
                {/* Header with gradient */}
                <tr>
                  <td
                    style={{
                      background:
                        "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
                      padding: "20px 15px",
                      textAlign: "center",
                      color: "white",
                    }}
                  >
                    <h1
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        margin: "0",
                        letterSpacing: "0.5px",
                        textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      CST Club - DPI
                    </h1>
                    <div
                      style={{
                        width: "50px",
                        height: "3px",
                        background: "rgba(255, 255, 255, 0.7)",
                        margin: "10px auto",
                        borderRadius: "2px",
                      }}
                    ></div>
                    <p
                      style={{
                        fontSize: "16px",
                        margin: "0",
                        opacity: "0.9",
                      }}
                    >
                      Membership Confirmation
                    </p>
                  </td>
                </tr>

                {/* Main content */}
                <tr>
                  <td
                    style={{
                      padding: "25px 15px",
                      color: "#334155",
                      fontSize: "15px",
                      lineHeight: "1.6",
                      background:
                        "linear-gradient(to bottom, #f9fafc 0%, #ffffff 100%)",
                    }}
                  >
                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      border="0"
                      width="100%"
                    >
                      <tbody>
                        {/* Greeting */}
                        <tr>
                          <td style={{ paddingBottom: "15px" }}>
                            <p
                              style={{
                                fontSize: "16px",
                                margin: "0",
                              }}
                            >
                              Dear{" "}
                              <span
                                style={{
                                  fontWeight: "600",
                                  color: "#1e293b",
                                  borderBottom: "2px solid #4f46e5",
                                  paddingBottom: "2px",
                                }}
                              >
                                {userName}
                              </span>
                              ,
                            </p>
                          </td>
                        </tr>

                        {/* Welcome message */}
                        <tr>
                          <td style={{ paddingBottom: "15px" }}>
                            <p
                              style={{
                                fontSize: "16px",
                                fontWeight: "500",
                                color: "#1e293b",
                                margin: "0",
                              }}
                            >
                              Welcome and congratulations on becoming a member
                              of the{" "}
                              <span
                                style={{
                                  color: "#4f46e5",
                                  fontWeight: "600",
                                }}
                              >
                                CST Club - DPI
                              </span>
                              ! We're thrilled to have you join our community.
                            </p>
                          </td>
                        </tr>

                        {/* Benefits intro */}
                        <tr>
                          <td style={{ paddingBottom: "10px" }}>
                            <p style={{ margin: "0" }}>
                              As a member, you'll gain access to:
                            </p>
                          </td>
                        </tr>

                        {/* Benefits list */}
                        <tr>
                          <td style={{ paddingBottom: "20px" }}>
                            <table
                              cellPadding="0"
                              cellSpacing="0"
                              border="0"
                              width="100%"
                            >
                              <tbody>
                                {[
                                  "Exclusive workshops and technical sessions",
                                  "Networking opportunities with industry professionals",
                                  "Hands-on projects to enhance your skills",
                                  "Mentorship from senior members and alumni",
                                ].map((item, index) => (
                                  <tr key={index}>
                                    <td style={{ padding: "5px 0" }}>
                                      <table
                                        cellPadding="0"
                                        cellSpacing="0"
                                        border="0"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              style={{
                                                verticalAlign: "top",
                                                paddingRight: "8px",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  width: "16px",
                                                  height: "16px",
                                                  backgroundColor: "#4f46e5",
                                                  borderRadius: "50%",
                                                  textAlign: "center",
                                                  lineHeight: "16px",
                                                  fontSize: "9px",
                                                  color: "white",
                                                  fontWeight: "bold",
                                                }}
                                              >
                                                ✓
                                              </div>
                                            </td>
                                            <td style={{ fontSize: "14px" }}>
                                              {item}
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>

                        {/* Membership code card */}
                        <tr>
                          <td style={{ paddingBottom: "20px" }}>
                            <table
                              cellPadding="0"
                              cellSpacing="0"
                              border="0"
                              width="100%"
                              style={{
                                background:
                                  "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
                                borderRadius: "10px",
                                border: "1px solid #e2e8f0",
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td style={{ padding: "15px" }}>
                                    <table
                                      cellPadding="0"
                                      cellSpacing="0"
                                      border="0"
                                      width="100%"
                                    >
                                      <tbody>
                                        <tr>
                                          <td style={{ paddingBottom: "12px" }}>
                                            <table
                                              cellPadding="0"
                                              cellSpacing="0"
                                              border="0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style={{
                                                      verticalAlign: "middle",
                                                      paddingRight: "8px",
                                                    }}
                                                  >
                                                    <div
                                                      style={{
                                                        width: "20px",
                                                        height: "20px",
                                                        backgroundColor:
                                                          "#4f46e5",
                                                        borderRadius: "50%",
                                                        textAlign: "center",
                                                        lineHeight: "20px",
                                                        color: "white",
                                                        fontSize: "12px",
                                                        fontWeight: "bold",
                                                      }}
                                                    >
                                                      🔑
                                                    </div>
                                                  </td>
                                                  <td
                                                    style={{
                                                      fontWeight: "600",
                                                      fontSize: "15px",
                                                      color: "#1e293b",
                                                    }}
                                                  >
                                                    Your Membership Details
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <table
                                              cellPadding="0"
                                              cellSpacing="0"
                                              border="0"
                                              width="100%"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td
                                                    style={{
                                                      fontWeight: "500",
                                                      paddingBottom: "8px",
                                                      fontSize: "14px",
                                                    }}
                                                  >
                                                    Membership Secret Code:
                                                  </td>
                                                </tr>
                                                <tr>
                                                  <td>
                                                    <div
                                                      style={{
                                                        background:
                                                          "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
                                                        color: "white",
                                                        padding: "8px 12px",
                                                        borderRadius: "6px",
                                                        fontFamily: "monospace",
                                                        fontWeight: "600",
                                                        letterSpacing: "0.5px",
                                                        fontSize: "14px",
                                                        display: "inline-block",
                                                        wordBreak: "break-all",
                                                      }}
                                                    >
                                                      {secretCode}
                                                    </div>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>

                        {/* CTA text */}
                        <tr>
                          <td style={{ paddingBottom: "15px" }}>
                            <p style={{ margin: "0", fontSize: "14px" }}>
                              To complete your membership setup, please create
                              your profile by clicking the button below:
                            </p>
                          </td>
                        </tr>

                        {/* CTA Button */}
                        <tr>
                          <td
                            style={{
                              textAlign: "center",
                              paddingBottom: "20px",
                              paddingTop: "5px",
                            }}
                          >
                            <table
                              cellPadding="0"
                              cellSpacing="0"
                              border="0"
                              style={{
                                margin: "0 auto",
                                width: "100%",
                                maxWidth: "280px",
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      background:
                                        "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
                                      borderRadius: "6px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <a
                                      href="https://cst-club-dpi.vercel.app/auth/register"
                                      style={{
                                        color: "#ffffff",
                                        padding: "12px 20px",
                                        textDecoration: "none",
                                        fontWeight: "600",
                                        display: "block",
                                        fontSize: "14px",
                                        letterSpacing: "0.5px",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      Create Your Profile
                                    </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>

                        {/* Additional text */}
                        <tr>
                          <td style={{ paddingBottom: "12px" }}>
                            <p style={{ margin: "0", fontSize: "14px" }}>
                              If you have any questions or need assistance,
                              don't hesitate to reply to this email or contact
                              our support team.
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td style={{ paddingBottom: "12px" }}>
                            <p style={{ margin: "0", fontSize: "14px" }}>
                              We look forward to seeing you at our upcoming
                              events!
                            </p>
                          </td>
                        </tr>

                        <tr>
                          <td style={{ paddingBottom: "5px" }}>
                            <p style={{ margin: "0", fontSize: "14px" }}>
                              Best regards,
                            </p>
                          </td>
                        </tr>

                        <Signature />
                      </tbody>
                    </table>
                  </td>
                </tr>

                {/* Footer */}
                <tr>
                  <td
                    style={{
                      padding: "20px 15px",
                      textAlign: "center",
                      fontSize: "12px",
                      color: "#94a3b8",
                      backgroundColor: "#f8fafc",
                      borderTop: "1px solid #e2e8f0",
                    }}
                  >
                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      border="0"
                      width="100%"
                    >
                      <tbody>
                        {/* Social links */}
                        <tr>
                          <td style={{ paddingBottom: "12px" }}>
                            <table
                              cellPadding="0"
                              cellSpacing="0"
                              border="0"
                              width="100%"
                            >
                              <tbody>
                                <tr>
                                  {[
                                    "Facebook",
                                    "Twitter",
                                    "Instagram",
                                    "LinkedIn",
                                  ].map((social, index) => (
                                    <td
                                      key={index}
                                      style={{
                                        padding: "0 3px",
                                        width: "25%",
                                        textAlign: "center",
                                      }}
                                    >
                                      <a
                                        href="#"
                                        style={{
                                          color: "#64748b",
                                          textDecoration: "none",
                                          fontWeight: "500",
                                          fontSize: "11px",
                                        }}
                                      >
                                        {social}
                                      </a>
                                    </td>
                                  ))}
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>

                        {/* Copyright */}
                        <tr>
                          <td style={{ paddingBottom: "5px" }}>
                            <p style={{ margin: "0", fontSize: "11px" }}>
                              © {new Date().getFullYear()} CST Club - DPI. All
                              rights reserved.
                            </p>
                          </td>
                        </tr>

                        {/* Disclaimer */}
                        <tr>
                          <td>
                            <p style={{ margin: "0", fontSize: "11px" }}>
                              This email was sent to you because you registered
                              as a member of CST Club - DPI.
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
