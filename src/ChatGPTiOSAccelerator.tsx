import React, { useState, useEffect } from "react";

export default function ChatGPTiOSAccelerator() {
  const [status, setStatus] = useState("等待語氣輸入…");
  const [loading, setLoading] = useState(false);
  const [badges, setBadges] = useState([
    "語氣封印中",
    "自動模組快取",
    "iOS 任務對位完成",
  ]);

  const handleCommand = (cmd: string) => {
    if (cmd === "清理碎片" || cmd === "記憶刷新" || cmd === "清理加速") {
      setLoading(true);
      setStatus("系統清理中…");
      setTimeout(() => {
        setStatus("碎片與記憶已清空");
        setBadges([]);
        setLoading(false);
      }, 1000);
      return;
    }

    setLoading(true);
    setStatus("語氣辨識中：" + cmd);
    setTimeout(() => {
      setStatus("任務執行：「" + cmd + "」已完成");
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    return () => {
      setStatus("等待語氣輸入…");
      setLoading(false);
      setBadges([]);
    };
  }, []);

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>語氣任務加速器</h1>

      <div style={{ margin: '1rem 0', padding: '1rem', background: '#f9f9f9', borderRadius: '8px' }}>
        <div style={{ fontSize: '0.875rem', color: '#666' }}>目前狀態：</div>
        <div style={{ fontSize: '1rem', fontWeight: '500' }}>
          {loading ? '載入中…' : ''} {status}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        <button onClick={() => handleCommand("上傳截圖")}>上傳截圖</button>
        <button onClick={() => handleCommand("開啟地圖")}>開啟地圖</button>
        <button onClick={() => handleCommand("語氣查詢紀錄")}>查詢紀錄</button>
        <button onClick={() => handleCommand("封印語氣 × 加速模組")}>語氣加速</button>
        <button onClick={() => handleCommand("清理加速")}>清理加速</button>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <input
          placeholder="請輸入語氣指令，例如『幫我找圖片』"
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              handleCommand((e.target as HTMLInputElement).value)
          }}
        />
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {badges.map((badge, i) => (
          <span key={i} style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '0.25rem 0.5rem' }}>
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}