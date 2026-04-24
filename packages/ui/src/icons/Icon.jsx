import React from "react";
import * as Icons from "lucide-react";
import { iconMap as aliases } from "./iconMap";

export const Icon = ({ name, size = 20, ...props }) => {
  // 1. Check aliases (e.g., "back", "forward")
  let Component = aliases[name];

  // 2. Try exact match from lucide (e.g., "BellOff")
  if (!Component) {
    Component = Icons[name];
  }

  // 3. Try PascalCase (e.g., "bellOff" -> "BellOff")
  if (!Component && typeof name === "string") {
    const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
    Component = Icons[pascalName];
  }

  if (!Component) {
    console.warn(`Icon "${name}" not found in lucide-react`);
    return null;
  }

  return <Component size={size} {...props} />;
};