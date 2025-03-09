import React from "react";
import { SvgCss } from "react-native-svg";

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 50 50" id="pending">
  <path d="M25 1c-2.872 0-5.68.502-8.348 1.492l.696 1.875A21.921 21.921 0 0 1 25 3c12.131 0 22 9.869 22 22s-9.869 22-22 22S3 37.131 3 25a22.001 22.001 0 0 1 8-16.958V15h2V5H3v2h6.126A24.005 24.005 0 0 0 1 25c0 13.233 10.767 24 24 24s24-10.767 24-24S38.233 1 25 1z"></path>
  <path d="M19 33h-2v2h16v-2h-2v-3.414L26.414 25 31 20.414V17h2v-2H17v2h2v3.414L23.586 25 19 29.586V33zm2-13.414V17h8v2.586l-4 4-4-4zm4 6.828 4 4V33h-8v-2.586l4-4zM19 39h2v2h-2zM24 39h2v2h-2zM29 39h2v2h-2z"></path>
</svg>


`
export default props => (
    <SvgCss xml={xml} width={props.width} height={props.height}  fill={props.fill}/>
  );