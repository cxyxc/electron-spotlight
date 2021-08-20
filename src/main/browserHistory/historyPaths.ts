const Path = require('path');

const homeDirectory = process.env.HOME;

type DefaultPaths = Record<string, string>;

function setupForWindows(defaultPaths: DefaultPaths) {
  const appDataDirectory = Path.join(
    process.env.HOMEDRIVE,
    'Users',
    process.env.USERNAME,
    'AppData'
  );

  defaultPaths.chrome = Path.join(
    appDataDirectory,
    'Local',
    'Google',
    'Chrome'
  );
  defaultPaths.avast = Path.join(
    appDataDirectory,
    'Local',
    'Google',
    'AVAST Software'
  );
  defaultPaths.firefox = Path.join(
    appDataDirectory,
    'Roaming',
    'Mozilla',
    'Firefox'
  );
  defaultPaths.opera = Path.join(appDataDirectory, 'Roaming', 'Opera Software');
  defaultPaths.edge = Path.join(appDataDirectory, 'Local', 'Microsoft', 'Edge');
  defaultPaths.torch = Path.join(
    appDataDirectory,
    'Local',
    'Torch',
    'User Data'
  );
  defaultPaths.seamonkey = Path.join(
    appDataDirectory,
    'Roaming',
    'Mozilla',
    'SeaMonkey'
  );
  defaultPaths.brave = Path.join(appDataDirectory, 'Local', 'BraveSoftware');
}

function setupForMac(defaultPaths: DefaultPaths) {
  defaultPaths.chrome = Path.join(
    homeDirectory,
    'Library',
    'Application Support',
    'Google',
    'Chrome'
  );
  defaultPaths.avast = Path.join(
    homeDirectory,
    'Library',
    'Application Support',
    'AVAST Software',
    'Browser'
  );
  defaultPaths.firefox = Path.join(
    homeDirectory,
    'Library',
    'Application Support',
    'Firefox'
  );
  defaultPaths.edge = Path.join(
    homeDirectory,
    'Library',
    'Application Support',
    'Microsoft Edge'
  );
  // defaultPaths.safari = Path.join(homeDirectory, "Library", "Safari");
  defaultPaths.opera = Path.join(
    homeDirectory,
    'Library',
    'Application Support',
    'com.operasoftware.Opera'
  );
  defaultPaths.maxthon = Path.join(
    homeDirectory,
    'Library',
    'Application Support',
    'com.maxthon.mac.Maxthon'
  );
  defaultPaths.vivaldi = Path.join(
    homeDirectory,
    'Library',
    'Application Support',
    'Vivaldi'
  );
  defaultPaths.seamonkey = Path.join(
    homeDirectory,
    'Library',
    'Application Support',
    'SeaMonkey',
    'Profiles'
  );
  defaultPaths.brave = Path.join(
    homeDirectory,
    'Library',
    'Application Support',
    'BraveSoftware',
    'Brave-Browser'
  );
}

function setupForLinux(defaultPaths: DefaultPaths) {
  defaultPaths.firefox = Path.join(homeDirectory, '.mozilla', 'firefox');
  defaultPaths.chrome = Path.join(
    homeDirectory,
    '.config',
    'google-chrome',
    'Default'
  );
}

export default function setupDefaultPaths(defaultPaths: DefaultPaths): void {
  switch (process.platform) {
    case 'darwin':
      setupForMac(defaultPaths);
      break;
    case 'linux':
      setupForLinux(defaultPaths);
      break;
    case 'win32':
      setupForWindows(defaultPaths);
      break;
    default:
      // eslint-disable-next-line no-console
      console.error(`Platform ${process.platform} is not supported`);
  }
}