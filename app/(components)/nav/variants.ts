import { cva, VariantProps } from "class-variance-authority";

export const navLink = cva("transition-slow-color hover:text-sky-500", {
  variants: {
    size: { md: "text-base" },
    tone: { default: "text-inherit" },
    weight: { normal: "font-normal" },
  },
  defaultVariants: { size: "md", tone: "default", weight: "normal" },
});

export type NavLinkVariants = VariantProps<typeof navLink>;

export const logoSize = cva("", {
  variants: {
    scale: { base: "w-8 h-8", md: "md:w-9 md:h-9" },
  },
  defaultVariants: { scale: "base" },
});

export const iconBtn = cva("flex items-center leading-none rounded", {
  variants: {
    size: { sm: "p-1", md: "p-2" },
    subtle: {
      true: "hover:bg-black/5 dark:hover:bg-white/10",
      false: "",
    },
  },
  defaultVariants: {
    size: "sm",
    subtle: true,
  },
});
