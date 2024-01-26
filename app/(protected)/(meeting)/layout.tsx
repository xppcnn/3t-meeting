import Content from "@/components/Content";
import Header from "@/components/Header";
import React from "react";

const MeetingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-full flex flex-col">
      <Header />
      <Content>{children}</Content>
    </section>
  );
};

export default MeetingLayout;
