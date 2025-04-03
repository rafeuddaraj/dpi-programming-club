import { getSingleResult } from "@/app/actions/bteb-result";
import { ImageResponse } from "next/og";

export async function GET(request, { params: param }) {
  try {
    const params = await param;
    const roll = params.roll;

    // In a real application, you would fetch the actual result data here
    // For this demo, we'll use mock data
    const res = await getSingleResult({ roll });
    if (res?.error) {
      return new ImageResponse(<div>Not Found</div>);
    }
    const result = res?.data;

    // Calculate average GPA
    const validGpas = Object.values(result.cgps).filter((gpa) => gpa !== null);
    const averageGpa =
      validGpas.length > 0
        ? (
            validGpas.reduce((sum, gpa) => sum + gpa, 0) / validGpas.length
          ).toFixed(2)
        : "N/A";

    // Load the Inter font
    const interRegular = await fetch(
      new URL(
        "https://fonts.googleapis.com/css2?family=Inter&display=swap",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer());

    const interBold = await fetch(
      new URL(
        "https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap",
        import.meta.url
      )
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(to bottom, #f8fafc, #f1f5f9)",
            padding: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "32px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "90%",
              maxWidth: "800px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              {result.avatar && (
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid #e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <img
                    src={result.avatar || "/placeholder.svg"}
                    alt={result.name || "Student"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
              <div>
                <h1
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#0f172a",
                    marginBottom: "8px",
                  }}
                >
                  BTEB Result
                </h1>
                <h2
                  style={{
                    fontSize: "24px",
                    color: "#334155",
                    marginBottom: "8px",
                  }}
                >
                  {result.institute}
                </h2>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#f1f5f9",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#64748b",
                }}
              >
                {result.exam}
              </div>
              <div
                style={{
                  backgroundColor: "#f1f5f9",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#64748b",
                }}
              >
                Regulation: {result.regulation}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "32px",
                marginBottom: "24px",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#64748b",
                    marginBottom: "4px",
                  }}
                >
                  Roll Number
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#0f172a",
                  }}
                >
                  {result.roll}
                </p>
              </div>
              {result.name && (
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#64748b",
                      marginBottom: "4px",
                    }}
                  >
                    Student Name
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#0f172a",
                    }}
                  >
                    {result.name}
                  </p>
                </div>
              )}
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#64748b",
                    marginBottom: "4px",
                  }}
                >
                  Average GPA
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#0f172a",
                  }}
                >
                  {averageGpa}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
                marginTop: "16px",
                marginBottom: "24px",
              }}
            >
              {Object.entries(result.cgps)
                .filter(([_, value]) => value !== null)
                .map(([key, value], index) => {
                  const semesterNumber = key.replace("gpa", "");
                  const gpa = value;

                  // Determine color based on GPA
                  let color = "#ef4444"; // red
                  let bgColor = "#fef2f2"; // light red bg

                  if (gpa >= 3.5) {
                    color = "#16a34a"; // green
                    bgColor = "#f0fdf4"; // light green bg
                  } else if (gpa >= 2.5) {
                    color = "#d97706"; // amber
                    bgColor = "#fffbeb"; // light amber bg
                  }

                  return (
                    <div
                      key={index}
                      style={{
                        backgroundColor: bgColor,
                        borderRadius: "8px",
                        padding: "16px",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#0f172a",
                          marginBottom: "8px",
                        }}
                      >
                        {semesterNumber}
                        {getSuffix(semesterNumber)} Semester
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: "14px", color: "#64748b" }}>
                          GPA
                        </span>
                        <span
                          style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: color,
                          }}
                        >
                          {gpa.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: "16px",
                padding: "16px",
                backgroundColor: "#f8fafc",
                borderRadius: "8px",
              }}
            >
              <p style={{ fontSize: "14px", color: "#64748b" }}>
                BTEB Result Checker
              </p>
              <p style={{ fontSize: "14px", color: "#64748b" }}>
                Generated on {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interRegular,
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: interBold,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (e) {
    console.log(`${e}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

function getSuffix(num) {
  const n = Number.parseInt(num, 10);
  if (n === 1) return "st";
  if (n === 2) return "nd";
  if (n === 3) return "rd";
  return "th";
}
