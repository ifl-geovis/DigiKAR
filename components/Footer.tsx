import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="flex items-center border-t px-5 py-3 text-xs">
      <div>DigiKAR · {new Date().getFullYear()}</div>
      <div className="ml-auto">
        <Link href="https://github.com/ifl-geovis/DigiKAR">
          <GithubIcon size={"1.5em"} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
