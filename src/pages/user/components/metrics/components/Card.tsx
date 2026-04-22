import { motion, HTMLMotionProps } from "framer-motion";
import { PALETTE } from "../../../../../constants/theme";

export interface ICardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverEffect?: boolean;
}

export const Card: React.FC<ICardProps> = ({
  children,
  className = "",
  delay = 0,
  hoverEffect = false,
  ...props
}) => {
  const baseClasses =
    "rounded-2xl p-6 shadow-sm relative overflow-hidden group";

  const springTransition = {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
    delay: delay,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={springTransition}
      whileHover={
        hoverEffect
          ? {
              y: -8,
              scale: 1.02,
              boxShadow:
                "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
              borderColor: PALETTE.primary.dark,
            }
          : {}
      }
      whileTap={hoverEffect ? { scale: 0.98 } : {}}
      className={`${baseClasses} ${className}`}
      style={{
        backgroundColor: PALETTE.background.surface,
        border: `1px solid ${PALETTE.neutral[200]}`,
      }}
      {...props}
    >
      {hoverEffect && (
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
          style={{
            background: `linear-gradient(135deg, ${PALETTE.primary.alpha50}, transparent)`,
          }}
        />
      )}

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
