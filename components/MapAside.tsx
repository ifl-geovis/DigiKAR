import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const MapAside: FC<Props> = ({ children }) => {
  return (
    <aside className="pointer-events-none z-10 ml-3 mr-3 mt-3 grid h-full w-[420px] content-start gap-3 overflow-auto overflow-x-hidden rounded-sm [grid-area:_aside] *:pointer-events-auto">
      {children}
    </aside>
  );
};

export default MapAside;
