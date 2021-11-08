import { join } from 'path';
import { Library } from 'ffi-napi';
import { Binary } from '@binary/type';

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

    const lib = new Library(join(this.binaryDir, libFile), {
      'JLINKARM_GetDLLVersion': ['int', []],
    });

    const version = lib.JLINKARM_GetDLLVersion();
    const major = Math.floor(version / 1_00_00);
    const minor = `${Math.floor(version / 1_00) % 1_00}`.padStart(2, '0');

    const idx = version % 1_00;
    const rev = idx == 0 ? '' : String.fromCodePoint('a'.charCodeAt(0) + (idx - 1));

    return `V${major}.${minor}${rev}`;
  }
};
