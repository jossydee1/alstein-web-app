const allowedImageFormats = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/heic",
];

export const invalidImageTypeError =
  "Only .png, .heic, .jpg and .jpeg formats are allowed.";

export const containsInvalidImageType = (file: File) =>
  !allowedImageFormats.includes(file.type);
