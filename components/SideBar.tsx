"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Menu from "./Menu";
import useSideBar from "@/hooks/useSideBar";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
const SideBar = () => {
  const collapsed = useSideBar((state) => state.collapsed);
  const onCollapsed = useSideBar((state) => state.changeCollapsed);
  return (
    <nav className="h-full min-w-0 bg-white shadow-md transition-[width]">
      <nav className="h-full">
        <ScrollArea className="h-[calc(100%-84px)] pt-6 pr-4 pl-4 w-fit">
          <Menu collapsed={collapsed} />
        </ScrollArea>
        <div className="h-[84px] pt-4 pr-6 pb-9 pl-8">
          <div
            onClick={() => onCollapsed(!collapsed)}
            className="flex justify-center items-center h-[32px] w-[32px] rounded-md bg-[#ebedf2] cursor-pointer opacity-80 hover:opacity-100"
          >
            {collapsed ? (
              <TbLayoutSidebarRightCollapse size={20} />
            ) : (
              <TbLayoutSidebarLeftCollapse size={20} />
            )}
          </div>
        </div>
      </nav>
    </nav>
  );
};

export default SideBar;
