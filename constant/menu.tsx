import React from "react";
import { BsPerson, BsList, BsJournalText, BsBriefcase } from "react-icons/bs";
export interface MenuItemType {
  label: string;
  path: string;
  icon: React.ReactNode;
}
export interface MenuType extends MenuItemType {
  children?: MenuItemType[];
}
const menuList: MenuType[] = [
  {
    label: "个人资料",
    path: "/user-center/person-info",
    icon: <BsPerson size={20} />,
  },
  {
    label: "个人会议室",
    path: "/user-center/person-meeting-room",
    icon: <BsJournalText size={20} />,
  },
  {
    label: "会议列表",
    path: "/user-center/meeting-list",
    icon: <BsList size={20} />,
  },
  {
    label: "订单与服务",
    path: "/user-center/order-and-service",
    icon: <BsBriefcase size={20} />,
    children: [
      {
        label: "我的订单",
        path: "/user-center/my-order",
        icon: <BsBriefcase size={20} />,
      },
      {
        label: "我的服务",
        path: "/user-center/my-service",
        icon: <BsBriefcase size={20} />,
      },
    ],
  },
];

export default menuList;
