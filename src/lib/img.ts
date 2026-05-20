const basePath = process.env.NODE_ENV === "production" ? "/neostar" : "";
export const img = (src: string) => `${basePath}${src}`;
