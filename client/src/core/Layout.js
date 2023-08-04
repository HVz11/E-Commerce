import React from "react";
import Menu from "./menu";

const Layout = ({
  title = "Title",
  description = "Description",
  className,
  children,
}) => (
  <div>
    <Menu />
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
