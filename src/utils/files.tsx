const GB_TO_BYTES_RATIO = 1073741824;
const MB_TO_BYTES_RATIO = 1048576;
const KB_TO_BYTES_RAIO = 1024;

enum ValidFileTypes {
  PDF = `application/pdf`,
  DOC = `application/msword`,
  DOCX = `application/vnd.openxmlformats-officedocument.wordprocessingml.document`,
}

const EXTENSION_TO_LABEL_MAP = Object.freeze({
  [ValidFileTypes.PDF]: 'pdf',
  [ValidFileTypes.DOC]: 'doc',
  [ValidFileTypes.DOCX]: 'docx',
});

const validExtensions: string[] = [
  ValidFileTypes.PDF,
  ValidFileTypes.DOC,
  ValidFileTypes.DOCX,
];

export const isValidFileType = (file: File) =>
  validExtensions.indexOf(file.type) > -1;

export const formatFileSize = (bytes: number): string => {
  if (bytes / GB_TO_BYTES_RATIO > 1) {
    return `${(bytes / GB_TO_BYTES_RATIO).toFixed(2)} GB`;
  }
  if (bytes / MB_TO_BYTES_RATIO > 1) {
    return `${(bytes / MB_TO_BYTES_RATIO).toFixed(2)} MB`;
  }

  if (bytes / KB_TO_BYTES_RAIO > 1) {
    return `${(bytes / KB_TO_BYTES_RAIO).toFixed(2)} KB`;
  }
  return `${bytes.toFixed(2)} B`;
};

export const getFileFormatLabel = (fileType: string) =>
  EXTENSION_TO_LABEL_MAP[fileType as ValidFileTypes];
