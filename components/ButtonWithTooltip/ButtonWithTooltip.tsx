import React, { FC } from "react";
import { Button, ButtonProps } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

type Props = { tooltipContent: string } & ButtonProps;

const ButtonWithTooltip: FC<Props> = ({ tooltipContent, ...rest }) => {
  return (
    <Tooltip delayDuration={500}>
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
