import download from '@xingrz/download2';
import { rm } from 'fs/promises';
import { join } from 'path';
import { symlink } from 'fs/promises';
import binary, { HOME } from './index';

const PACKAGE = 'jlink';
const VERSION = '7.58';

const NAME = `${PACKAGE}-${VERSION}-${process.platform}_${process.arch}.tar.zst`;

const URL = `https://cdn.iflyos.cn/public/lisa-binary/${PACKAGE}/${NAME}`;

(async () => {

  try {
    await rm(HOME, { recursive: true });
  } catch (e) {
  }

  await download(URL, HOME, {
    extract: true,
  });

  if (process.platform == 'linux') {
    await symlink('JFlashExe', join(binary.binaryDir, 'JFlash'));
    await symlink('JLinkExe', join(binary.binaryDir, 'JLink'));
  } else if (process.platform == 'darwin') {
    await symlink('JFlash.app/Contents/MacOS/JFlashExe', join(binary.binaryDir, 'JFlash'));
    await symlink('JLinkExe', join(binary.binaryDir, 'JLink'));
  }

})();
