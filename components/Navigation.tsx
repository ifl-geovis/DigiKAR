"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

const NavigationLink: FC<{ name: string; url: string }> = ({ name, url }) => {
  const pathname = usePathname();
  return (
    <Link
      className={`hover:text-sky-400 ${url === pathname && "underline"}`}
      href={url}
    >
      {name}
    </Link>
  );
};

const Navigation = () => {
  return (
    <nav className="flex items-center gap-5 m-5 mx-20">
      <h1 className="text-base">DigiKAR Prototype</h1>
      <ul className="flex list-none gap-2">
        {[
          { name: "Start", url: "/" },
          { name: "WP2", url: "/wp2" },
          { name: "WP3", url: "/wp3" },
          { name: "flows", url: "/wp3/flows" },
        ].map((props, idx) => (
          <li key={`nav-${idx}`}>
            <NavigationLink {...props} />
          </li>
        ))}
      </ul>
      <button>
        <a href={`/storybook/`}>Storybook</a>
      </button>
    </nav>
  );
};

export default Navigation;
