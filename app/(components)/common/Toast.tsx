"use client";

import { cva } from "class-variance-authority";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

type ToashPropsType = {
  children: React.ReactNode;
  duration?: number;
  onClose?: () => void;
};

const Toast = ({ children, duration = 4000, onClose }: ToashPropsType) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 500);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const ToastVariants = cva(
    "fixed right-0 z-60 w-80 h-12 px-2 py-1 flex justify-center items-center border rounded-lg animate-toastEffect",
    {
      variants: {
        size: {
          mobile: "top-12",
          laptop: "top-16",
          desktop: "top-16",
        },
        state: {
          error: "border-red-500 bg-red-500/10",
          success: "border-green-500 bg-green-500/10",
        },
        visible: {
          true: "translate-x-0 opacity-100",
          false: "translate-x-full opacity-0",
        },
      },
      defaultVariants: {
        size: "mobile",
        state: "success",
        visible: true,
      },
    }
  );

  if (!isVisible && !onClose) return null;

  return (
    <section className={clsx(ToastVariants({ visible: isVisible }))}>
      <p>{children}</p>
    </section>
  );
};

export default Toast;
