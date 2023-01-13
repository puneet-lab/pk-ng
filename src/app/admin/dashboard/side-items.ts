import { IAdminSideNavItems } from "src/models";

export const dashboardSideNavItems: IAdminSideNavItems[] = [
  {
    id: 1,
    title: "Landing Page",
    route: "landing",
    showSubItems: true,
    subItems: [
      {
        id: 1,
        title: "Experience",
        route: "experience",
      },
      {
        id: 2,
        title: "Education",
        route: "education",
      },
      {
        id: 3,
        title: "Skills",
        route: "skills",
      },
    ],
  },
  {
    id: 2,
    title: "Contact",
    route: "admin/dashboard/contact",
  },
];
