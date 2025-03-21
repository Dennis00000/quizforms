"use client"
import { useTranslation } from "react-i18next"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/24/solid"
import { Fragment } from "react"

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "lt", name: "Lithuania", flag: "🇱🇹" },
    { code: "ru", name: "Russia", flag: "🇷🇺" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0]

  const changeLanguage = (code) => {
    i18n.changeLanguage(code)
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <span className="mr-1">{currentLanguage.flag}</span>
          <span className="mr-1 hidden sm:inline">{currentLanguage.name}</span>
          <ChevronDownIcon className="w-4 h-4 ml-1" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {languages.map((lang) => (
              <Menu.Item key={lang.code}>
                {({ active }) => (
                  <button
                    onClick={() => changeLanguage(lang.code)}
                    className={`${
                      active
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-gray-300"
                    } flex w-full items-center px-4 py-2 text-sm`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default LanguageSwitcher

