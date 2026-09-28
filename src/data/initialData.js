// 高知市モデルの初期データ：イキツケ（安心できる居場所）
export const initialDestinations = [
  {
    id: 'dest-1',
    name: 'サニーマート 毎日屋',
    subname: '新鮮野菜と総菜・いつものレジ係の山下さん',
    address: '高知市北本町1丁目10-25',
    badge: 'いつもの店',
    badgeColor: '#16324F',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    comfortTags: ['顔なじみの店員さん', '座れる休憩ベンチあり', 'ゆっくりレジ対応'],
    walkMin: 18,
    walkDistance: '1.1km',
    busMin: 8,
    busLine: 'とさでん交通 桟橋線',
    busNextDeparture: '10:24発',
    taxiMin: 4,
    taxiFare: '1,500', // 家族負担分
    totalFare: '3,000',
    sponsorContribution: '500', // サニーマート来店協賛
    citySubsidy: '1,000', // 高知市地域交通補助
    safeBoardingPoint: '店舗東側・屋根付きスロープ前',
    memo: '買い物の帰りは荷物が重くなるため、帰りのみ配車がおすすめ。',
    isFavorite: true,
    walkGuide: {
      route: '幹線道路を避け、城西公園沿いの平坦な緑道を進むルート',
      points: [
        '道幅が広く、車道と完全に分離された安全な歩道です',
        '途中の公園に屋根付きベンチがあり、座ってひと休みできます',
        '横断歩道はすべて音の鳴る押しボタン式信号です'
      ],
      safetyBackup: '途中で疲れたら、アプリからいつでも現在地へタクシーを呼べます'
    },
    busGuide: {
      boardingStop: '東町バス停（自宅から徒歩2分・郵便ポスト前）',
      dropoffStop: 'サニーマート前（下車してすぐ店舗東側入口）',
      fare: '運賃 200円（降車時支払い・福祉パス対応）',
      departureDetail: '10:24発（桟橋車庫行き）・約15分おきに運行',
      stepCount: '乗降口にステップが低く乗り降りしやすいノンステップバスです'
    }
  },
  {
    id: 'dest-2',
    name: '高知中央クリニック',
    subname: '内科・定期処方せん受取（担当：佐々木先生）',
    address: '高知市追手筋2丁目3-8',
    badge: 'かかりつけ',
    badgeColor: '#059669',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
    comfortTags: ['院内バリアフリー', '看護師さんの見守り', '車寄せ直結'],
    walkMin: 28,
    walkDistance: '1.8km',
    busMin: 12,
    busLine: '県交北部バス',
    busNextDeparture: '10:30発',
    taxiMin: 6,
    taxiFare: '1,500',
    totalFare: '3,000',
    sponsorContribution: '500', // クリニック連携
    citySubsidy: '1,000',
    safeBoardingPoint: '正面玄関ロータリー・車寄せ',
    memo: '火曜と金曜の午前中に定期通院。診察券は財布の右ポケット。',
    isFavorite: true,
    walkGuide: {
      route: '新川沿いの遊歩道を進み、けやき通りを直進するルート',
      points: [
        '川沿いは木陰が多く、夏でも涼しく歩けます',
        '途中の市民薬局前で給水・休憩が可能です',
        '距離が1.8kmあるため、行きは徒歩・帰りはお守り配車がおすすめ'
      ],
      safetyBackup: '途中で足が痛くなった場合は、アプリからタクシーを呼べます'
    },
    busGuide: {
      boardingStop: '県庁前通りバス停（自宅から徒歩4分）',
      dropoffStop: '中央クリニック前（病院ロータリー横に停車）',
      fare: '運賃 220円（降車時支払い）',
      departureDetail: '10:30発（市街循環線）・30分おきに運行',
      stepCount: '運転手さんが座席に着くまで発車を待ってくれます'
    }
  },
  {
    id: 'dest-3',
    name: '城下コミュニティ茶房',
    subname: '週2回のいきいき百歳体操＆囲碁サロン',
    address: '高知市丸ノ内1丁目4-15',
    badge: '憩いの場',
    badgeColor: '#7C3AED',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    comfortTags: ['いつもの窓際席', '同年代の仲間', '段差なしフラット'],
    walkMin: 12,
    walkDistance: '750m',
    busMin: 6,
    busLine: '市街地周遊バス',
    busNextDeparture: '10:15発',
    taxiMin: 3,
    taxiFare: '1,500',
    totalFare: '3,000',
    sponsorContribution: '500',
    citySubsidy: '1,000',
    safeBoardingPoint: 'コミュニティセンター正面の広い歩道前',
    memo: '仲間とお茶を飲む定例の居場所。歩いて向かうことが多い。',
    isFavorite: true,
    walkGuide: {
      route: '住宅街の中を抜ける平坦な裏道ルート（車通り極少）',
      points: [
        '車の通行がほとんどない生活道路で、安心してのんびり歩けます',
        '徒歩12分（約750m）と、毎日の健康維持に最適な距離です',
        '段差のないフラットな舗装路です'
      ],
      safetyBackup: 'いつでもタクシーを呼べるよう控えているため、安心して歩けます'
    },
    busGuide: {
      boardingStop: '町内会館前バス停（徒歩1分）',
      dropoffStop: '市民プラザ前（茶房の玄関前で停車）',
      fare: '運賃 100円（コミュニティバス100円均一運賃）',
      departureDetail: '10:15発（周遊ルート便）・20分おきに運行',
      stepCount: '小型の角の取れたコミュニティバスで乗り降り楽々'
    },
    pinnedToHome: true,
  },
  {
    id: 'dest-4',
    name: 'オーテピア高知図書館',
    subname: '読書・新聞閲覧・静かな休憩室',
    address: '高知市追手筋2丁目1-1',
    badge: '文化・読書',
    badgeColor: '#2563EB',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    comfortTags: ['静かな閲覧ソファ', 'エレベーター完備', '親切な司書さん'],
    walkMin: 22,
    walkDistance: '1.5km',
    busMin: 8,
    busLine: '市街地周遊',
    busNextDeparture: '10:45発',
    taxiMin: 5,
    taxiFare: '1,500',
    totalFare: '3,000',
    sponsorContribution: '500',
    citySubsidy: '1,000',
    safeBoardingPoint: '西側エントランスロータリー',
    memo: '館内はすべてバリアフリー。車椅子の貸出あり。',
    isFavorite: true,
    walkGuide: {
      route: '大手筋の歩道を直進するフラットなルート',
      points: [
        'アーケード街を通るため雨の日でも濡れずに移動できます',
        '館内にエレベーターと広い休憩ソファがあります'
      ],
      safetyBackup: '帰りは正面玄関からタクシーを呼べます'
    },
    busGuide: {
      boardingStop: '東町バス停',
      dropoffStop: 'オーテピア前',
      fare: '運賃 200円',
      departureDetail: '10:45発',
      stepCount: '低床バス運行'
    },
    pinnedToHome: true,
  },
  {
    id: 'dest-5',
    name: 'ひまわり調剤薬局 本町店',
    subname: '定期処方薬の一包化受取・健康相談',
    address: '高知市本町2丁目5-12',
    badge: '薬局・健康',
    badgeColor: '#059669',
    image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=800&q=80',
    comfortTags: ['お薬の一包化対応', '座って相談できる', '段差のない入口'],
    walkMin: 15,
    walkDistance: '950m',
    busMin: 6,
    busLine: '県交北部バス',
    busNextDeparture: '11:00発',
    taxiMin: 4,
    taxiFare: '1,500',
    totalFare: '3,000',
    sponsorContribution: '500',
    citySubsidy: '1,000',
    safeBoardingPoint: '薬局前専用駐車スペース',
    memo: '高知中央クリニック受診後に立ち寄ることが多い。',
    isFavorite: true,
    walkGuide: {
      route: 'クリニック横の小道を抜けて徒歩5分',
      points: ['平坦な舗装路です'],
      safetyBackup: 'タクシー呼び出し可能'
    },
    busGuide: {
      boardingStop: '本町二丁目バス停',
      dropoffStop: '薬局前',
      fare: '運賃 150円',
      departureDetail: '11:00発',
      stepCount: '低床バス'
    }
  },
  {
    id: 'dest-6',
    name: '田中さんのお宅',
    subname: 'お茶飲み友達・生け花仲間（田中 喜美代さん）',
    address: '高知市上町3丁目8-12',
    badge: '友人宅',
    badgeColor: '#D97706',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    comfortTags: ['インターホンですぐ出迎え', '縁側でお茶・庭鑑賞', '玄関スロープあり'],
    walkMin: 20,
    walkDistance: '1.2km',
    busMin: 7,
    busLine: 'とさでん交通 伊野線',
    busNextDeparture: '10:50発',
    taxiMin: 4,
    taxiFare: '1,500',
    totalFare: '3,000',
    sponsorContribution: '0',
    citySubsidy: '1,000',
    safeBoardingPoint: '田中邸正面玄関・平坦な道路前',
    memo: '長年のお茶飲み友達。木曜午後に伺うことが多い。',
    isFavorite: true,
    walkGuide: {
      route: '上町電車通り沿いの広い歩道を西に進むルート',
      points: [
        '商店街の軒先を通るため、日差しを避けて歩けます',
        '住宅街に入ると車通りが少なく静かです'
      ],
      safetyBackup: '疲れたらすぐにタクシーに切り替えられます'
    },
    busGuide: {
      boardingStop: '東町バス停',
      dropoffStop: '上町三丁目電停前',
      fare: '運賃 200円',
      departureDetail: '10:50発',
      stepCount: '低床車両'
    }
  }
];

