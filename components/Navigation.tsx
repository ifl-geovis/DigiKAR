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
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

type LinkItem = { title: string; href: string; description?: string };

const mobility: LinkItem[] = [
  {
    title: "Herkunft nach Studienergeignissen",
    href: "/mobility/herkunft",
    description: "Herkunft der Studenten der Universität Mainz.",
  },
  {
    title: "Biographien",
    href: "/mobility/biographies",
    description: "Wie bewegen sich Personen durch das Alte Reich.",
  },
  {
    title: "Immatrikulationen",
    href: "/mobility/matriculations",
    description: "Wo haben Professoren studiert.",
  },
  {
    title: "Mobilität",
    href: "/mobility/flows",
    description: "Gemeinsame Biographien durch Geburts- und Sterbeort.",
  },
  {
    title: "Funktionen und Institutionen",
    href: "/mobility/functionalities",
    description: "Institutionen und ihre Funktionen.",
  },
  {
    title: "Geburts- und Todesereignisse",
    href: "/mobility/events-per-place",
    description: "Wie viele Personen sind an einem Ort geboren und gestorben?",
  },
];

const rights: LinkItem[] = [
  {
    title: "Rechteverteilung",
    href: "/rights/map",
    description: "Rechteverteilung im Alten Reich auf Ortsebene.",
  },
  {
    title: "Anwesen in Höflein",
    href: "/rights/hoeflein",
    description: "Rechteverteilung auf Anwesenebene.",
  },
];

const pages = [
  {
    title: "Rechte",
    href: "/rights",
    subtitle: "Fallstudie Kursachsen und Altlandkreis Ansbach (Franken)",
    subpages: rights,
  },
  {
    title: "Mobilität",
    href: "/mobility",
    subtitle: "Fallstudie Kurmainz",
    subpages: mobility,
  },
];

const Navigation = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);
  return (
    <div className="z-20 flex items-baseline border-b px-5 py-2">
      <Link className="me-5 text-sm" href={"/"}>
        DigiKAR <sup>Prototyp</sup>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {pages.map((page) => (
            <NavigationMenuItem key={page.title}>
              <NavigationMenuTrigger
                className={
                  isActive(page.href)
                    ? "border-accent bg-accent/20 border font-bold"
                    : ""
                }
              >
                {page.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-5">
                    <NavigationMenuLink asChild>
                      <a
                        className={
                          "from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                        }
                        href={page.href}
                      >
                        <div className="h-6 w-6 rounded-sm border border-slate-500">
                          &nbsp;
                        </div>
                        <div className="mt-4 mb-2 text-lg font-bold">
                          {page.title}
                        </div>
                        <div className="text-muted-foreground mt-4 mb-2 text-sm">
                          Informationen und Bedienungsanleitungen
                        </div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          {page.subtitle}
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
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navigation;

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li className="col-start-2">
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
              className,
            )}
            {...props}
          >
            <div className="text-sm leading-none font-medium">{title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
