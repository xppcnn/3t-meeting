"use client";
import { create } from "zustand";
import { cookies } from "next/headers";
import { boolean } from "zod";
interface BearState {
  collapsed: boolean;
  changeCollapsed: (state: boolean) => void;
}

const useSideBar = create<BearState>()((set) => ({
  collapsed: false,
  changeCollapsed: (collapsed) => set(() => ({ collapsed })),
}));

export default useSideBar;
