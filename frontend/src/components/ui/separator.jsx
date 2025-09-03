import React from 'react';
import { cn } from './utils';

const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => {
  const Comp = decorative ? "div" : "hr";
  return (
    <Comp
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Separator.displayName = "Separator";

export { Separator };
