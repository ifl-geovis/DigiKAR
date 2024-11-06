import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const MapAside: FC<Props> = ({ children }) => {
  return (
    <aside className="z-10 ml-3 mr-3 mt-3 grid h-full max-w-md content-start gap-3 overflow-auto overflow-x-hidden rounded-sm grid-in-[aside]">
      {children}
    </aside>
  );
};

export default MapAside;
