import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  initialDestinations,
  initialRecommendation,
  initialStampBook,
  initialFamilyNotifications,
  initialWalletTransactions,
  initialDriverNotes
} from '../data/initialData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [destinations, setDestinations] = useState(() => {
    const saved = localStorage.getItem('ikitsuke_destinations');
    const raw = saved ? JSON.parse(saved) : initialDestinations;
    return raw.map(d => ({
      ...d,
      safeBoardingPoint: d.safeBoardingPoint ? d.safeBoardingPoint.replace(/（[^）]*）|\([^)]*\)/g, '').trim() : ''
    }));
  });

  const [recommendation, setRecommendation] = useState(() => {
    const saved = localStorage.getItem('ikitsuke_rec');
    const raw = saved ? JSON.parse(saved) : initialRecommendation;
    if (!raw) return null;
    return {
      ...raw,
      safeBoardingPoint: raw.safeBoardingPoint ? raw.safeBoardingPoint.replace(/（[^）]*）|\([^)]*\)/g, '').trim() : ''
    };
  });

  const [stampBook, setStampBook] = useState(() => {
    const saved = localStorage.getItem('ikitsuke_stamps');
    return saved ? JSON.parse(saved) : initialStampBook;
  });

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('ikitsuke_notifs');
    return saved ? JSON.parse(saved) : initialFamilyNotifications;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('ikitsuke_txs');
    return saved ? JSON.parse(saved) : initialWalletTransactions;
  });

  const [driverNotes, setDriverNotes] = useState(() => {
    const saved = localStorage.getItem('ikitsuke_notes');
    return saved ? JSON.parse(saved) : initialDriverNotes;
  });

  // トリップ進行状況
  // 'IDLE' | 'DISPATCHING' (手配中) | 'ARRIVING' (車接近中) | 'RIDING' (乗車・移動中) | 'ARRIVED' (目的地到着) | 'RETURNED' (無事帰宅)
  const [activeTrip, setActiveTrip] = useState(null);

  // 家族側トースト通知演出用
  const [liveToast, setLiveToast] = useState(null);

  // 本人アプリのアクティブモーダル ('stampBook' | null)
  const [userModal, setUserModal] = useState(null);

  // 家族アプリの選択タブ ('timeline' | 'destinations' | 'notes' | 'wallet')
  const [familyTab, setFamilyTab] = useState('timeline');

  // ローカルストレージ自動同期
  useEffect(() => {
    localStorage.setItem('ikitsuke_destinations', JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem('ikitsuke_notifs', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('ikitsuke_txs', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('ikitsuke_notes', JSON.stringify(driverNotes));
  }, [driverNotes]);

  useEffect(() => {
    localStorage.setItem('ikitsuke_stamps', JSON.stringify(stampBook));
  }, [stampBook]);

  // 新規通知追加ヘルパー
  const pushNotification = (notif) => {
    const newNotif = {
      id: 'notif-' + Date.now(),
      timestamp: 'たった今',
      read: false,
      ...notif,
    };
    setNotifications(prev => [newNotif, ...prev]);
    setLiveToast(newNotif);
    setTimeout(() => {
      setLiveToast(curr => (curr?.id === newNotif.id ? null : curr));
    }, 4500);
  };

  const dispatchTimerRef = useRef(null);

  const clearDispatchTimer = () => {
    if (dispatchTimerRef.current) {
      clearTimeout(dispatchTimerRef.current);
      dispatchTimerRef.current = null;
    }
  };

  // 配車開始（2秒長押し成功時）
  const startDispatch = (dest) => {
    clearDispatchTimer();
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    setActiveTrip({
      id: 'trip-' + Date.now(),
      destination: dest,
      mode: 'TAXI',
      status: 'DISPATCHING', // 手配中
      startTime: timeStr,
      driver: {
        name: '山本 浩二',
        carModel: 'JPN TAXI（濃紺）',
        carNumber: '高知 500 あ 25-25',
        company: '土佐ハイヤー',
        phone: '088-800-XXXX'
      },
      etaMinutes: dest.taxiMin || 4,
    });

    pushNotification({
      type: 'DISPATCH_REQUESTED',
      title: `「${dest.name}」へのお迎えを手配開始`,
      body: `サカエさんがイキツケからタクシーを呼びました。近隣の提携タクシーへ手配中です。`
    });

    // 2.5秒後に自動で接近中に移行
    dispatchTimerRef.current = setTimeout(() => {
      setActiveTrip(prev => {
        if (!prev || prev.status !== 'DISPATCHING') return prev;
        return { ...prev, status: 'ARRIVING' };
      });
      dispatchTimerRef.current = null;
    }, 2500);
  };

  // プレゼン・デモ・動画収録用：指定したステータスに直接確実にセット
  const forceSetTripStatus = (status, dest) => {
    clearDispatchTimer();
    if (!status) {
      setActiveTrip(null);
      return;
    }

    const targetDest = dest || destinations[0] || initialDestinations[0];
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    setActiveTrip({
      id: 'trip-demo-' + Date.now(),
      destination: targetDest,
      mode: 'TAXI',
      status: status,
      startTime: timeStr,
      driver: {
        name: '山本 浩二',
        carModel: 'JPN TAXI（濃紺）',
        carNumber: '高知 500 あ 25-25',
        company: '土佐ハイヤー',
        phone: '088-800-XXXX'
      },
      etaMinutes: targetDest.taxiMin || 4,
    });

    if (status === 'RETURNED') {
      try {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  // 徒歩・バスを選択した場合
  const startAlternativeTrip = (dest, mode) => {
    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

    if (mode === 'WALK') {
      setActiveTrip({
        id: 'trip-' + Date.now(),
        destination: dest,
        mode: 'WALK',
        status: 'RIDING',
        startTime: timeStr,
        etaMinutes: dest.walkMin,
      });
      pushNotification({
        type: 'WALK_STARTED',
        title: `「${dest.name}」へ徒歩でお出かけ`,
        body: `サカエさんが徒歩で出発しました（目標目安：約${dest.walkMin}分・${dest.walkDistance}）。いつでもタクシーを呼べる状態で見守り中です。`
      });
    } else if (mode === 'BUS') {
      setActiveTrip({
        id: 'trip-' + Date.now(),
        destination: dest,
        mode: 'BUS',
        status: 'RIDING',
        startTime: timeStr,
        busLine: dest.busLine,
        etaMinutes: dest.busMin,
      });
      pushNotification({
        type: 'BUS_STARTED',
        title: `「${dest.name}」へバスでお出かけ`,
        body: `サカエさんが${dest.busLine}（${dest.busNextDeparture}）を利用して出発しました。`
      });
    }
  };

  // トリップのステータス進行
  const advanceTrip = () => {
    if (!activeTrip) return;

    if (activeTrip.status === 'DISPATCHING') {
      setActiveTrip(prev => ({ ...prev, status: 'ARRIVING' }));
    } else if (activeTrip.status === 'ARRIVING') {
      setActiveTrip(prev => ({ ...prev, status: 'RIDING' }));
      pushNotification({
        type: 'RIDING',
        title: `タクシーにご乗車されました`,
        body: `${activeTrip.driver.company}（${activeTrip.driver.carNumber}）に乗車。目的地「${activeTrip.destination.name}」へ向かっています。`
      });
    } else if (activeTrip.status === 'RIDING') {
      // 目的地到着
      setActiveTrip(prev => ({ ...prev, status: 'ARRIVED' }));
      
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {
        // ignore
      }

      // ウォレット履歴に追加
      if (activeTrip.mode === 'TAXI') {
        const newTx = {
          id: 'tx-' + Date.now(),
          date: '本日 ' + activeTrip.startTime,
          destination: `${activeTrip.destination.name}（送迎）`,
          driver: `${activeTrip.driver.company}（${activeTrip.driver.name}）`,
          familyPayment: 1500,
          sponsorDiscount: 500,
          subsidyDiscount: 1000,
          totalCharter: 3000,
          status: '自動決済完了（家族カード Visa *8823）'
        };
        setTransactions(prev => [newTx, ...prev]);
      }

      // スタンプ帳に追加
      const newStamp = {
        id: 'stamp-' + Date.now(),
        destName: activeTrip.destination.name,
        date: '本日 ' + activeTrip.startTime,
        mode: activeTrip.mode.toLowerCase(),
        modeLabel: activeTrip.mode === 'TAXI' ? '🚕 イキツケ配車' : activeTrip.mode === 'WALK' ? '🚶 徒歩' : '🚌 コミュニティバス',
        steps: activeTrip.mode === 'WALK' ? `${activeTrip.destination.walkMin * 70}歩` : '320歩',
        note: `${activeTrip.destination.subname}へお出かけ`,
        badgeIcon: activeTrip.destination.badge === 'かかりつけ' ? '🩺' : activeTrip.destination.badge === '憩いの場' ? '🍵' : '🛒'
      };
      setStampBook(prev => [newStamp, ...prev]);

      pushNotification({
        type: 'ARRIVED',
        title: `「${activeTrip.destination.name}」に無事到着しました`,
        body: `安全に乗降完了しました。${activeTrip.mode === 'TAXI' ? '家族ウォレットより自動決済（¥1,500）が完了しています。' : ''}`
      });
    } else if (activeTrip.status === 'ARRIVED') {
      // 帰宅完了
      setActiveTrip(prev => ({ ...prev, status: 'RETURNED' }));
      try {
        confetti({
          particleCount: 65,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      pushNotification({
        type: 'SAFE_RETURN',
        title: `無事にご帰宅されました`,
        body: `ご自宅への無事のご帰着を確認しました。見守りを完了しました。お疲れさまでした！`
      });
    } else if (activeTrip.status === 'RETURNED') {
      // リセットして通常待機
      setActiveTrip(null);
    }
  };

  // トリップのキャンセル・終了
  const cancelTrip = () => {
    clearDispatchTimer();
    if (!activeTrip) return;

    if (activeTrip.mode === 'WALK') {
      pushNotification({
        type: 'WALK_CANCELLED',
        title: `徒歩でのお出かけを終了しました`,
        body: `「${activeTrip.destination.name}」への徒歩移動を終了し、自宅待機状態に戻りました。`
      });
    } else if (activeTrip.mode === 'BUS') {
      pushNotification({
        type: 'BUS_CANCELLED',
        title: `バスでのお出かけを終了しました`,
        body: `「${activeTrip.destination.name}」へのバス移動を終了し、自宅待機状態に戻りました。`
      });
    } else {
      pushNotification({
        type: 'CANCELLED',
        title: `タクシー配車をキャンセルしました`,
        body: `「${activeTrip.destination.name}」への配車リクエストを取り消しました。キャンセル料は発生しません。`
      });
    }

    setActiveTrip(null);
  };

  // レコメンドから「いつもの場所」へ追加
  const addFromRecommendation = () => {
    if (!recommendation) return;

    const newDest = {
      ...recommendation,
      id: 'dest-' + Date.now(),
      badge: '朝市・行事',
      badgeColor: '#EA580C',
      isFavorite: true,
      taxiFare: '1,500',
      totalFare: '3,000',
      sponsorContribution: '500',
      citySubsidy: '1,000',
    };

    // 登録数に上限を設けず、すべてイキツケとして追加
    setDestinations(prev => [newDest, ...prev]);

    setRecommendation(null);

    pushNotification({
      type: 'DESTINATION_ADDED',
      title: `「${newDest.name}」がいつもの場所に加わりました`,
      body: `街の動きレコメンドより、本人アプリのイキツケ一覧へ新しく追加されました。`
    });
  };

  // 家族側からの行き先追加（4件以上も何件でも登録可能）
  const addDestinationByFamily = (destData) => {
    const newDest = {
      id: 'dest-' + Date.now(),
      badge: destData.badge || '家族登録',
      badgeColor: '#16324F',
      walkMin: destData.walkMin || 15,
      walkDistance: '900m',
      busMin: 8,
      busLine: '市街地巡回',
      busNextDeparture: '10:20発',
      taxiMin: 5,
      taxiFare: '1,500',
      totalFare: '3,000',
      sponsorContribution: '500',
      citySubsidy: '1,000',
      image: destData.image || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      isFavorite: true,
      ...destData,
    };

    setDestinations(prev => [newDest, ...prev]);

    pushNotification({
      type: 'FAMILY_UPDATED',
      title: `「${destData.name}」をイキツケに登録しました`,
      body: `乗降位置「${destData.safeBoardingPoint || '安全な乗降位置'}」を設定し、本人の画面に追加されました。`
    });
  };

  // 行き先の並び順変更（上へ / 下へ）
  const moveDestination = (id, direction) => {
    setDestinations(prev => {
      const idx = prev.findIndex(d => d.id === id);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.length) return prev;
      const copy = [...prev];
      const [item] = copy.splice(idx, 1);
      copy.splice(targetIdx, 0, item);
      return copy;
    });
  };

  // 本人側からのその他の場所登録
  const addCustomDestination = (spot) => {
    const newDest = {
      ...spot,
      id: 'dest-' + Date.now(),
      isFavorite: true,
      badge: spot.badge || '指定場所',
      badgeColor: spot.badgeColor || '#16324F',
      pinnedToHome: true,
    };

    setDestinations(prev => [newDest, ...prev]);

    pushNotification({
      type: 'DESTINATION_ADDED',
      title: `サカエさんが「${newDest.name}」を登録しました`,
      body: `本人アプリの場所指定より、「いつもの場所」へ新しく追加されました。`
    });
  };

  // 行き先削除
  const deleteDestination = (id) => {
    setDestinations(prev => prev.filter(d => d.id !== id));
  };

  // 配慮メモの切り替え
  const toggleDriverNote = (id) => {
    setDriverNotes(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, active: !item.active } : item)
    }));
  };

  const updateCustomNote = (text) => {
    setDriverNotes(prev => ({ ...prev, custom: text }));
  };

  // 全状態のリセット
  const resetAllState = () => {
    setDestinations(initialDestinations);
    setRecommendation(initialRecommendation);
    setStampBook(initialStampBook);
    setNotifications(initialFamilyNotifications);
    setTransactions(initialWalletTransactions);
    setDriverNotes(initialDriverNotes);
    setActiveTrip(null);
    setLiveToast(null);
    setUserModal(null);
    localStorage.clear();
  };

  // 本人アプリのホーム画面に表示する行き先（4件に限定せず登録された全件をそのまま表示）
  const homeDestinations = destinations;

  return (
    <AppContext.Provider
      value={{
        destinations,
        homeDestinations,
        recommendation,
        stampBook,
        notifications,
        transactions,
        driverNotes,
        activeTrip,
        liveToast,
        userModal,
        familyTab,
        setUserModal,
        setFamilyTab,
        startDispatch,
        startAlternativeTrip,
        advanceTrip,
        cancelTrip,
        addFromRecommendation,
        addDestinationByFamily,
        addCustomDestination,
        moveDestination,
        deleteDestination,
        toggleDriverNote,
        updateCustomNote,
        resetAllState,
        pushNotification,
        forceSetTripStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
