export default function GetDepartmentList(department) {
  const list = {
    cst: "Computer Science And Technology",
  };
  return list[department] ?? "Unknown";
}
