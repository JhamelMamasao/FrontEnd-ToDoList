export function gettasks() {
    const tasks = [
    {
      title: "Refactor Front-End",
      description: "Organize components and improve overall code structure login issues affecting mobile users today",
      status: "IN_PROGRESS",
      priority: "HIGH",
      project: "Website Revamp",
      createdBy: "John Doe",
      assignedTo: "Jane Smith",
      date: "Apr 1, 2026"
    },
    {
      title: "Fix Login Bug",
      description: "Resolve login issues affecting mobile users today",
      status: "PENDING",
      priority: "HIGH",
      project: "Website Revamp",
      createdBy: "John Doe",
      assignedTo: "Mark Lee",
      date: "Apr 1, 2026"
    },
    {
      title: "Design Dashboard UI",
      description: "Create clean and modern dashboard layout design login issues affecting mobile users today",
      status: "IN_PROGRESS",
      priority: "MEDIUM",
      project: "Mobile App",
      createdBy: "Jane Smith",
      assignedTo: "Anna Cruz",
      date: "Apr 2, 2026"
    },
    {
      title: "Setup Auth API",
      description: "Implement secure authentication using JWT tokens properly",
      status: "DONE",
      priority: "HIGH",
      project: "API Development",
      createdBy: "Mark Lee",
      assignedTo: "John Doe",
      date: "Mar 30, 2026"
    },
    {
      title: "User Management",
      description: "Build user CRUD and role management features login issues affecting mobile users today",
      status: "PENDING",
      priority: "LOW",
      project: "Admin Panel",
      createdBy: "Anna Cruz",
      assignedTo: "Jane Smith",
      date: "Apr 2, 2026"
    }
  ];

const latestTask = [...tasks] 
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2)


    return latestTask;

}

