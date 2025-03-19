"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Save } from "lucide-react"
import { useState } from "react"
import FeedbackPreview from "../common/feedback-preview"

export default function MarkingSystem({ totalMark = 100 }) {
    // Requirements data with toggle state
    const [requirements, setRequirements] = useState([
        {
            id: 1,
            text: "হোম পেজে অর্থাৎ index.html পেজের প্রোপার্টির কার্ড থাকবে, ডেটাবেজ থেকে নিয়ে এসে দেখাতে হবে, এই পেজ সাইটর সাইড এ রেন্ডার হয়ে আসবে ।",
            isCompleted: true,
        },
        {
            id: 2,
            text: "হোম পেজে এক সাথে সর্বোচ্চ ৮ টি কার্ড লোড হবে, ডেটাবেজে ৮ এর বেশি প্রোপার্টি থাকলে পেজিনেশন করে দেখাবে ।",
            isCompleted: false,
        },
        {
            id: 3,
            text: "হোম পেজের প্রোপার্টির কার্ডে এ প্রোপার্টির নাম, ঠিকানা, প্রতিরাতে খরচ, কত থেকে কম টাকা আছে, প্রোপার্টির ছবি, এবং এভারেজ রেটিং দেখাতে হবে ।",
            isCompleted: true,
        },
        {
            id: 4,
            text: "প্রোপার্টি কার্ডে ক্লিক করলে, সেই প্রোপার্টির ডিটেইলস পেজে নিয়ে যেতে হবে ।",
            isCompleted: true,
        },
        {
            id: 5,
            text: "প্রোপার্টির ডিটেইলস পেজে প্রোপার্টির নাম, প্রোপার্টিটি কে তৈরি করেছে, এভারেজ রেটিং, কতগুলো রেটিং/রিভিউ রয়েছে তার সংখ্যা, প্রোপার্টির ঠিকানা, ৫ টি ছবি সহ যেন কিছু তথ্য থাকে।",
            isCompleted: true,
        },
    ])

    const totalMarksPerRequirement = totalMark / requirements.length


    const [marks, setMarks] = useState({
        mark: 0,
        crossMark: 0, // by requirement
        rightMark: 0, // by requirement
        avgMark: requirements?.reduce((acc, curr) => acc + (curr.isCompleted ? totalMarksPerRequirement : 0), 0) / requirements.length
    })

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [comment, setComment] = useState("")

    // Toggle requirement completion status
    const toggleRequirement = (id) => {
        setRequirements(requirements.map((req) => {
            if (req?.id === id) {
                if (req.isCompleted) {
                    setMarks(prev => {
                        if (prev?.mark - totalMarksPerRequirement <= 0) return { ...prev, mark: 0 }
                        else {
                            return {
                                ...prev, mark: prev.mark + totalMarksPerRequirement
                            }
                        }
                    })
                } else {
                    setMarks({ ...marks, mark: marks.mark - totalMarksPerRequirement })

                }
                return { ...req, isCompleted: !req.isCompleted }
            }
            return req
        }))
    }

    const handleSubmit = () => {
        setIsSubmitted(true)
        // Here you would typically send the data to your backend
        alert("Marks submitted successfully!")
    }

    const generateMarkdown = () => {
        return requirements.map((item, index) => {
            // Ensuring no breaks or additional characters inside the table columns
            return `| ${index + 1}️⃣ | ${item.text} | ${item.isCompleted ? '✅ সঠিক' : '❌ অনুপস্থিত'} |`;
        }).join('\n');
    }

    const markdownText = `# 📝 এসাইনমেন্টের রিকোয়ারমেন্ট অনুযায়ী আপনার সাবমিশনের ফলাফল  

## ✅ নিরীক্ষণ | কি করা হয়েছে  

| 🔢 ক্রম | 📌 কাজের বিবরণ | 📊 স্ট্যাটাস |
|------|----------------------|----------|
${generateMarkdown()}
---

## 💻 কোড কোয়ালিটি এবং রিভিউবিলিটি  
---

## 🛠️ সমাধানযোগ্য মতামত  
`;

    return (
        <div className="min-h-screen ">
            <div className="flex flex-col md:flex-row">
                {/* Left Sidebar - Requirements with Toggle */}
                <div className="w-full md:w-1/3 p-4 border-r border-gray-800">
                    <h2 className="text-xl font-bold mb-4">রিকোয়ারমেন্ট</h2>
                    <div className="space-y-6">
                        {requirements.map((req) => (
                            <div key={req.id} className="border border-gray-700 rounded-md p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-medium">Requirement {req.id}</span>
                                    <Switch
                                        checked={req.isCompleted}
                                        onCheckedChange={() => toggleRequirement(req.id)}
                                        className={req.isCompleted ? "bg-green-600" : "bg-red-600"}
                                    />
                                </div>
                                <p className="text-sm text-gray-300">{req.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Middle - Requirements Preview */}
                <div className="w-full md:w-1/3 p-4 border-r border-gray-800">
                    <h2 className="text-xl font-bold mb-4">এসাইনমেন্টের রিকুয়ারমেন্ট অনুযায়ী ফলাফল</h2>

                    <FeedbackPreview markdownText={markdownText} />
                </div>

                {/* Right Sidebar - Marks and Metadata */}
                <div className="w-full md:w-1/3 p-4">
                    <h2 className="text-xl font-bold mb-4">Mark</h2>

                    <div className="space-y-6">
                        <div className="border border-gray-700 rounded-md p-4">
                            <h3 className="text-lg mb-3">Marking</h3>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Requirement</label>
                                    <Input
                                        type="number"
                                        value={marks.mark}
                                        onChange={(e) => setMarks({ ...marks, mark: Number(e.target.value) })}
                                        className="bg-gray-800 border-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Right Mark</label>
                                    <Input
                                        type="number"
                                        value={marks.rightMark}
                                        onChange={(e) => setMarks({ ...marks, rightMark: Number(e.target.value) })}
                                        className="bg-gray-800 border-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Cross Mark</label>
                                    <Input
                                        type="number"
                                        value={marks.crossMark}
                                        onChange={(e) => setMarks({ ...marks, crossMark: Number(e.target.value) })}
                                        className="bg-gray-800 border-gray-700"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Avg Mark</label>
                                    <Input
                                        type="number"
                                        value={marks.avgMark}
                                        onChange={(e) => setMarks({ ...marks, avgMark: Number(e.target.value) })}
                                        className="bg-gray-800 border-gray-700 font-bold"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border border-gray-700 rounded-md p-4">
                            <h3 className="text-lg mb-3">কোড কুয়ালিটি এবং রিজেবিলিটি</h3>
                            <div className="flex gap-2 mb-4">
                                <Button className="rounded-full bg-green-900 hover:bg-green-800 text-white h-8 w-8 p-0">A+</Button>
                                <Button className="rounded-full bg-blue-900 hover:bg-blue-800 text-white h-8 w-8 p-0">A</Button>
                                <Button className="rounded-full bg-amber-900 hover:bg-amber-800 text-white h-8 w-8 p-0">A-</Button>
                                <Button className="rounded-full bg-red-900 hover:bg-red-800 text-white h-8 w-8 p-0">F</Button>
                            </div>
                        </div>

                        <div className="border border-gray-700 rounded-md p-4">
                            <h3 className="text-lg mb-3">Feedback</h3>
                            <textarea
                                placeholder="Your comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 h-24 mb-4"
                            />

                            <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitted}>
                                <Save className="h-4 w-4 mr-2" />
                                {isSubmitted ? "Submitted" : "Submit Marks"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

