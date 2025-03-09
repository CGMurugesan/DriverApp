import React from "react";
import { SvgCss } from "react-native-svg";

const xml = `

<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10" cy="10" r="9.25" stroke="#222222" stroke-width="1.5"/>
<path d="M14 14.5V13.5C14 12.9696 13.7893 12.4609 13.4142 12.0858C13.0391 11.7107 12.5304 11.5 12 11.5H8C7.46957 11.5 6.96086 11.7107 6.58579 12.0858C6.21071 12.4609 6 12.9696 6 13.5V14.5" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10 9.5C11.1046 9.5 12 8.60457 12 7.5C12 6.39543 11.1046 5.5 10 5.5C8.89543 5.5 8 6.39543 8 7.5C8 8.60457 8.89543 9.5 10 9.5Z" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
export default (props) => (
  <SvgCss xml={xml} width={props.width} height={props.height}/>
);
