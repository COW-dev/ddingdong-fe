/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module '*.css';

declare module '*.svg' {
  import { FC, SVGProps } from 'react';
  const SVG: FC<SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module '*.svg?react' {
  const SVG: FC<SVGProps<SVGSVGElement>>;
  export default SVG;
}
