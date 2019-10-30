require('dotenv').config({ path: './.env.local' });
const fs = require('fs');
const path = require('path');
const { notarize } = require('electron-notarize');
const { APPLE_ID, SKIP_SIGN, APPLE_ID_PASS } = process.env;

module.exports = async function(params) {
  const { electronPlatformName, appOutDir } = params;

  // Only notarize the app on Mac OS only.
  if (electronPlatformName !== 'darwin' || SKIP_SIGN === 'true') {
    return;
  }

  console.log('afterSign hook triggered');

  // Same appId in electron-builder.
  let appId = 'com.kitze.jsui';

  let appPath = path.join(appOutDir, `${params.packager.appInfo.productFilename}.app`);

  if (!fs.existsSync(appPath)) {
    throw new Error(`Cannot find application at: ${appPath}`);
  }

  console.log(`Notarizing ${appId} found at ${appPath}`);

  try {
    const notarizeConfig = {
      appBundleId: appId,
      appPath: appPath,
      appleId: APPLE_ID,
      appleIdPassword: APPLE_ID_PASS
    };
    await notarize(notarizeConfig);
  } catch (error) {
    console.error(error);
  }

  console.log(`Done notarizing ${appId}`);
};
