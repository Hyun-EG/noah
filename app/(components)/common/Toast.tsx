"use client";

import clsx from "clsx";
import React from "react";

type ToastType = {
  state: "success" | "failed";
  children: React.ReactNode;
};

const Toast = ({ state, children }: ToastType) => {
  return (
    <section
      className={clsx(
        "fixed top-0 right-0 z-100 w-40 h-12 flex justify-center items-center animate-toast-fade-in-effect duration-500 animate-toast-fade-out-effect",
        {
          "border-success bg-success/50": state === "success",
          "border-failed bg-failed/50": state === "failed",
        }
      )}
    >
      <p>{children}</p>
    </section>
  );
};

export default Toast;
