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

export function generateMeetingCode() {
  const characters = '0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}