import { join } from 'path';
import { promisify } from 'util';
import { execFile as _execFile } from 'child_process';
import { Binary } from '@binary/type';

const execFile = promisify(_execFile);

export const HOME = join(__dirname, '..', 'binary');

export default <Binary>{
  homeDir: HOME,

  binaryDir: HOME,

  async version() {
    const libFile = (() => {
      switch (process.platform) {
        case 'win32': return 'JLink_x64.dll';
        case 'darwin': return 'libjlinkarm.dylib';
        default: return 'libjlinkarm.so';
      }
    })();

    const versionExe = join(__dirname, '..', `jlink-version_${process.platform}`);
    const { stdout } = await execFile(versionExe, [join(this.binaryDir, libFile)]);
    return stdout.trim();
  }
};
