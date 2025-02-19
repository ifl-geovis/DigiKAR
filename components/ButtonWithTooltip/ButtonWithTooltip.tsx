import React, { FC } from "react";
import { Button, ButtonProps } from "../ui/button";
import Tooltip from "../Tooltip/Tooltip";
import TooltipTrigger from "../Tooltip/TooltipTrigger";
import TooltipContent from "../Tooltip/TooltipContent";

type Props = { tooltipContent: string } & ButtonProps;

const ButtonWithTooltip: FC<Props> = ({ tooltipContent, ...rest }) => {
  return (
    <Tooltip delay={{ open: 1500, close: 0 }}>
      <TooltipTrigger asChild>
        <Button {...rest} />
      </TooltipTrigger>
      <TooltipContent className="bg-primary p-2 text-xs text-white transition-opacity">
        {tooltipContent}
      </TooltipContent>
    </Tooltip>
  );
};

export default ButtonWithTooltip;
