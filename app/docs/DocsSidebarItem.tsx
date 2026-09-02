"use client";

import type * as PageTree from "fumadocs-core/page-tree";
import { SidebarItem } from "fumadocs-ui/components/layout/sidebar";
import ComponentPicker from "@/app/(site)/components/_shared/ComponentPicker";

export default function DocsSidebarItem({ item }: { item: PageTree.Item }) {
  return (
    <>
      <SidebarItem href={item.url} external={item.external} icon={item.icon}>
        {item.name}
      </SidebarItem>
      {item.url.endsWith("/components") ? <ComponentPicker /> : null}
    </>
  );
}