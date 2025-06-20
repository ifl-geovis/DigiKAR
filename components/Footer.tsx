import Link from "next/link";
import { FC } from "react";
import { LuDatabaseBackup, LuGithub } from "react-icons/lu";

const Footer: FC = () => {
  return (
    <footer className="flex items-center border-t px-5 py-3 text-xs">
      <div className="flex gap-4">
        <div>
          DigiKAR
          <time dateTime={new Date().toISOString()} className="ml-1">
            {new Date().getFullYear()}
          </time>
        </div>
        <Link href="/rights/changelog" className="flex items-center gap-1">
          <LuDatabaseBackup /> <span>Data Changelog</span>
        </Link>
        <div className="h-auto w-0 space-x-2 border-l border-gray-300" />
        <Link href="https://github.com/ifl-geovis/DigiKAR">
          <LuGithub />
        </Link>
      </div>
      <ul className="ml-auto flex gap-4">
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutzerklärung</Link>
        <Link href="/barrierefreiheit">Barrierefreiheit</Link>
      </ul>
    </footer>
  );
};

export default Footer;
