"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const radius = 100; // tamaño del halo al hacer hover
    const [visible, setVisible] = React.useState(false);

    let mouseX = useMotionValue(0);
    let mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
      let { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
            radial-gradient(
              ${
                visible ? radius + "px" : "0px"
              } circle at ${mouseX}px ${mouseY}px,
              #009dff 0%, /* azul en el centro */
              #7dffb2 70%, /* verde menta hacia el borde */
              transparent 90%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-lg p-[2px] transition duration-300"
      >
        <input
          type={type}
          className={cn(
            `shadow-input flex h-10 w-full 
              rounded-md border bg-white px-3 py-2 text-sm text-black 
              transition duration-300 group-hover/input:shadow-none 
              placeholder:text-gray-400 group-hover/input:placeholder:text-[#009dff] focus:placeholder:text-[#009dff]
              focus-visible:ring-[2px] focus-visible:ring-[#009dff] 
              focus-visible:border-[#7dffb2] 
              focus-visible:outline-none 
              disabled:cursor-not-allowed disabled:opacity-50`,
            visible ? "border-transparent" : "border-gray-300",
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
Input.displayName = "Input";

export { Input };
