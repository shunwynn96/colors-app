import React from "react";
import style from "./StyleModules/Page.module.scss";

function Page(props) {
  return <section className={style.page}>{props.children}</section>;
}

export default Page;
