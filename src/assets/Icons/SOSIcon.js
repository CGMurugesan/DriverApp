import React from "react";
import { SvgCss } from "react-native-svg";

const xml = `

<svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_805_388)">
<circle cx="33" cy="29" r="25" fill="#C91C1C"/>
<path d="M33 39C38.5228 39 43 34.5228 43 29C43 23.4772 38.5228 19 33 19C27.4772 19 23 23.4772 23 29C23 34.5228 27.4772 39 33 39Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33 25V29" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M33 33H33.01" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<filter id="filter0_d_805_388" x="0" y="0" width="66" height="66" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="4"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_805_388"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_805_388" result="shape"/>
</filter>
</defs>
</svg>

`;
export default (props) => (
  <SvgCss xml={xml} width={props.width} height={props.height} fill={props.fill}/>
);
