import { FloatingPortal, useMergeRefs } from "@floating-ui/react";
import { forwardRef } from "react";
import { useTooltipContext } from "./Tooltip";
import { cn } from "@/lib/utils";

const TooltipContent = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(function TooltipContent(props, propRef) {
  const context = useTooltipContext();
  const ref = useMergeRefs([context.refs.setFloating, propRef]);

  return (
    <FloatingPortal>
      {context.open && (
        <div
          ref={ref}
          style={{
            position: context.strategy,
            top: context.y ?? 0,
            left: context.x ?? 0,
            visibility: context.x == null ? "hidden" : "visible",
            ...props.style,
          }}
          {...context.getFloatingProps(props)}
          className={cn(
            "z-[1000] rounded-sm bg-white p-4 shadow-lg",
            props.className,
          )}
        />
      )}
    </FloatingPortal>
  );
});

export default TooltipContent;
