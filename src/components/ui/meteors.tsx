"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [meteorStyles, setMeteorStyles] = useState<React.CSSProperties[]>([]);

  useEffect(() => {
    const styles = [...new Array(number || 20)].map(() => ({
      top: -5,
      left: Math.floor(Math.random() * 100) + "%",
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor absolute top-0 left-1/2 h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-white shadow-[0_0_8px_1px_rgba(0,0,0,0.05)] dark:shadow-[0_0_8px_1px_rgba(255,255,255,0.8)] rotate-215",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-1/2 before:w-[50px] before:h-px before:bg-linear-to-r before:from-zinc-300/60 dark:before:from-white/80 before:to-transparent",
            className
          )}
          style={style}
        ></span>
      ))}
    </div>
  );
};
