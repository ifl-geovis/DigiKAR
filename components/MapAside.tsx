import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const MapAside: FC<Props> = ({ children }) => {
  return (
    <aside className="z-10 flex flex-col gap-3 p-3 grid-in-[aside]">
      {children}
    </aside>
  );
};

export default MapAside;
