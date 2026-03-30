declare module '*.css';

declare module '*.webp' {
  const content: {
    src: string;
    height: number;
    width: number;
  };
  export default content;
}

declare module '*.png' {
  const content: {
    src: string;
    height: number;
    width: number;
  };
  export default content;
}

declare module '*.svg' {
  const content: {
    src: string;
    height: number;
    width: number;
  };
  export default content;
}
