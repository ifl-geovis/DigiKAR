import { FC, PropsWithChildren } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import "./styles.css";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

type Props = PropsWithChildren<{
  title?: string;
  collapsible?: boolean;
}>;

const Card: FC<Props> = ({ children, title, collapsible = false }) => {
  return (
    <Collapsible.Root defaultOpen={!collapsible}>
      <div className="rounded-sm bg-white shadow-md">
        {(title || collapsible) && (
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-2 font-bold">
            <span className="text-sm">{title}</span>
            <Collapsible.Trigger asChild>
              <Button size="icon" variant="ghost">
                <CaretSortIcon />
              </Button>
            </Collapsible.Trigger>
          </div>
        )}
        <Collapsible.Content>
          <div className="p-5">{children}</div>
        </Collapsible.Content>
      </div>
    </Collapsible.Root>
  );
};

export default Card;