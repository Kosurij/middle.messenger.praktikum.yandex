declare module "*.css" {
  declare const styles: Record<string, string>;

  export default styles;
}

declare module "*.less" {
  declare const styles: Record<string, string>;

  export default styles;
}

declare module "*.png"
