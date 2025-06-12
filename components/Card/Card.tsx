import { FC, PropsWithChildren } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import "./styles.css";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { twJoin } from "tailwind-merge";

type Props = PropsWithChildren<{
  header?: React.ReactNode | string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  inset?: boolean;
}>;

const Card: FC<Props> = ({
  children,
  header,
  collapsible = false,
  inset = true,
  defaultOpen,
}) => {
  return (
    <Collapsible.Root defaultOpen={defaultOpen ?? !collapsible}>
      <div className="rounded-sm bg-white shadow-md">
        {(header || collapsible) && (
          <div className="flex items-center justify-between border-b px-5 py-2 text-sm font-bold">
            {header &&
              (typeof header === "string" ? (
                <span>{header}</span>
              ) : (
                <>{header}</>
              ))}
            {collapsible ? (
              <Collapsible.Trigger asChild>
                <Button className="cursor-pointer" size="icon" variant="ghost">
                  <CaretSortIcon />
                </Button>
              </Collapsible.Trigger>
            ) : null}
          </div>
        )}
        <Collapsible.Content>
          <div className={twJoin(inset && "p-5")}>{children}</div>
        </Collapsible.Content>
      </div>
    </Collapsible.Root>
  );
};

export default Card;
