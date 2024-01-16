const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center bg-[#f8faff]">
      {children}
    </div>
  );
};

export default AuthLayout;
