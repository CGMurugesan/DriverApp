import React from "react";
import { SvgCss } from "react-native-svg";

const xml = `


<?xml version="1.0" standalone="no"?>
<svg xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" width="128" height="128" viewBox="0 0 512 512" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><path d="M214.78,478l-20.67-21.57L403.27,256,194.11,55.57,214.78,34,446.46,256ZM317.89,256,86.22,34,65.54,55.57,274.7,256,65.54,456.43,86.22,478Z"/></svg>

`
export default props => (
    <SvgCss xml={xml} width={props.width} height={props.height} />
  );