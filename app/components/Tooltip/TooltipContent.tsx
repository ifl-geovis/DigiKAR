import { FloatingPortal, useMergeRefs } from "@floating-ui/react";
import { forwardRef } from "react";
import { useTooltipContext } from "./Tooltip";

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
          className="z-[1000] bg-white rounded-sm p-4 shadow-lg"
          style={{
            position: context.strategy,
            top: context.y ?? 0,
            left: context.x ?? 0,
            visibility: context.x == null ? "hidden" : "visible",
            ...props.style,
          }}
          {...context.getFloatingProps(props)}
        />
      )}
    </FloatingPortal>
  );
});

export default TooltipContent;
