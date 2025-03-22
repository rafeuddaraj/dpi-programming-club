export default function Signature() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <tr>
      <td
        style={{
          paddingTop: "20px",
          borderTop: "1px dashed #e2e8f0",
        }}
      >
        <table cellPadding="0" cellSpacing="0" border="0" width="100%">
          <tbody>
            {/* First signature - President */}
            <tr>
              <td style={{ paddingBottom: "20px" }}>
                <table cellPadding="0" cellSpacing="0" border="0">
                  <tbody>
                    <tr>
                      <td
                        style={{
                          verticalAlign: "top",
                          paddingRight: "10px",
                        }}
                      >
                        {/* President signature placeholder */}
                        <div
                          style={{
                            width: "120px",
                            height: "50px",
                            backgroundImage: `url("https://cst-club-dpi.vercel.app/rafe-uddaraj-signature.svg")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "90%",
                            backgroundSize: "contain",
                          }}
                        ></div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingTop: "5px" }}>
                        <p
                          style={{
                            margin: "0",
                            fontSize: "16px",
                            color: "#1e293b",
                            fontWeight: "600",
                            lineHeight: "1.2",
                            textAlign: "right",
                          }}
                        >
                          Rafe Uddaraj
                        </p>
                        <p
                          style={{
                            margin: "3px 0 0",
                            fontSize: "13px",
                            color: "#64748b",
                            fontWeight: "500",
                            textAlign: "right",
                          }}
                        >
                          President
                        </p>
                        <p
                          style={{
                            margin: "3px 0 0",
                            fontSize: "13px",
                            color: "#64748b",
                            fontWeight: "500",
                            textAlign: "right",
                          }}
                        >
                          CST Club - DPI
                        </p>
                        <p
                          style={{
                            margin: "5px 0 0",
                            fontSize: "12px",
                            color: "#94a3b8",
                            fontStyle: "italic",
                            textAlign: "right",
                          }}
                        >
                          {currentDate}
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>

            {/* Second signature - Executive Administrator */}
            <tr>
              <td>
                <table cellPadding="0" cellSpacing="0" border="0">
                  <tbody>
                    <tr>
                      <td
                        style={{
                          verticalAlign: "top",
                          paddingRight: "10px",
                        }}
                      >
                        {/* Executive Administrator signature placeholder */}
                        <div
                          style={{
                            width: "120px",
                            height: "50px",
                            backgroundImage: `url("https://cst-club-dpi.vercel.app/executive-administrator.svg")`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            backgroundPosition: "90%",
                          }}
                        ></div>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ paddingTop: "5px" }}>
                        <p
                          style={{
                            margin: "0",
                            fontSize: "16px",
                            color: "#1e293b",
                            fontWeight: "600",
                            lineHeight: "1.2",
                            textAlign: "right",
                          }}
                        >
                          Jarin Shovah Raisa
                        </p>
                        <p
                          style={{
                            margin: "3px 0 0",
                            fontSize: "13px",
                            color: "#64748b",
                            fontWeight: "500",
                            textAlign: "right",
                          }}
                        >
                          Executive Administrator
                        </p>
                        <p
                          style={{
                            margin: "3px 0 0",
                            fontSize: "13px",
                            color: "#64748b",
                            fontWeight: "500",
                            textAlign: "right",
                          }}
                        >
                          CST Club - DPI
                        </p>
                        <p
                          style={{
                            margin: "5px 0 0",
                            fontSize: "12px",
                            color: "#94a3b8",
                            fontStyle: "italic",
                            textAlign: "right",
                          }}
                        >
                          {currentDate}
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
  );
}
