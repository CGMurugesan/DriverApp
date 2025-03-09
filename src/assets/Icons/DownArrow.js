import React from "react";
import { SvgCss } from "react-native-svg";

const xml = `

<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.41 0.58L6 5.17L10.59 0.58L12 2L6 8L0 2L1.41 0.58Z" fill="#222222"/>
</svg>

`;
export default (props) => (
  <SvgCss xml={xml} width={props.width} height={props.height} />
);
