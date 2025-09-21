import React, { type ComponentProps } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

type MotionButtonProps = ComponentProps<typeof motion.button>

interface NavButtonProps extends MotionButtonProps {
  side: "left" | "right"
}

const NavButton = React.forwardRef<HTMLButtonElement, NavButtonProps>(
  ({ side, className = "", ...props }, ref) => {
    const baseClasses =
      "absolute top-1/2 -translate-y-1/2 grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full bg-white/95 backdrop-blur-sm border border-sky-100 shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400/30"

    const sideClasses = side === "left" ? "left-3 sm:left-4" : "right-3 sm:right-4"

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`${baseClasses} ${sideClasses} ${className}`}
        {...props}
      >
        {side === "left" ? (
          <ChevronLeft className="h-4 w-4 text-black/70" />
        ) : (
          <ChevronRight className="h-4 w-4 text-black/70" />
        )}
      </motion.button>
    )
  }
)

NavButton.displayName = "NavButton"

export default NavButton
