import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-2 rounded-sm border-[#EBEBEB] w-full text-base p-1.5 text-[#6C6C6C]",
        "focus:outline-none focus:border-[#EF7800]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }