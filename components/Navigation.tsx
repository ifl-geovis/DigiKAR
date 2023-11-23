"use client";

import Link from "next/link";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

type LinkItem = { title: string; href: string; description?: string };

const wp3: LinkItem[] = [
  {
    title: "Place of birth and death",
    href: "/wp3/flows",
    description: "Where people come from and where they die.",
  },
  {
    title: "Functionalities and institutions",
    href: "/wp3/functionalities",
    description: "Institutions and the functionalities they accumulated.",
  },
  {
    title: "Births and deaths per place",
    href: "/wp3/events-per-place",
    description: "How many people are born and die in a certain place.",
  },
];

const wp2: LinkItem[] = [
  {
    title: "Kursachsen",
    href: "/wp2/kursachsen",
    description: "Rights and potentates in Electoral Saxony.",
  },
  {
    title: "Ansbach",
    href: "/wp2/ansbach",
    description: "Rights and potentates around Ansbach.",
  },
];

const pages = [
  {
    title: "Kursachsen",
    href: "/wp2",
    subtitle: "Focus area working package 2",
    subpages: wp2,
  },
  {
    title: "Kurmainz",
    href: "/wp3",
    subtitle: "Focus area working package 3",
    subpages: wp3,
  },
];

const Navigation = () => {
  return (
    <div className="container mt-10 mb-10 flex items-baseline">
      <Link className="text-sm me-5" href={"/"}>
        DigiKAR prototype
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {pages.map((page) => (
            <NavigationMenuItem key={page.title}>
              <NavigationMenuTrigger>{page.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href={page.href}
                      >
                        <div className="h-6 w-6 border rounded-sm border-slate-500">
                          &nbsp;
                        </div>
                        <div className="mb-2 mt-4 text-lg font-medium">
                          {page.title}
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          {page.subtitle}{" "}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  {page.subpages.map((subpage) => (
                    <ListItem
                      key={subpage.title}
                      title={subpage.title}
                      href={subpage.href}
                    >
                      {subpage.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <Link href="" legacyBehavior passHref aria-disabled>
              <NavigationMenuLink
                className={cn(
                  "cursor-not-allowed opacity-50",
                  navigationMenuTriggerStyle()
                )}
              >
                Storybook
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navigation;

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
