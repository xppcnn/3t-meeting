"use client";
import React from "react";
import useSideBar from "@/hooks/useSideBar";
import { cn } from "@/lib/utils";
import SideBar from "./SideBar";

interface ContentProps {
  children: React.ReactNode;
}

const Content = ({ children }: ContentProps) => {
  const collapsed = useSideBar((state) => state.collapsed);
  const changeCollapse = useSideBar((state) => state.changeCollapsed);

  return (
    <section className="flex h-[calc(100%-60px)]">
      <SideBar />
      <main className="bg-[#fafbfc] pt-[22px] pr-[36px] pl-[32px] flex-1 overflow-y-auto">
        {children}
      </main>
    </section>
  );
};

export default Content;
