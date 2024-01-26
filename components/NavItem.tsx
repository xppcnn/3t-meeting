import { MenuItemType } from "@/constant/menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavItem = ({
  label,
  icon,
  path,
  showIcon,
  collapsed,
  isHoverContent,
  curPath,
}: MenuItemType & {
  showIcon: boolean;
  collapsed: boolean;
  isHoverContent: boolean;
  curPath: string;
}) => {
  if (isHoverContent) {
    // 菜单收缩时 二级菜单
    return (
      <div
        className={cn("px-3 py-[5px] rounded-md cursor-pointer", {
          "bg-[#006eff] text-white": curPath === path,
          "hover:bg-[#ebedf2]": curPath !== path,
        })}
      >
        <Link href={path}>{label}</Link>
      </div>
    );
  }
  return !collapsed ? (
    <div
      className={cn(
        "box-content rounded-md  cursor-pointer h-5",
        `${collapsed ? "w-9 h-10 px-1" : "w-[196px] px-4 py-[10px]"}`,
        {
          "bg-[#006eff] text-white": curPath === path,
          "hover:bg-[#ebedf2]": curPath !== path,
        }
      )}
    >
      <Link href={path} className="w-full inline-flex items-center gap-2">
        {showIcon ? icon : <span className="w-[20px] h-[20px]" />}
        {label}
      </Link>
    </div>
  ) : (
    <div
      className={cn(" rounded-md  cursor-pointer", {
        "bg-[#006eff] text-white": curPath === path,
        "hover:bg-[#ebedf2]": curPath !== path,
      })}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="w-9 h-10 px-1 rounded-md cursor-pointer box-content">
            <Link
              href={path}
              className="flex items-center justify-center w-full h-full"
            >
              {icon}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="start">
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default NavItem;