// 新しいイキツケ候補（イキツケ開拓）
export const initialRecommendation = {
  id: 'rec-1',
  name: '喫茶 珈琲の森（木漏れ日テラス）',
  subname: '娘の陽子さんからのおすすめ',
  address: '高知市本町3丁目2-15（茶房の近く）',
  tag: '新しいイキツケ候補',
  comfortReason: '「お父さんの好きな深煎り珈琲と、落ち着いた中庭があるお店。店主の木村さんも高齢のお客さんにとても親切です」',
  image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
  description: '段差のない木製スロープ、ゆったりしたソファ席あり。静かに新聞や読書を楽しめます。',
  walkMin: 14,
  walkDistance: '900m',
  busMin: 5,
  busLine: '市街地周遊バス',
  busNextDeparture: '10:35発',
  taxiMin: 4,
  taxiFare: '1,500',
  totalFare: '3,000',
  sponsorContribution: '500',
  citySubsidy: '1,000',
  safeBoardingPoint: '店舗正面・木製ウッドデッキ前',
};

// イキツケ手帳（居場所アルバム）
export const initialStampBook = [
  {
    id: 'stamp-1',
    destName: '城下コミュニティ茶房',
    date: '昨日 14:20',
    mode: 'walk',
    modeLabel: '🚶 徒歩でお出かけ',
    steps: '1,420歩',
    note: 'いつもの窓際席で囲碁仲間と談笑。心地よい疲れ。',
    badgeIcon: '🍵'
  },
  {
    id: 'stamp-2',
    destName: 'サニーマート 毎日屋',
    date: '3日前 10:45',
    mode: 'taxi',
    modeLabel: '🚕 お守り配車',
    steps: '850歩',
    note: 'レジの山下さんに「久しぶりですね」と声をかけてもらった。',
    badgeIcon: '🛒'
  },
  {
    id: 'stamp-3',
    destName: '高知中央クリニック',
    date: '先週火曜 09:30',
    mode: 'taxi',
    modeLabel: '🚕 お守り配車',
    steps: '520歩',
    note: '佐々木先生に診察してもらい血圧安定。安心した。',
    badgeIcon: '🩺'
  },
  {
    id: 'stamp-4',
    destName: '城下コミュニティ茶房',
    date: '先週金曜 13:50',
    mode: 'bus',
    modeLabel: '🚌 コミュニティバス',
    steps: '1,100歩',
    note: '百歳体操に参加。足腰が軽くなった気分。',
    badgeIcon: '🍵'
  }
];

