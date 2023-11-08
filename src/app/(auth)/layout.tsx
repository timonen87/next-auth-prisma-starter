import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <div className="bg-slate-200 p-10 rounded-md">{children}</div>
    </main>
  );
};

export default AuthLayout;
