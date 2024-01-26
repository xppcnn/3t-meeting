"use client";
import React, { useEffect } from "react";
import menuList, { MenuType } from "@/constant/menu";
import NavItem from "./NavItem";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { usePathname } from "next/navigation";
import { cn, findParentPath } from "@/lib/utils";

const Menu = ({ collapsed }: { collapsed: boolean }) => {
  const curPath = usePathname();
  const curParentPath = findParentPath(menuList, curPath);
  const renderMenu = (
    menu: MenuType,
    showIcon: boolean = true,
    isHoverContent: boolean = false
  ) => {
    if (menu.children) {
      return !collapsed ? (
        <AccordionItem
          value={menu.path}
          className="border-none"
          key={menu.path}
        >
          <AccordionTrigger className="rounded-md hover:bg-[#ebedf2] py-[10px] px-4 hover:no-underline">
            <div className="flex gap-2">
              {menu.icon} {menu.label}
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-3 mt-4">
            {menu.children.map((child) => renderMenu(child, false))}
          </AccordionContent>
        </AccordionItem>
      ) : (
        <HoverCard openDelay={300} key={menu.path}>
          <HoverCardTrigger
            className={cn(
              "h-10 flex justify-center items-center rounded-md cursor-pointer",
              {
                "bg-[#006eff] text-white": curParentPath === menu.path,
                "hover:bg-[#ebedf2]": curParentPath !== menu.path,
              }
            )}
          >
            {menu.icon}
          </HoverCardTrigger>
          <HoverCardContent
            align="start"
            alignOffset={80}
            sideOffset={-30}
            className="p-2 w-fit"
          >
            {menu.children.map((child) => renderMenu(child, false, true))}
          </HoverCardContent>
        </HoverCard>
      );
    } else {
      return (
        <NavItem
          key={menu.path}
          {...menu}
          showIcon={showIcon}
          collapsed={collapsed}
          isHoverContent={isHoverContent}
          curPath={curPath}
        />
      );
    }
  };
  return (
    <Accordion
      type="single"
      collapsible
      className="w-fit"
      defaultValue={curParentPath}
    >
      <div className="w-fit space-y-3 text-sm">
        {menuList.map((menu) => renderMenu(menu))}
      </div>
    </Accordion>
  );
};

export default Menu;
