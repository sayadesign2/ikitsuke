#!/bin/bash
set -e

SLIDES_DIR="/Users/sayaka/dev/ikitsuke/concept_video_slides"
AUDIO_DIR="/Users/sayaka/dev/ikitsuke/narration_v2"
WORK_DIR="/tmp/ikitsuke_video_build"
OUTPUT_MP4="/Users/sayaka/dev/ikitsuke/ikitsuke_concept_video.mp4"

mkdir -p "$WORK_DIR"

echo "=== Step 1: Building Individual Scene Videos (Synced to Narration) ==="

for i in $(seq 1 10); do
  num=$(printf "%02d" $i)
  slide="$SLIDES_DIR/scene_${num}.png"
  audio="$AUDIO_DIR/narration_${i}.wav"

  if [ ! -f "$slide" ] || [ ! -f "$audio" ]; then
    echo "Error: missing $slide or $audio"
    exit 1
  fi

  # 音声の長さ取得
  dur=$(ffprobe -v quiet -show_format "$audio" | grep duration | cut -d= -f2)
  # 先頭0.5秒 + 末尾1.0秒のマージン
  total_dur=$(echo "$dur + 1.5" | bc)

  echo "Scene $num: speech=${dur}s, total=${total_dur}s"

  # マージン付き音声を生成
  ffmpeg -y \
    -f lavfi -i "anullsrc=r=44100:cl=mono" \
    -i "$audio" \
    -filter_complex "[0:a]atrim=duration=0.5[lead];[lead][1:a]concat=n=2:v=0:a=1[padded]" \
    -map "[padded]" \
    -t "$total_dur" \
    -ar 44100 -ac 1 -c:a pcm_s16le \
    "$WORK_DIR/audio_${num}.wav" 2>/dev/null

  # Scene 05 は動的なアニメーション動画（コンフェッティ＆帰宅アクション）が存在する場合はそれを利用
  if [ "$i" -eq 5 ] && [ -f "$WORK_DIR/scene_05.mp4" ]; then
    echo "Scene $num: Using recorded dynamic animation video (scene_05.mp4)"
    continue
  fi

  # 画像と音声を合成してシーン動画を作成 (1920x1080 30fps)
  ffmpeg -y \
    -loop 1 -framerate 30 -i "$slide" \
    -i "$WORK_DIR/audio_${num}.wav" \
    -c:v libx264 -tune stillimage -pix_fmt yuv420p \
    -c:a aac -b:a 192k -ar 44100 \
    -shortest \
    -movflags +faststart \
    "$WORK_DIR/scene_${num}.mp4" 2>/dev/null

  echo "Generated: scene_${num}.mp4"
done

echo ""
echo "=== Step 2: Concatenating All 10 Scenes into Full Video ==="

cat > "$WORK_DIR/concat_list.txt" << EOF
file '$WORK_DIR/scene_01.mp4'
file '$WORK_DIR/scene_02.mp4'
file '$WORK_DIR/scene_03.mp4'
file '$WORK_DIR/scene_04.mp4'
file '$WORK_DIR/scene_05.mp4'
file '$WORK_DIR/scene_06.mp4'
file '$WORK_DIR/scene_07.mp4'
file '$WORK_DIR/scene_08.mp4'
file '$WORK_DIR/scene_09.mp4'
file '$WORK_DIR/scene_10.mp4'
EOF

ffmpeg -y \
  -f concat -safe 0 -i "$WORK_DIR/concat_list.txt" \
  -c copy \
  -movflags +faststart \
  "$OUTPUT_MP4"

echo ""
echo "=== Complete! Final Concept Video Created ==="
ls -lh "$OUTPUT_MP4"
ffprobe -v quiet -print_format json -show_format "$OUTPUT_MP4" | grep -E '"duration"|"size"'
