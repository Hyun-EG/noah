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
        "w-full mobile:px-0 laptop:px-12 desktop:px-40",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
