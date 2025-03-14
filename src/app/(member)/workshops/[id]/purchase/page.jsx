// "use client"

// import { useParams, useRouter } from "next/navigation"
// import { useWorkshop } from "@/context/workshop-context"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Calendar, CreditCard, CheckCircle } from "lucide-react"
// import { useState } from "react"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// export default function PurchasePage() {
//   const { id } = useParams()
//   const router = useRouter()
//   const { workshops, purchaseWorkshop, getParticipantByWorkshopId } = useWorkshop()

//   const [isProcessing, setIsProcessing] = useState(false)
//   const [isPurchased, setIsPurchased] = useState(false)

//   const workshop = workshops.find((w) => w.id === id)
//   const participant = getParticipantByWorkshopId(id)
//   const isEnrolled = !!participant

//   if (!workshop) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center">
//         <h1 className="text-2xl font-bold mb-4">Workshop not found</h1>
//         <p className="mb-8">The workshop you're looking for doesn't exist or has been removed.</p>
//         <Button asChild>
//           <a href="/">Back to Workshops</a>
//         </Button>
//       </div>
//     )
//   }

//   if (isEnrolled) {
//     return (
//       <div className="container mx-auto px-4 py-16 max-w-md">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Already Enrolled</CardTitle>
//             <CardDescription className="text-center">You're already enrolled in this workshop</CardDescription>
//           </CardHeader>
//           <CardContent className="text-center py-6">
//             <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
//             <h2 className="text-xl font-semibold mb-2">{workshop.name}</h2>
//             <p className="text-muted-foreground">
//               You enrolled on {new Date(participant.joinedDate).toLocaleDateString()}
//             </p>
//           </CardContent>
//           <CardFooter className="flex flex-col gap-2">
//             <Button className="w-full" onClick={() => router.push(`/workshops/${id}/player`)}>
//               Continue Learning
//             </Button>
//             <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard")}>
//               Go to Dashboard
//             </Button>
//           </CardFooter>
//         </Card>
//       </div>
//     )
//   }

//   const handlePurchase = () => {
//     setIsProcessing(true)

//     // Simulate payment processing
//     setTimeout(() => {
//       purchaseWorkshop(id)
//       setIsProcessing(false)
//       setIsPurchased(true)

//       // Redirect after successful purchase
//       setTimeout(() => {
//         router.push(`/workshops/${id}/player`)
//       }, 2000)
//     }, 1500)
//   }

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" }
//     return new Date(dateString).toLocaleDateString("en-US", options)
//   }

//   if (isPurchased) {
//     return (
//       <div className="container mx-auto px-4 py-16 max-w-md">
//         <Card>
//           <CardHeader>
//             <CardTitle className="text-center">Enrollment Successful!</CardTitle>
//             <CardDescription className="text-center">You've successfully enrolled in this workshop</CardDescription>
//           </CardHeader>
//           <CardContent className="text-center py-6">
//             <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
//             <h2 className="text-xl font-semibold mb-2">{workshop.name}</h2>
//             <p className="text-muted-foreground">Redirecting you to the workshop...</p>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Enrollment</h1>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <div>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Workshop Details</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <h2 className="text-xl font-semibold">{workshop.name}</h2>
//                   <div className="flex items-center gap-2 mt-1">
//                     <Badge variant={workshop.type === "ONLINE" ? "default" : "secondary"}>{workshop.type}</Badge>
//                   </div>
//                 </div>

//                 <p className="text-muted-foreground">{workshop.description}</p>

//                 <div className="flex items-center gap-2">
//                   <Calendar className="h-4 w-4 text-muted-foreground" />
//                   <span className="text-sm">
//                     {formatDate(workshop.startDate)} - {formatDate(workshop.endDate)}
//                   </span>
//                 </div>

//                 <div className="pt-4 border-t">
//                   <div className="flex justify-between items-center">
//                     <span className="font-medium">Workshop Fee</span>
//                     <span className="font-bold">$99.00</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           <div>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Payment Information</CardTitle>
//                 <CardDescription>Enter your payment details to complete enrollment</CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Name on Card</Label>
//                   <Input id="name" placeholder="John Doe" />
//                 </div>

//                 <div className="space-y-2">
//                   <Label htmlFor="card">Card Number</Label>
//                   <div className="relative">
//                     <Input id="card" placeholder="4242 4242 4242 4242" />
//                     <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="expiry">Expiry Date</Label>
//                     <Input id="expiry" placeholder="MM/YY" />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="cvc">CVC</Label>
//                     <Input id="cvc" placeholder="123" />
//                   </div>
//                 </div>
//               </CardContent>
//               <CardFooter>
//                 <Button className="w-full" onClick={handlePurchase} disabled={isProcessing}>
//                   {isProcessing ? "Processing..." : "Complete Enrollment - $99.00"}
//                 </Button>
//               </CardFooter>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

