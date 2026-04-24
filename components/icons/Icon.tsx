import React from "react";
import { iconMap, IconName } from "./iconMap";
import { LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  name: IconName;
  size?: number | string;
  className?: string;
}

export const Icon = ({ name, size = 20, className = "", ...props }: IconProps) => {
  const Component = iconMap[name];

  if (!Component) {
    console.warn(`Icon "${name}" not found in iconMap`);
    return null;
  }

  return <Component size={size} className={className} {...props} />;
};

export default Icon;
