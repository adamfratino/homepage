import { SPACING_SM } from "@/constants/ui";
import { Card, type CardProps } from "@uiid/design-system";

type MainLayoutProps = Pick<
  CardProps,
  "title" | "description" | "action" | "footer" | "children" | "maxw"
>;

export function MainLayout({
  title,
  description,
  action,
  footer,
  children,
  maxw,
}: MainLayoutProps) {
  return (
    <Card
      data-slot="main-layout"
      variant="shell"
      title={title}
      description={description}
      action={action}
      footer={footer}
      maxw={maxw}
      InnerContainerProps={{ render: <main />, gap: SPACING_SM }}
      HeaderProps={{ render: <header /> }}
      FooterProps={{ render: <footer /> }}
      TitleProps={{ render: <h1 />, weight: "bold" }}
      DescriptionProps={{ render: <h2 /> }}
    >
      {children}
    </Card>
  );
}
