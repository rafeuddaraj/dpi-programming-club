// Mock data based on the provided schema
export const mockElections = [
  {
    id: "1",
    name: "Annual Student Body Election 2023-2024",
    startingDate: "2023-06-15",
    endingDate: "2024-06-14",
    pin: true, // This is the featured/pinned election
    members: [
      {
        id: "m1",
        userId: "u1",
        role: {
          value: 1,
          name: "President",
        },
        user: {
          avatar: "/placeholder.svg?height=100&width=100&text=AJ",
          bio: "Passionate about technology and leadership. Working to create more opportunities for students in tech.",
          about:
            "Computer Science enthusiast with a focus on AI and machine learning.",
          linkedin: "linkedin.com/in/alexjohnson",
          github: "github.com/alexjohnson",
          discord: "alexj#1234",
          skills: [
            { skill: "Leadership" },
            { skill: "Public Speaking" },
            { skill: "Strategic Planning" },
            { skill: "Team Building" },
            { skill: "Decision Making" },
            { skill: "Problem Solving" },
          ],
          registeredUser: {
            name: "Alex Johnson",
            email: "alex.johnson@example.com",
            rollNo: "CS-2019-001",
            registrationNo: "2019-CS-001",
            phoneNumber: "+1234567890",
            session: "2019-2023",
            gender: "MALE",
            shift: "Morning",
            semester: "8",
            department: "Computer Science",
          },
        },
      },
      {
        id: "m2",
        userId: "u2",
        role: {
          value: 2,
          name: "Vice President",
        },
        user: {
          avatar: "/placeholder.svg?height=100&width=100&text=SW",
          bio: "Dedicated to improving student experiences and creating inclusive environments.",
          linkedin: "linkedin.com/in/sarahwilliams",
          skills: [
            { skill: "Team Management" },
            { skill: "Event Planning" },
            { skill: "Finance" },
            { skill: "Communication" },
          ],
          registeredUser: {
            name: "Sarah Williams",
            email: "sarah.williams@example.com",
            rollNo: "CS-2019-045",
            registrationNo: "2019-CS-045",
            phoneNumber: "+1234567891",
            session: "2019-2023",
            gender: "FEMALE",
            shift: "Day",
            semester: "8",
            department: "Computer Science",
          },
        },
      },
      {
        id: "m3",
        userId: "u3",
        role: {
          value: 3,
          name: "General Secretary",
        },
        user: {
          avatar: "/placeholder.svg?height=100&width=100&text=MC",
          bio: "Detail-oriented and organized. Committed to maintaining clear communication between students and faculty.",
          github: "github.com/michaelchen",
          skills: [
            { skill: "Documentation" },
            { skill: "Communication" },
            { skill: "Organization" },
            { skill: "Time Management" },
            { skill: "Meeting Coordination" },
            { skill: "Record Keeping" },
            { skill: "Email Management" },
            { skill: "Report Writing" },
            { skill: "Scheduling" },
            { skill: "Administrative Support" },
          ],
          registeredUser: {
            name: "Michael Chen",
            email: "michael.chen@example.com",
            rollNo: "EE-2020-189",
            registrationNo: "2020-EE-189",
            phoneNumber: "+1234567892",
            session: "2020-2024",
            gender: "MALE",
            shift: "Morning",
            semester: "6",
            department: "Electrical Engineering",
          },
        },
      },
      {
        id: "m4",
        userId: "u4",
        role: {
          value: 7,
          name: "Finance Manager",
        },
        user: {
          avatar: "/placeholder.svg?height=100&width=100&text=ER",
          bio: "Experienced in financial management and budgeting. Ensuring responsible allocation of club resources.",
          skills: [
            { skill: "Accounting" },
            { skill: "Budgeting" },
            { skill: "Financial Analysis" },
            { skill: "Expense Tracking" },
          ],
          registeredUser: {
            name: "Emily Rodriguez",
            email: "emily.rodriguez@example.com",
            rollNo: "BA-2019-076",
            registrationNo: "2019-BA-076",
            phoneNumber: "+1234567893",
            session: "2019-2023",
            gender: "FEMALE",
            shift: "Day",
            semester: "8",
            department: "Business Administration",
          },
        },
      },
      {
        id: "m5",
        userId: "u5",
        role: {
          value: 9,
          name: "Technical Head",
        },
        user: {
          avatar: "/placeholder.svg?height=100&width=100&text=DK",
          bio: "Passionate about web development and new technologies. Leading technical initiatives for the club.",
          github: "github.com/davidkim",
          linkedin: "linkedin.com/in/davidkim",
          skills: [
            { skill: "Web Development" },
            { skill: "System Architecture" },
            { skill: "UI/UX Design" },
            { skill: "Database Management" },
            { skill: "Cloud Computing" },
            { skill: "Mobile App Development" },
            { skill: "API Integration" },
            { skill: "DevOps" },
            { skill: "Version Control" },
            { skill: "Agile Methodologies" },
            { skill: "Technical Documentation" },
            { skill: "Problem Solving" },
            { skill: "Code Review" },
            { skill: "Testing" },
            { skill: "Debugging" },
          ],
          registeredUser: {
            name: "David Kim",
            email: "david.kim@example.com",
            rollNo: "CE-2020-256",
            registrationNo: "2020-CE-256",
            phoneNumber: "+1234567894",
            session: "2020-2024",
            gender: "MALE",
            shift: "Morning",
            semester: "6",
            department: "Civil Engineering",
          },
        },
      },
    ],
  },
  {
    id: "2",
    name: "Annual Student Body Election 2022-2023",
    startingDate: "2022-06-15",
    endingDate: "2023-06-14",
    pin: false,
    members: [
      {
        id: "m6",
        userId: "u6",
        role: {
          value: 1,
          name: "President",
        },
        user: {
          avatar: "/placeholder.svg?height=100&width=100&text=JW",
          registeredUser: {
            name: "James Wilson",
            gender: "MALE",
          },
        },
      },
      {
        id: "m7",
        userId: "u7",
        role: {
          value: 2,
          name: "Vice President",
        },
        user: {
          avatar: "/placeholder.svg?height=100&width=100&text=LT",
          registeredUser: {
            name: "Lisa Thompson",
            gender: "FEMALE",
          },
        },
      },
      {
        id: "m8",
        userId: "u8",
        role: {
          value: 3,
          name: "General Secretary",
        },
        user: {
          avatar: "/placeholder.svg?height=100&width=100&text=RB",
          registeredUser: {
            name: "Robert Brown",
            gender: "MALE",
          },
        },
      },
    ],
  },
  {
    id: "3",
    name: "Annual Student Body Election 2021-2022",
    startingDate: "2021-06-15",
    endingDate: "2022-06-14",
    pin: false,
    members: [
      {
        id: "m9",
        userId: "u9",
        role: {
          value: 1,
          name: "President",
        },
        user: {
          avatar: "/placeholder.svg?height=100&width=100&text=KL",
          registeredUser: {
            name: "Kevin Lee",
            gender: "MALE",
          },
        },
      },
      {
        id: "m10",
        userId: "u10",
        role: {
          value: 2,
          name: "Vice President",
        },
        user: {
          avatar: "/placeholder.svg?height=100&width=100&text=JD",
          registeredUser: {
            name: "Jennifer Davis",
            gender: "FEMALE",
          },
        },
      },
      {
        id: "m11",
        userId: "u11",
        role: {
          value: 3,
          name: "General Secretary",
        },
        user: {
          avatar: "/placeholder.svg?height=100&width=100&text=TM",
          registeredUser: {
            name: "Thomas Miller",
            gender: "MALE",
          },
        },
      },
    ],
  },
];