export const initialFamilyNotifications = [
  {
    id: 'notif-1',
    type: 'SAFE_RETURN',
    title: '無事にご帰宅されました',
    body: '城下コミュニティ茶房から自宅への帰着を確認しました。（徒歩：1,420歩達成）',
    timestamp: '昨日 15:35',
    read: true,
  },
  {
    id: 'notif-2',
    type: 'DISPATCH_COMPLETED',
    title: 'サニーマート毎日屋に到着しました',
    body: '土佐ハイヤー（山本ドライバー）にて安全に到着しました。事前決済（¥1,500）完了。',
    timestamp: '3日前 11:02',
    read: true,
  }
];

export const initialWalletTransactions = [
  {
    id: 'tx-1',
    date: '2026/09/09 10:45',
    destination: 'サニーマート 毎日屋（お買い物）',
    driver: '土佐ハイヤー（山本 浩二）',
    familyPayment: 1500,
    sponsorDiscount: 500,
    subsidyDiscount: 1000,
    totalCharter: 3000,
    status: '事前決済完了（家族カード Visa *8823）'
  },
  {
    id: 'tx-2',
    date: '2026/09/05 09:30',
    destination: '高知中央クリニック（通院支援）',
    driver: '土佐ハイヤー（佐々木 茂）',
    familyPayment: 1500,
    sponsorDiscount: 500,
    subsidyDiscount: 1000,
    totalCharter: 3000,
    status: '事前決済完了（家族カード Visa *8823）'
  }
];

export const initialDriverNotes = {
  items: [
    { id: 'note-1', text: '耳が少し遠いため、車内でははっきりとお話しください', active: true },
    { id: 'note-2', text: '杖を使用しています。ゆっくりと乗降を見守りください', active: true },
    { id: 'note-3', text: '足元の段差がある場所ではお声がけをお願いします', active: true },
  ],
  custom: 'トランクに手押し車（シルバーカー）を積み込む場合があります。'
};
