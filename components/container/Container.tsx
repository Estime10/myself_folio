import { ReactNode } from "react";
type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "article" | "header" | "footer";
};

export function Container({
  as: Component = "div",
  children,
  className = "",
}: ContainerProps) {
  return (
    <Component
      className={`mx-4 sm:mx-6 md:mx-8 lg:mx-10 xl:mx-12 2xl:mx-16 ${className}`}
    >
      {children}
    </Component>
  );
}
