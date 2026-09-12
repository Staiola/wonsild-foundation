import * as React from "react"
import { cn } from "cn"
import { Switch as SwitchPrimitive } from "radix-ui"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {/* The button owns the full target; the smaller track is only visual. */}
      <span
        aria-hidden="true"
        data-slot="switch-track"
        className="pointer-events-none inline-flex items-center rounded-full border border-transparent group-data-[size=default]/switch:h-[1.15rem] group-data-[size=default]/switch:w-8 group-data-[size=sm]/switch:h-3.5 group-data-[size=sm]/switch:w-6 group-data-[state=checked]/switch:bg-primary group-data-[state=unchecked]/switch:bg-input"
      >
        <SwitchPrimitive.Thumb
          data-slot="switch-thumb"
          className="pointer-events-none block rounded-full bg-background transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground"
        />
      </span>
    </SwitchPrimitive.Root>
  )
}

export { Switch }
