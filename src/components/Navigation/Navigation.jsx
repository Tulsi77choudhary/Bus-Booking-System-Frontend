import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, BellIcon } from "@heroicons/react/24/outline";
import { Avatar, Button } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthModel } from "../Auth/AuthModel"; // Tailwind style modal

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
  { name: "Help", href: "/help" },
  
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavigationMain() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);

  const handleOpen = () => setOpenAuthModal(true);
  const handleClose = () => setOpenAuthModal(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">

                {/* Mobile button */}
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="p-2 text-gray-400 hover:text-white">
                    {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
                  </Disclosure.Button>
                </div>

                {/* Logo + Links */}
                <div className="flex flex-1 items-center justify-center sm:justify-start">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Logo"
                  />

                  <div className="hidden sm:flex flex-1 justify-end mr-20 space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Right side desktop */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:ml-6">
                  <BellIcon className="h-6 w-6 text-gray-400 mr-4" />

                  {auth?.user ? (
                    <Menu as="div" className="relative">
                      <Menu.Button>
                        <Avatar sx={{ bgcolor: deepPurple[500], cursor: "pointer" }}>
                          {auth.user.firstName?.charAt(0).toUpperCase()}
                        </Avatar>
                      </Menu.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 mt-2 w-40 rounded-md bg-gray-800 shadow-lg">
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                onClick={() => navigate("/account/profile")}
                                className={classNames(
                                  active && "bg-gray-700",
                                  "px-4 py-2 text-sm text-white cursor-pointer"
                                )}
                              >
                                My Profile
                              </p>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                onClick={() => navigate("/account/order")}
                                className={classNames(
                                  active && "bg-gray-700",
                                  "px-4 py-2 text-sm text-white cursor-pointer"
                                )}
                              >
                                Booking History
                              </p>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                onClick={handleLogout}
                                className={classNames(
                                  active && "bg-gray-700",
                                  "px-4 py-2 text-sm text-white cursor-pointer"
                                )}
                              >
                                Logout
                              </p>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    // Desktop Sign In
                    <Button onClick={handleOpen} className="text-white hidden sm:inline-flex">
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            <Disclosure.Panel className="sm:hidden px-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="block px-3 py-2 text-gray-300 hover:text-white rounded-md text-base font-medium"
                >
                  {item.name}
                </Disclosure.Button>
              ))}

              {/* Mobile Sign In */}
              {!auth?.user && (
                <Disclosure.Button
                  as="button"
                  onClick={handleOpen}
                  className="w-full text-left px-3 py-2 text-gray-300 hover:text-white rounded-md text-base font-medium"
                >
                  Sign In
                </Disclosure.Button>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      {/* Tailwind Style Auth Modal */}
      <AuthModel open={openAuthModal} handleClose={handleClose} />
    </>
  );
}
