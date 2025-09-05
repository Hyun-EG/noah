import clsx from "clsx";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={clsx(
        "w-full min-h-screen mobile:px-0 mobile:pt-12 laptop:px-12 laptop:pt-16 desktop:px-40 desktop:pt-16",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
