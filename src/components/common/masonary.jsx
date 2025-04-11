"use client";
import MainMasonry from "react-masonry-css";

export default function Masonry({ children, ...rest }) {
  return (
    <>
      <MainMasonry {...rest}>{children}</MainMasonry>
    </>
  );
}
