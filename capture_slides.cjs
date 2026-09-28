const puppeteer = require('/Users/sayaka/dev/ikitsuke/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = 'http://localhost:5173/?mode=video';
const OUTPUT_DIR = '/Users/sayaka/dev/ikitsuke/concept_video_slides';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function captureAllScenes() {
  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log('Launching Chrome (1920x1080)...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1920,1080',
      '--hide-scrollbars'
    ],
    defaultViewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1
    }
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(URL, { waitUntil: 'networkidle0' });
  await sleep(2000);

  // 一時停止ボタンをクリックして自動進行を止める
  await page.evaluate(() => {
    const pauseBtn = document.querySelector('.vp-play-toggle-btn');
    if (pauseBtn && pauseBtn.textContent.includes('一時停止')) {
      pauseBtn.click();
    }
  });
  await sleep(500);

  // 10シーンを順に切り替えて撮影
  for (let i = 0; i < 10; i++) {
    const sceneNum = i + 1;
    console.log(`Switching to Scene ${sceneNum}...`);

    await page.evaluate((targetIdx) => {
      const steps = document.querySelectorAll('.vp-step');
      if (steps[targetIdx]) {
        steps[targetIdx].click();
      }
    }, i);

    // アニメーション・状態反映待ち
    await sleep(2000);

    const filePath = path.join(OUTPUT_DIR, `scene_${String(sceneNum).padStart(2, '0')}.png`);
    await page.screenshot({ path: filePath });
    console.log(`Saved: ${filePath}`);
  }

  await browser.close();
  console.log('All 10 scenes captured successfully!');
}

captureAllScenes().catch(err => {
  console.error('Capture error:', err);
  process.exit(1);
});
