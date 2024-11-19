import { fileURLToPath } from 'node:url';

export const getAbsFilePath = (filePath) => {
  // ES Module 模式使用 import.mate.url 代替 __filename
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const absFilePath = path.resolve(__dirname, filePath);
  return absFilePath;
};
