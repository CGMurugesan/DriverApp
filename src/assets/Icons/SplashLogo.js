import React from "react";
import { SvgCss } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: style, title */

const xml = `

<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 21.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 331 117" style="enable-background:new 0 0 331 117;" xml:space="preserve">
<g>
	<defs>
		<rect id="SVGID_1_" width="331.28" height="116.73"/>
	</defs>
	<clipPath id="SVGID_2_">
		<use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
	</clipPath>
	<path style="clip-path:url(#SVGID_2_);fill:#00B5F0;" d="M184.58,61.1l0.46-2.74h2.4l0.09-0.54c0.23-1.37,1.35-6.01,5.65-6.01
		c2.2,0,3.24,1.07,3.47,3.52c-0.5,0.05-2.64,0-2.64,0c-0.14-0.34-0.15-0.88-1.12-0.88c-1.76,0-2.16,2.4-2.31,3.27l-0.11,0.64h6.41
		l-0.46,2.74H184.58z"/>
	<path style="clip-path:url(#SVGID_2_);fill:#00B5F0;" d="M236.56,79.97c-3.96,0-6.95-1.15-9.11-3.13
		c-2.65,2.11-6.14,3.13-9.97,3.13h-2.3l1.23-7.33h2.3c3.32,0,5.47-1.79,5.94-4.59l1.62-10.56h8.04l-1.65,10.75
		c-0.45,2.68,1.18,4.4,5.13,4.4h2.3l-1.23,7.33H236.56z"/>
	<path style="clip-path:url(#SVGID_2_);fill:#00B5F0;" d="M258.31,79.97c-3.96,0-6.95-1.15-9.11-3.13
		c-2.65,2.11-6.14,3.13-9.97,3.13h-2.3l1.23-7.33h2.3c3.32,0,5.47-1.79,5.94-4.59l1.61-10.49h8.04l-1.64,10.68
		c-0.45,2.68,1.18,4.4,5.13,4.4h2.3l-1.23,7.33H258.31z"/>
	<path style="clip-path:url(#SVGID_2_);fill:#00B5F0;" d="M258.69,79.97l1.23-7.33h20.8C282.78,56.56,267,57.45,267,57.45l1.2-7.14
		c17.41,0,22.6,10.91,20.48,23.54l-1.03,6.12H258.69z"/>
	<path style="clip-path:url(#SVGID_2_);fill:#00B5F0;" d="M217.37,72.63c-4.15,0-6.45-1.85-6.27-5.23
		c0.12-0.7,2.23-12.23,5.72-33.09l-8.55,3.42l-5.02,28.9c-0.66,3.95-2.73,6-6.81,6h-33.34l-1.1,7.33h33.21
		c4.79-0.06,8.69-1.6,11.56-4.27c1.48,2.62,5.15,4.27,9.36,4.27h0.96l1.23-7.33H217.37z"/>
	<path style="clip-path:url(#SVGID_2_);fill:#231F20;" d="M91.36,67.35c-0.3,1.84-0.8,3.57-1.48,5.2c-0.69,1.63-1.64,3.04-2.87,4.25
		c-1.23,1.21-2.78,2.17-4.64,2.87c-1.87,0.7-4.14,1.06-6.81,1.06c-2.46,0-4.52-0.3-6.19-0.89c-1.67-0.6-3.02-1.29-4.04-2.08
		l3.9-6.55c0.94,0.61,1.97,1.15,3.09,1.62c1.11,0.47,2.37,0.7,3.78,0.7c2.06,0,3.62-0.5,4.69-1.52c1.07-1.01,1.8-2.71,2.2-5.09
		l4.6-27.6l9.33-5.02L91.36,67.35z"/>
	<polygon style="clip-path:url(#SVGID_2_);fill:#231F20;" points="92.37,79.97 98.59,42.45 123.93,42.45 122.76,49.54 105.87,49.54 
		104.64,56.9 119.64,56.9 118.49,63.83 103.49,63.83 102,72.87 120.13,72.87 118.96,79.97 	"/>
	<polygon style="clip-path:url(#SVGID_2_);fill:#231F20;" points="157.7,42.45 156.51,49.65 145.19,49.65 140.16,79.97 
		131.72,79.97 136.74,49.65 125.43,49.65 126.62,42.45 	"/>
	<path style="clip-path:url(#SVGID_2_);fill:#231F20;" d="M176.24,79.97c-0.56-1.22-1.24-2.54-2.03-3.96
		c-0.79-1.42-1.67-2.85-2.62-4.29c-0.95-1.44-1.97-2.82-3.06-4.14c-1.08-1.32-2.19-2.49-3.33-3.5l-2.63,15.89h-8.45l6.22-37.52h8.45
		l-2.34,14.1c2.55-2.28,5.15-4.67,7.8-7.16c2.65-2.49,5.11-4.81,7.36-6.94h10.02c-3.06,3.04-6.11,5.97-9.16,8.77
		c-3.05,2.81-6.24,5.63-9.56,8.47c2.59,2.5,4.99,5.47,7.21,8.91c2.22,3.44,4.27,7.23,6.16,11.37H176.24z"/>
	<path style="clip-path:url(#SVGID_2_);fill:#00B5F0;" d="M302.72,84.84c0,0-118.64-3.09-221.02,0
		C81.7,84.84,244.21,85.96,302.72,84.84"/>
	<polygon style="clip-path:url(#SVGID_2_);fill:#00B5F0;" points="223.94,50.42 225.27,42.45 231.78,42.45 230.44,50.42 	"/>
	<polygon style="clip-path:url(#SVGID_2_);fill:#00B5F0;" points="231.78,50.42 233.12,42.45 239.63,42.45 238.29,50.42 	"/>
	<path style="clip-path:url(#SVGID_2_);fill:#00B5F0;" d="M57.35,39.02l0.01,7.22l9.07-0.01c1.14-2.2,1.9-4.64,2.16-7.22
		L57.35,39.02z"/>
	<path style="clip-path:url(#SVGID_2_);fill:#00B5F0;" d="M57.35,33.49l11.04-0.01c-0.37-2.09-1.06-4.07-2.01-5.88l-9.03,0.01
		L57.35,33.49z"/>
	<path style="clip-path:url(#SVGID_2_);fill:#00B5F0;" d="M50.62,51.91l-0.03-29.95l11.32-0.01c-3.54-3.13-8.2-5.04-13.3-5.03
		c-0.79,0-1.58,0.05-2.34,0.14l0.02,24.79c0,1.47-0.16,2.85-0.49,4.15c-0.33,1.3-0.9,2.43-1.72,3.39c-0.82,0.97-1.93,1.73-3.33,2.29
		c-1.29,0.52-2.9,0.79-4.81,0.83c3.46,2.83,7.89,4.53,12.71,4.53c5.15,0,9.84-1.95,13.39-5.14L50.62,51.91z"/>
	<path style="clip-path:url(#SVGID_2_);fill:#00B5F0;" d="M31.81,46.22c0.95,0.37,1.99,0.56,3.11,0.56c1.64,0,2.82-0.4,3.54-1.21
		c0.72-0.81,1.08-2.16,1.08-4.06l-0.02-22.41c-6.51,3.32-10.97,10.08-10.97,17.9c0,3.11,0.71,6.05,1.97,8.67
		C30.95,45.86,31.37,46.05,31.81,46.22"/>
</g>
<polygon style="fill:#00B5F0;" points="237.39,97.53 238.72,89.56 245.8,89.56 244.47,97.53 "/>
<polygon style="fill:#00B5F0;" points="245.8,97.53 247.14,89.56 254.22,89.56 252.88,97.53 "/>
<polygon style="fill:#00B5F0;" points="266.22,97.53 267.55,89.56 275.53,89.56 274.19,97.53 "/>
</svg>

`;

export default (props) => (
  <SvgCss
    xml={xml}
    width={props.width}
    height={props.height}
    // stroke={props.stroke}
  />
);
