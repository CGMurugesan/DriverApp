import React from "react";
import { SvgCss } from "react-native-svg";

const xml = `


<?xml version="1.0" standalone="no"?>
<svg fill="#000000" width="128" height="128" viewBox="0 0 512 512" id="Layer_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M297.2,478l20.7-21.6L108.7,256L317.9,55.6L297.2,34L65.5,256L297.2,478z M194.1,256L425.8,34l20.7,21.6L237.3,256  l209.2,200.4L425.8,478L194.1,256z"/></svg>

`
export default props => (
    <SvgCss xml={xml} width={props.width} height={props.height} />
  );