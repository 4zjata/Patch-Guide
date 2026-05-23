// Website Content and Translations Configuration
// Edit these strings to change the text displayed on the website.
// To translate, you can edit this config directly or create a copy in another language.

const TRANSLATIONS = {
  currentLanguage: 'en',

  // General UI Elements
  ui: {
    title: 'Patch Guide',
    tagline: 'Clean your apps from',
    wordsToRotate: ['ads', 'tracking', 'bloatware', 'annoyances', 'sponsors'],
    downloadNowBtn: 'Download Patched Apps',
    chooseAppHeader: 'Choose an Application',
    chooseAppSub: 'Select the app you want to install. All apps are pre-patched, ad-free, and privacy-friendly.',

    // Architectures
    archArm64: 'ARM64 (Modern phones)',
    archArm32: 'ARM32 (Older phones)',
    archUniversal: 'Universal (Works on all devices)',

    // Buttons
    downloadGmsCoreBtn: 'Download GmsCore',
    downloadAppBtn: 'Download App',
    huaweiAlertTitle: 'Huawei Device Alert',
    huaweiAlertText: 'If you are using a Huawei/Honor device without Google Services, you must tap the special "Huawei" button on the microG sign-in screen, rather than the regular sign-in.',

    // General Tips section
    generalTipsTitle: 'General Installation Tips',
    generalTipsSub: 'Read this if you encounter any issues during the installation process.',
    tips: [
      {
        title: 'Allow Unknown Sources',
        text: 'Android blocks app installations from outside the Google Play Store by default. When you open the downloaded APK, you will be prompted to allow installations from your browser. Tap "Settings" and turn on the toggle to allow it.'
      },
      {
        title: 'Play Protect Warnings',
        text: 'Because patched applications are modified and self-signed, Google Play Protect might flag them as "Unknown developer" or "Unsafe". This is normal. Simply tap "More details" or "Details" on the popup, and select "Install anyway" to proceed.'
      },
      {
        title: 'Huawei / Honor Setup',
        text: 'On devices without Google Play Services (like modern Huawei phones), when logging into GmsCore, tap the "Huawei" or "Huawei/Honor" button on the GmsCore login screen instead of the standard sign-in button. This ensures your account syncs properly.'
      }
    ],

    // Footer
    footerText: 'This site is just a guide. And does not host any files. Not affiliated with Google, YouTube, TikTok, or Instagram.'
  },

  // Supported Applications Configuration
  apps: {
    youtube: {
      name: 'YouTube ReVanced',
      description: 'The ultimate YouTube experience. Ad-free, background playback, sponsor block, return dislikes, and full customization.',
      iconColor: '#ff0000',
      requiresGmsCore: true,
      downloads: {
        universal: 'https://github.com/FiorenMas/Revanced-And-Revanced-Extended-Non-Root/releases/download/all/youtube-revanced.apk',
        arm64: 'https://github.com/FiorenMas/Revanced-And-Revanced-Extended-Non-Root/releases/download/all/youtube-arm64-v8a-revanced.apk',
        arm32: 'https://github.com/FiorenMas/Revanced-And-Revanced-Extended-Non-Root/releases/download/all/youtube-armeabi-v7a-revanced.apk'
      },
      steps: [
        {
          title: 'Step 1: Download GmsCore',
          description: 'This is a helper that enables you to sign in with your Google account.',
          isGmsCoreStep: true,
          screenshotText: 'Downloading GmsCore file...'
        },
        {
          title: 'Step 2: Enable Unknown Sources',
          description: 'When you tap to open the downloaded GmsCore file, your browser will block it and show a security prompt. Tap "Settings" on that prompt, and switch on the toggle to allow installations from your browser.',
          screenshotText: 'Allow from this source toggle screen'
        },
        {
          title: 'Step 3: Bypass Google Play Protect Alert',
          description: 'Your phone might show a Play Protect popup warning you about an "Unknown developer" or "Unsafe app". This is normal for patched files. Tap "More details" or "Details" on the popup, then select "Install anyway" to proceed.',
          screenshotText: 'Play Protect -> More details -> Install anyway'
        },
        {
          title: 'Step 4: Install GmsCore',
          description: 'Now, tap "Install" on the screen to complete the setup. Once installed, GmsCore runs silently in the background — you do not need to open it.',
          screenshotText: 'GmsCore installation success'
        },
        {
          title: 'Step 5: Download YouTube ReVanced',
          description: 'Click the button below to download the pre-patched YouTube ReVanced application file.',
          isAppDownloadStep: true,
          screenshotText: 'Downloading YouTube ReVanced file...'
        },
        {
          title: 'Step 6: Install YouTube ReVanced',
          description: 'Open the downloaded YouTube ReVanced APK file and tap "Install". Since you already enabled permissions in Step 2, the app will install instantly.',
          screenshotText: 'YouTube ReVanced installation screen'
        },
        {
          title: 'Step 7: Log In & Sync (Huawei Warning)',
          description: 'Launch the YouTube app and tap "Sign in" -> "Add Google Account". Log in with your standard credentials to sync your subscriptions. NOTE: If you are using a Huawei device, make sure to tap the "Huawei" button on the sign-in screen.',
          screenshotText: 'Account Login & Huawei button guide'
        }
      ]
    },
    youtube_music: {
      name: 'YouTube Music ReVanced',
      description: 'Ad-free music streaming. Background playback, unlimited skips, high-quality audio, and no subscription required.',
      iconColor: '#ff0055',
      requiresGmsCore: true,
      downloads: {
        universal: 'https://github.com/FiorenMas/Revanced-And-Revanced-Extended-Non-Root/releases/download/all/youtube-music-arm64-v8a-revanced.apk', // fallback
        arm64: 'https://github.com/FiorenMas/Revanced-And-Revanced-Extended-Non-Root/releases/download/all/youtube-music-arm64-v8a-revanced.apk',
        arm32: 'https://github.com/FiorenMas/Revanced-And-Revanced-Extended-Non-Root/releases/download/all/youtube-music-armeabi-v7a-revanced.apk'
      },
      steps: [
        {
          title: 'Step 1: Download GmsCore',
          description: 'his is a helper that enables you to sign in with your Google account.',
          isGmsCoreStep: true,
          screenshotText: 'Downloading GmsCore file...'
        },
        {
          title: 'Step 2: Enable Unknown Sources',
          description: 'If installing for the first time, when you open the file, tap "Settings" on the prompt and enable the toggle to allow installs from your browser.',
          screenshotText: 'Allow from this source toggle screen'
        },
        {
          title: 'Step 3: Bypass Google Play Protect Alert',
          description: 'If you see an "Unknown developer" alert, tap "More details" followed by "Install anyway". It is completely safe.',
          screenshotText: 'Play Protect -> More details -> Install anyway'
        },
        {
          title: 'Step 4: Install GmsCore',
          description: 'Tap "Install" on the screen to finish setup. GmsCore will operate quietly in the background.',
          screenshotText: 'GmsCore installation success'
        },
        {
          title: 'Step 5: Download YouTube Music ReVanced',
          description: 'Click the button below to download the pre-patched YouTube Music ReVanced application file.',
          isAppDownloadStep: true,
          screenshotText: 'Downloading YouTube Music file...'
        },
        {
          title: 'Step 6: Install YouTube Music ReVanced',
          description: 'Open the downloaded YouTube Music APK file and tap "Install" to begin the installation.',
          screenshotText: 'YouTube Music installation screen'
        },
        {
          title: 'Step 7: Log In to Load Playlists',
          description: 'Launch the application, sign in with your Google account to sync all your personal playlists, liked tracks, and custom musical feeds.',
          screenshotText: 'YouTube Music Account Sign-in screen'
        }
      ]
    },
    tiktok: {
      name: 'TikTok ReVanced',
      description: 'Clean TikTok feed with ads disabled, download restrictions removed, UI clutter cleaned up, and auto-scroll enabled.',
      iconColor: '#00f2fe',
      requiresGmsCore: false,
      downloads: {
        universal: 'https://github.com/FiorenMas/Revanced-And-Revanced-Extended-Non-Root/releases/download/all/tiktok-revanced.apk',
        arm64: 'https://github.com/FiorenMas/Revanced-And-Revanced-Extended-Non-Root/releases/download/all/tiktok-arm64-v8a-revanced.apk',
        arm32: 'https://github.com/FiorenMas/Revanced-And-Revanced-Extended-Non-Root/releases/download/all/tiktok-revanced.apk'
      },
      steps: [
        {
          title: 'Step 1: Download TikTok ReVanced',
          description: 'TikTok ReVanced does not require GmsCore. Simply click the button below to download the pre-patched APK file.',
          isAppDownloadStep: true,
          screenshotText: 'Downloading TikTok ReVanced file...'
        },
        {
          title: 'Step 2: Enable Unknown Sources',
          description: 'Open the downloaded file. Tap "Settings" when prompted and switch on the toggle to allow installations from your browser.',
          screenshotText: 'Allow from this source toggle screen'
        },
        {
          title: 'Step 3: Bypass Google Play Protect Alert',
          description: 'If Google Play Protect warns you that it is an unknown app, tap "More details" or "Details" on the popup and select "Install anyway".',
          screenshotText: 'Play Protect -> More details -> Install anyway'
        },
        {
          title: 'Step 4: Install TikTok ReVanced',
          description: 'Once warnings are handled, tap "Install" to complete setup on your device.',
          screenshotText: 'TikTok ReVanced installation screen'
        },
        {
          title: 'Step 5: Sign In & Enjoy Ad-Free',
          description: 'Launch the app, log in using your normal TikTok details, and enjoy an ad-free feed with download locks removed and auto-scroll pre-enabled.',
          screenshotText: 'TikTok Home Feed & Auto-scroll options'
        }
      ]
    },
    instagram: {
      name: 'Instagram ReVanced',
      description: 'Enjoy Instagram without sponsored posts, stories ads, or tracking. Download photos, videos, and stories directly.',
      iconColor: '#e1306c',
      requiresGmsCore: false,
      downloads: {
        universal: 'https://github.com/FiorenMas/Revanced-And-Revanced-Extended-Non-Root/releases/download/all/instagram-arm64-v8a-revanced.apk', // fallback
        arm64: 'https://github.com/FiorenMas/Revanced-And-Revanced-Extended-Non-Root/releases/download/all/instagram-arm64-v8a-revanced.apk',
        arm32: 'https://github.com/FiorenMas/Revanced-And-Revanced-Extended-Non-Root/releases/download/all/instagram-armeabi-v7a-revanced.apk'
      },
      steps: [
        {
          title: 'Step 1: Download Instagram ReVanced',
          description: 'Instagram ReVanced runs standalone without any external background services. Click the button below to get the APK file.',
          isAppDownloadStep: true,
          screenshotText: 'Downloading Instagram ReVanced file...'
        },
        {
          title: 'Step 2: Enable Unknown Sources',
          description: 'Tap on the downloaded APK file. Tap "Settings" on the alert and enable the permission toggle.',
          screenshotText: 'Allow from this source toggle screen'
        },
        {
          title: 'Step 3: Bypass Google Play Protect Alert',
          description: 'Tap "More details" and select "Install anyway" on the Google warning popup to continue safely.',
          screenshotText: 'Play Protect -> More details -> Install anyway'
        },
        {
          title: 'Step 4: Install Instagram ReVanced',
          description: 'Tap "Install" on the screen to finish setting up the app.',
          screenshotText: 'Instagram ReVanced installation screen'
        },
        {
          title: 'Step 5: Sign In & Enjoy Feed',
          description: 'Open Instagram ReVanced, log in to your account, and enjoy an ad-free feed with direct gallery downloads enabled for all stories, posts, and reels.',
          screenshotText: 'Instagram Feed with Download option'
        }
      ]
    }
  },

  // Companion Apps
  gmscore: {
    name: 'GmsCore (microG)',
    version: 'v0.3.13.2.250932',
    downloads: {
      standard: 'https://github.com/ReVanced/GmsCore/releases/download/v0.3.13.2.250932/app.revanced.android.gms-250932004-signed.apk',
      huawei: 'https://github.com/ReVanced/GmsCore/releases/download/v0.3.13.2.250932/app.revanced.android.gms-250932004-hw-signed.apk'
    }
  }
};
