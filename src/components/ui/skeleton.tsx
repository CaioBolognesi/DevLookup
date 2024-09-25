import { cn } from "../../lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-zinc-700/30 dark:bg-zinc-50/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
