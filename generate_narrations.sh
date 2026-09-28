#!/bin/bash
set -e

AUDIO_DIR="/Users/sayaka/dev/ikitsuke/narration_v2"
mkdir -p "$AUDIO_DIR"

echo "=== Generating Narration Audio (ja_JP - Kyoko) ==="

# 10シーンのナレーション原稿
texts=(
  "イキツケは、高齢者の自立とプライドを守る移動定着サービスです。本人の画面には写真と大きなアイコンだけ。文字入力や地図検索を全廃し、迷わずいつもの居場所を選べます。"
  "配車は直感的な2秒長押しだけ。誤タップを防ぎながら、本人の確かな意思決定を支援します。家族アプリには手配開始がサイレント通知で届き、そっと見守られます。"
  "外出中は提携タクシーのお守り待機枠を自動キープ。帰れなくなる不安を根本から解消し、顔なじみの乗務員が到着して目的地まで安心にお送りします。"
  "店舗に到着したら、財布を取り出す必要はありません。家族負担、協賛店舗、自治体補助の三者分散ウォレットから自動でキャッシュレス決済されます。"
  "無事に帰宅すると、確保していた待機枠はペナルティなく自動解放。手帳にお出かけスタンプが蓄積され、次の外出への自己肯定感が育まれます。"
  "ここからは家族の黒子支援です。家族アプリのイキツケ設定では、店舗東側スロープ前など、安全に乗降できる位置と写真を代理登録。本人のアプリへ即時反映されます。"
  "配慮メモ機能では、杖歩行や耳の遠さなどの申し送りを事前設定。介護ではなく、丁寧なおもてなしとして乗務員端末へサイレントに共有されます。"
  "家族負担1500円、店舗協賛500円、自治体補助1000円。短距離送迎をチャーター化することで、地方タクシー会社の収益化と持続可能性を両立します。"
  "本人のイキツケ手帳には、訪問回数や歩行スタンプがたまります。免許返納後も閉じこもることなく、地域の中に自分の居場所が定着していきます。"
  "家族に頭を下げて送迎を頼む依存から、尊厳ある自立移動へ。イキツケは、家族が黒子となって地域の移動インフラを支える、新しい仕組みです。"
)

for i in "${!texts[@]}"; do
  idx=$((i + 1))
  text="${texts[$i]}"
  echo "Generating scene $idx narration..."
  
  # sayコマンドでAIFF生成
  say -v Kyoko -r 175 "$text" -o "$AUDIO_DIR/narration_${idx}.aiff"
  
  # WAVに変換
  ffmpeg -y -i "$AUDIO_DIR/narration_${idx}.aiff" \
    -ar 44100 -ac 1 -c:a pcm_s16le \
    "$AUDIO_DIR/narration_${idx}.wav" 2>/dev/null
    
  dur=$(ffprobe -v quiet -show_format "$AUDIO_DIR/narration_${idx}.wav" | grep duration | cut -d= -f2)
  echo "Scene $idx duration: ${dur}s"
done

echo "=== Narration generation completed! ==="
