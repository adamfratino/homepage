import type { PropsWithChildren } from "react";

const ListItem = ({ children }: PropsWithChildren) => (
  <li className="text-sm italic mb-2 last:mb-0">{children}</li>
);

export default ListItem;
