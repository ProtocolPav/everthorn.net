import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
        amber: "bg-orange-50 border-orange-300 dark:bg-orange-950/20 dark:border-orange-800 text-yellow-800 dark:text-yellow-400 *:data-[slot=alert-description]:text-orange-800 *:data-[slot=alert-description]:dark:text-orange-200",
        info: "bg-blue-50 border-blue-300 dark:bg-blue-950/20 dark:border-blue-800 text-grey-50 *:data-[slot=alert-description]:text-blue-800 *:data-[slot=alert-description]:dark:text-blue-200",
        red: "bg-red-50 border-red-300 dark:bg-red-950/20 dark:border-red-800 text-rose-800 dark:text-rose-400 *:data-[slot=alert-description]:text-red-800 *:data-[slot=alert-description]:dark:text-red-200"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }
