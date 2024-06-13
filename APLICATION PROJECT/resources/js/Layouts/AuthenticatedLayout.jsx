import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";

export default function AuthenticatedLayout({ user, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

  const isAdmin = user.role === 'admin';

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <nav className="bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 w-64">
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center p-4">
              <Link href="/">
                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
              </Link>
            </div>

            <div className="flex-1 px-4 py-2 space-y-2">
              <NavLink href={route("dashboard")} active={route().current("dashboard")}>
                Dashboard
              </NavLink>
              <NavLink href={route("project.index")} active={route().current("project.index")}>
                Buku PR
              </NavLink>
              <NavLink href={route("task.index")} active={route().current("task.index")}>
                All Pemesanan
              </NavLink>
              {isAdmin && (
                <NavLink href={route("user.index")} active={route().current("user.index")}>
                  Users
                </NavLink>
              )}
              <NavLink href={route("task.myTasks")} active={route().current("task.myTasks")}>
                Approval
              </NavLink>
              <NavLink href={route("inventory.index")} active={route().current("inventory.index")}>
                Inventory
              </NavLink>
              {isAdmin && (
                <NavLink href={route("roles.index")} active={route().current("roles.index")}>
                  Roles
                </NavLink>
              )}
              {isAdmin && (
                <NavLink href={route("category.index")} active={route().current("category.index")}>
                  Category
                </NavLink>
              )}
            </div>
          </div>

          <div className="px-4 py-2">
            <Dropdown>
              <Dropdown.Trigger>
                <span className="inline-flex rounded-md w-full">
                  <button
                    type="button"
                    className="inline-flex items-center justify-between w-full px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                  >
                    {user.name}

                    <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </Dropdown.Trigger>

              <Dropdown.Content align="right" width="48">
                <Dropdown.Link href={route("profile.edit")}>
                  Profile
                </Dropdown.Link>
                <Dropdown.Link href={route("logout")} method="post" as="button">
                  Log Out
                </Dropdown.Link>
              </Dropdown.Content>
            </Dropdown>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col">
        {header && (
          <header className="bg-white dark:bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              {header}
            </div>
          </header>
        )}

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
