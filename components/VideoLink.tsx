import { FC } from "react";
import { RiVimeoFill } from "react-icons/ri";
import { Button } from "./ui/button";

type Props = {
  label: string;
  id: string;
};

const VideoLink: FC<Props> = ({ id, label }) => (
  <a
    className="mt-1 mb-4 block"
    href={`https://vimeo.com/${id}`}
    target="_blank"
    rel="noreferrer"
  >
    <Button size={"sm"}>
      <RiVimeoFill className="mr-1" />
      {label}
    </Button>
  </a>
);

export default VideoLink;
