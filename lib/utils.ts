import { MenuType } from "@/constant/menu";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findParentPath(data: MenuType[], path: string) {
  let parentPath = "";

  function findPath(arr: MenuType[], parent: string) {
    for (let item of arr) {
      if (item.path === path) {
        parentPath = parent;
        break;
      }
      if (item.children) {
        findPath(item.children, item.path);
      }
    }
  }

  findPath(data, "");
  return parentPath;
}
