import * as React from "react"
import { cn } from "~/lib/utils"

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "p-5 rounded-lg  flex items-center justify-center w-full  aspect-[5/1]",
          props.className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Hero.displayName = "Hero"

export default Hero
