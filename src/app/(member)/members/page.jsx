import { totalMemberCount } from "@/app/actions/users";
import { MotionDiv } from "@/components/common/motion";
import MemberList from "@/components/members/member-list";
import SearchAction from "@/components/notice/search";
import PageHeader from "./page-header";

// Mock data for members
const members = [
  {
    id: 1,
    name: "John Doe",
    role: "President",
    department: "Computer Science",
    year: "4th",
    image: "/placeholder.svg?height=100&width=100",
    skills: ["React", "Node.js", "Python"],
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Vice President",
    department: "Software Engineering",
    year: "3rd",
    image: "/placeholder.svg?height=100&width=100",
    skills: ["Java", "C++", "Machine Learning"],
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Secretary",
    department: "Information Technology",
    year: "2nd",
    image: "/placeholder.svg?height=100&width=100",
    skills: ["UI/UX Design", "JavaScript", "PHP"],
  },
  // Add more members as needed
];

export default async function MembersPage({ searchParams: searchParam }) {
  const searchParams = await searchParam;
  const query = searchParams?.q;
  const totalMembers = await totalMemberCount();

  return (
    <div className="container mx-auto py-8">
      <PageHeader
        title="Our Vibrant Club Members"
        description="Meet the passionate and diverse individuals who make our club truly special. From dedicated learners to inspiring leaders, every member brings unique energy and enthusiasm to our community."
        memberCount={totalMembers}
        foundingYear={2025}
      />
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SearchAction
          placeholder="Search members by name, roll...."
          className={"w-full"}
        />
        <div className="space-y-16 mt-5">
          <MemberList members={members} query={query} />
        </div>
      </MotionDiv>
    </div>
  );
}
