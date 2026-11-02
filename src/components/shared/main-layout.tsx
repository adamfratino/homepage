import { SPACING_LG } from "@/constants/ui";
import { Card, type CardProps } from "@uiid/design-system";

type MainLayoutProps = Pick<CardProps, "title" | "description" | "footer" | "children">;

export function MainLayout({ title, description, footer, children }: MainLayoutProps) {
  return (
    <Card
      data-slot="main-layout"
      variant="shell"
      title={title}
      description={description}
      footer={footer}
      InnerContainerProps={{ render: <main />, gap: SPACING_LG }}
      HeaderProps={{ render: <header /> }}
      FooterProps={{ render: <footer /> }}
      TitleProps={{ render: <h1 />, weight: "bold" }}
      DescriptionProps={{ render: <h2 /> }}
    >
      {children}
    </Card>
  );
}
