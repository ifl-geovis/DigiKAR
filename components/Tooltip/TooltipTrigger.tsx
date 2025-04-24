import { cloneElement, forwardRef, isValidElement } from "react";
import { useTooltipContext } from "./Tooltip";
import { useMergeRefs } from "@floating-ui/react";

const TooltipTrigger = forwardRef<
  HTMLElement,
  React.HTMLProps<HTMLElement> & { asChild?: boolean }
>(function TooltipTrigger({ children, asChild = false, ...props }, propRef) {
  const context = useTooltipContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childrenRef = (children as any).ref;
  const ref = useMergeRefs([context.refs.setReference, propRef, childrenRef]);

  // `asChild` allows the user to pass any element as the anchor
  if (asChild && isValidElement(children)) {
    return cloneElement(
      children,
      context.getReferenceProps({
        ref,
        ...props,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...(children.props as Record<any, unknown>),
        //@ts-expect-error since upgrading nextjs
        "data-state": context.open ? "open" : "closed",
      }),
    );
  }

  return (
    <button
      ref={ref}
      // The user can style the trigger based on the state
      data-state={context.open ? "open" : "closed"}
      {...context.getReferenceProps(props)}
    >
      {children}
    </button>
  );
});

export default TooltipTrigger;
