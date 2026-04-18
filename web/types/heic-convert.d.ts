declare module "heic-convert" {
  interface ConvertOptions {
    buffer: ArrayBufferLike | Uint8Array | Buffer;
    format: "JPEG" | "PNG";
    quality?: number;
  }
  function convert(opts: ConvertOptions): Promise<ArrayBuffer>;
  export default convert;
}
