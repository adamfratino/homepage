import { cn } from "@/src/utils/cn";

type TitleProps = {
  text: string;
  className?: string;
};

const Title = ({ text, className }: TitleProps) => (
  <h1 className={cn("text-title", className)}>{text}</h1>
);

export default Title;
