import { FC, PropsWithChildren } from "react";

type Props = PropsWithChildren;

const MapAside: FC<Props> = ({ children }) => {
  return (
    <aside className="pointer-events-none z-10 grid h-auto w-[420px] content-start gap-3 overflow-auto overflow-x-hidden rounded-sm p-3 [grid-area:_aside] *:pointer-events-auto">
      {children}
    </aside>
  );
};

export default MapAside;
