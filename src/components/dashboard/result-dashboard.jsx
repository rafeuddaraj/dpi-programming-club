// "use client";

// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { parseStudentData } from "@/lib/bteb-result";
// import { AlertCircle, Check } from "lucide-react";
// import { useState } from "react";

// export default function ResultDashboard() {
//   const [textInput, setTextInput] = useState("");
//   const [jsonData, setJsonData] = useState("");
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [isPublishing, setIsPublishing] = useState(false);
//   const [message, setMessage] = useState({ type: "", text: "" });

//   const processText = async () => {
//     if (!textInput.trim()) {
//       setMessage({ type: "error", text: "Please enter text data to process." });
//       return;
//     }

//     setIsProcessing(true);
//     setMessage({ type: "", text: "" });

//     try {
//       const resultData = parseStudentData(textInput.trim());

//       // If no data was extracted, provide sample data
//       if (Object.keys(resultData).length === 0) {
//         // Sample data as fallback
//         const mockData = {
//           658836: {
//             gpa6: 3.45,
//             gpa5: 3.08,
//             gpa4: 3.0,
//             gpa3: 2.87,
//             gpa2: 3.29,
//             gpa1: 3.45,
//           },
//           658839: {
//             gpa6: 3.51,
//             gpa5: 2.93,
//             gpa4: 3.18,
//             gpa3: 3.12,
//             gpa2: 3.18,
//             gpa1: 3.4,
//           },
//           658842: {
//             gpa6: 3.22,
//             gpa5: 3.15,
//             gpa4: 2.95,
//             gpa3: 3.05,
//             gpa2: 3.33,
//             gpa1: 3.28,
//           },
//         };
//         setJsonData(JSON.stringify(mockData, null, 2));
//         setMessage({
//           type: "info",
//           text: "Could not extract structured data from the input. Showing sample data format instead. You can edit this JSON directly.",
//         });
//       } else {
//         setJsonData(JSON.stringify(resultData, null, 2));
//         setMessage({
//           type: "success",
//           text: `Successfully extracted data for ${
//             Object.keys(resultData).length
//           } students. Review the JSON data below.`,
//         });
//       }
//     } catch (error) {
//       setMessage({
//         type: "error",
//         text: "Error processing text data. Please try again.",
//       });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   const publishData = async () => {
//     if (!jsonData) {
//       setMessage({
//         type: "error",
//         text: "No data to publish. Please process text data first.",
//       });
//       return;
//     }

//     setIsPublishing(true);
//     setMessage({ type: "", text: "" });

//     try {
//       // Parse the JSON data
//       const data = JSON.parse(jsonData);

//       // Save to database
//       // await saveResultsToDatabase(data);

//       setMessage({
//         type: "success",
//         text: "Data published successfully to the database.",
//       });
//       // Clear the form after successful publish
//       setTextInput("");
//       setJsonData("");
//     } catch (error) {
//       setMessage({
//         type: "error",
//         text:
//           error instanceof SyntaxError
//             ? "Invalid JSON format. Please check the data."
//             : "Error publishing data. Please try again.",
//       });
//     } finally {
//       setIsPublishing(false);
//     }
//   };

//   return (
//     <div className="grid gap-6">
//       <Card>
//         <CardHeader>
//           <CardTitle>Enter Result Data</CardTitle>
//           <CardDescription>
//             Paste or type student result data for processing.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-4">
//             <Textarea
//               placeholder="Enter student result data here..."
//               className="min-h-[200px] font-mono"
//               value={textInput}
//               onChange={(e) => setTextInput(e.target.value)}
//             />
//             <div className="text-sm text-muted-foreground">
//               <p>Example format:</p>
//               <pre className="bg-muted p-2 rounded-md mt-1 overflow-x-auto">
//                 {`658836
// Semester 1: 3.45
// Semester 2: 3.29
// Semester 3: 2.87
// Semester 4: 3.00
// Semester 5: 3.08
// Semester 6: 3.45

// 658839
// Semester 1: 3.40
// Semester 2: 3.18
// ...`}
//               </pre>
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button
//             onClick={processText}
//             disabled={isProcessing || !textInput.trim()}
//           >
//             {isProcessing ? "Processing..." : "Process Data"}
//           </Button>
//         </CardFooter>
//       </Card>

//       {message.text && (
//         <Alert variant={message.type === "error" ? "destructive" : "default"}>
//           {message.type === "error" ? (
//             <AlertCircle className="h-4 w-4" />
//           ) : (
//             <Check className="h-4 w-4" />
//           )}
//           <AlertTitle>
//             {message.type === "error"
//               ? "Error"
//               : message.type === "info"
//               ? "Information"
//               : "Success"}
//           </AlertTitle>
//           <AlertDescription>{message.text}</AlertDescription>
//         </Alert>
//       )}

//       {jsonData && (
//         <Card>
//           <CardHeader>
//             <CardTitle>JSON Preview</CardTitle>
//             <CardDescription>
//               Review and edit the extracted data before publishing to the
//               database.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Textarea
//               value={jsonData}
//               onChange={(e) => setJsonData(e.target.value)}
//               className="font-mono h-96 resize-none"
//             />
//           </CardContent>
//           <CardFooter>
//             <Button onClick={publishData} disabled={isPublishing}>
//               {isPublishing ? "Publishing..." : "Publish to Database"}
//             </Button>
//           </CardFooter>
//         </Card>
//       )}
//     </div>
//   );
// }
