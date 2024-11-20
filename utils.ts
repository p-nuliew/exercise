import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * 获取基于当前模块的文件路径
 * @param {string} fileName - 文件名或相对路径
 * @param {string} metaUrl - 模块的 `import.meta.url`
 * @returns {string} - 文件的绝对路径
 */
export function getFilePath(fileName: string, metaUrl: string): string {
  // 获取当前模块所在目录
  const currentDir = dirname(fileURLToPath(metaUrl));
  // 拼接文件路径并返回
  return resolve(currentDir, fileName);
}
