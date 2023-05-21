/// <reference types="react-scripts" />

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.json' {
  const classes: { readonly [key: string]: string };
  export default classes;
}