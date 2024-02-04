import React from "react";
import { currentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EditName from "./_components/EditName";

const PersonInfPage = async () => {
  const user = await currentUser();
  console.log("🚀 ~ file: page.tsx:6 ~ PersonInfPage ~ user:", user);
  return (
    <div className="flex flex-col h-full">
      <div className="h-[70px]">
        <h2 className="text-2xl font-normal py-2.5">个人资料</h2>
      </div>
      <div className="flex-1 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 h-[88px] items-center">
              <Avatar className="h-12 w-12">
                <AvatarImage src={user?.image!} alt="user-avatar" />
                <AvatarFallback>{user?.name}</AvatarFallback>
              </Avatar>
              <EditName name={user?.name!} userId={user?.id!} />
            </div>
            <div className="flex text-xs">
              <p className="text-[#888]">个人会议号</p>
              <span className="pl-5 pr-1">{user?.meetingCode}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>账号安全</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex text-xs">
              <p className="text-[#888] w-12">账号密码</p>
              <span className="pl-5 pr-1">{user?.meetingCode}</span>
            </div>
            <div className="flex text-xs">
              <p className="text-[#888] w-12">邮箱</p>
              <span className="pl-5 pr-1">{user?.meetingCode}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonInfPage;
