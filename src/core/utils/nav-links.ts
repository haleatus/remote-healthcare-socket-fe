import { AuthState, NavLink } from "../types/auth-state.inteface";

export const getNavLinks = (
  authState: AuthState,
  isDoctor: boolean
): NavLink[] => {
  if (authState.isAdmin) {
    return [
      { href: "/admin", label: "Dashboard" },
      { href: "/admin/applications", label: "Applications" },
      { href: "/admin/reports", label: "Reports" },
      { href: "/admin/admins", label: "Admins" },
      { href: "/admin/users", label: "Users" },
      { href: "/admin/create-admin", label: "Create Admins" },
    ];
  }

  if (authState.isUser) {
    return [
      ...(isDoctor
        ? [
            { href: "/patient-applications", label: "Patient Applications" },
            { href: "/doctor-applications", label: "My Applications" },
            { href: "/doctors", label: "Doctors" },
          ]
        : [
            { href: "/my-applications", label: "My Applications" },
            { href: "/reports", label: "Reports" },
          ]),
    ];
  }

  return [
    { href: "/doctors", label: "Doctors" },
    { href: "/doctors/dashboard", label: "Dashboard" },
  ];
};
