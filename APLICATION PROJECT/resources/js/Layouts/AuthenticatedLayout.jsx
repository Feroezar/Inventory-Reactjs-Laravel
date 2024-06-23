import { useState, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import { Link } from "@inertiajs/react";

export default function AuthenticatedLayout({ user, header, children }) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for the theme preference
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const isAdmin = user.role === 'admin';

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col md:flex-row ${isDarkMode ? 'dark' : ''}`}>
      <nav className="bg-white dark:bg-gray-800 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-700 w-full md:w-64">
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between p-4 md:justify-start">
              <Link href="/">
                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
              </Link>
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  {showingNavigationDropdown ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            <div className={`flex-1 px-4 py-2 space-y-2 md:block ${showingNavigationDropdown ? 'block' : 'hidden'}`}>
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
                  Divisi
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
            <button
              onClick={toggleDarkMode}
              className="mb-4 w-full px-4 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
            >
              {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </button>
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
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
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
