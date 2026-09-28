const puppeteer = require('/Users/sayaka/dev/ikitsuke/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const URL = 'http://localhost:5173/?mode=video';
const TEMP_FRAMES_DIR = '/tmp/ikitsuke_scene05_frames';
const OUTPUT_VIDEO = '/tmp/ikitsuke_video_build/scene_05_raw.mp4';
const FINAL_SCENE_05 = '/tmp/ikitsuke_video_build/scene_05.mp4';
const AUDIO_FILE = '/tmp/ikitsuke_video_build/audio_05.wav';

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function recordScene05() {
  if (fs.existsSync(TEMP_FRAMES_DIR)) {
    fs.rmSync(TEMP_FRAMES_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEMP_FRAMES_DIR, { recursive: true });

  console.log('Launching Chrome to record Scene 5 (Arrival -> Home Return with Confetti)...');
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
  await sleep(1500);

  // 一時停止ボタンをクリック
  await page.evaluate(() => {
    const pauseBtn = document.querySelector('.vp-play-toggle-btn');
    if (pauseBtn && pauseBtn.textContent.includes('一時停止')) {
      pauseBtn.click();
    }
  });
  await sleep(300);

  // Scene 5（安心帰宅）を直接クリック（forceSetTripStatus('ARRIVED')が発火して到着状態になる）
  await page.evaluate(() => {
    const steps = document.querySelectorAll('.vp-step');
    if (steps[4]) steps[4].click();
  });
  await sleep(800);

  // CDPセッション開始
  const client = await page.target().createCDPSession();
  let frameIndex = 0;
  let isRecording = true;

  client.on('Page.screencastFrame', async ({ data, sessionId }) => {
    if (isRecording) {
      const idx = String(frameIndex++).padStart(5, '0');
      const framePath = path.join(TEMP_FRAMES_DIR, `frame_${idx}.png`);
      fs.writeFileSync(framePath, Buffer.from(data, 'base64'));
    }
    try {
      await client.send('Page.screencastFrameAck', { sessionId });
    } catch (e) {}
  });

  console.log('Starting screencast recording (Scene 5)...');
  await client.send('Page.startScreencast', {
    format: 'png',
    everyNthFrame: 1
  });

  // 1.5秒間「到着・自宅へ無事帰宅した」ボタンが表示されている状態を記録
  await sleep(1500);

  // 「自宅へ無事帰宅した」ボタンをクリックして帰宅完了＆コンフェッティ発火！
  console.log('Triggering safe return & confetti...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const returnBtn = btns.find(b => b.textContent && b.textContent.includes('自宅へ無事帰宅'));
    if (returnBtn) {
      returnBtn.click();
    }
  });

  // コンフェッティが舞い上がり、落ちて、手帳と見守りログが完了するまで録画（合計13.85秒）
  await sleep(12500);

  isRecording = false;
  await client.send('Page.stopScreencast');
  console.log(`Finished recording. Total captured frames: ${frameIndex}`);

  // コンフェッティが落ち着いた後のクリーンな帰宅完了画面をscene_05.pngとして保存
  const slidePath = '/Users/sayaka/dev/ikitsuke/concept_video_slides/scene_05.png';
  await page.screenshot({ path: slidePath });
  console.log(`Updated clean slide screenshot for Scene 5: ${slidePath}`);

  await browser.close();

  // フレームから動画を生成
  // 録画時間に応じたfps計算、または30fpsで目的の時間（13.85秒）にフィット
  console.log('Encoding frames to MP4 with ffmpeg...');
  const totalDuration = 13.854512;
  const calculatedFps = frameIndex / totalDuration;
  console.log(`Calculated FPS: ${calculatedFps.toFixed(2)}`);

  execSync(`ffmpeg -y -framerate ${calculatedFps} -i "${TEMP_FRAMES_DIR}/frame_%05d.png" -c:v libx264 -pix_fmt yuv420p -r 30 "${OUTPUT_VIDEO}"`, { stdio: 'inherit' });

  // 音声と結合
  if (fs.existsSync(AUDIO_FILE)) {
    console.log('Muxing with narration audio...');
    execSync(`ffmpeg -y -i "${OUTPUT_VIDEO}" -i "${AUDIO_FILE}" -c:v copy -c:a aac -b:a 192k -ar 44100 -shortest -movflags +faststart "${FINAL_SCENE_05}"`, { stdio: 'inherit' });
    console.log(`Successfully created dynamic scene_05.mp4: ${FINAL_SCENE_05}`);
  }
}

recordScene05().catch(err => {
  console.error('Error recording scene 5:', err);
  process.exit(1);
});
