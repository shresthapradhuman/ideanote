"use client";
import Link from "next/link";

const Breadcrumb = ({
  items,
}: {
  items: {
    label: string;
    href: string;
  }[];
}) => {
  return (
    <nav className="flex items-center mb-8">
      <ol
        className="flex items-center whitespace-nowrap"
        aria-label="Breadcrumb"
      >
        <li className="inline-flex items-center">
          <Link
            className={`flex items-center text-sm text-gray-500 ${
              items.length === 0 ? "text-gray-50" : ""
            }`}
            href="/dashboard"
          >
            Dashboard
          </Link>
          {items.length > 0 && (
            <svg
              className="flex-shrink-0 mx-2 overflow-visible h-4 w-4 text-gray-400 dark:text-neutral-600"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          )}
        </li>
        {items.length > 0 &&
          items.map((item) =>
            item.href === "#" ? (
              <li
                className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-gray-200"
                key={item.href}
              >
                {item.label}
              </li>
            ) : (
              <li className="inline-flex items-center" key={item.href}>
                <Link
                  className="flex items-center text-sm text-gray-500 "
                  href={item.href}
                >
                  {item.label}
                  <svg
                    className="flex-shrink-0 mx-2 overflow-visible h-4 w-4 text-gray-400  dark:text-neutral-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </li>
            )
          )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
