import { useState, useEffect } from "react"
import { Button } from // 🔥 如果你沒有這個元件，這行要刪掉或改成 HTML button
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Mic, Upload, Zap, Loader2, RefreshCcw } from "lucide-react"

export default function ChatGPTiOSAccelerator() {
  const [status, setStatus] = useState("等待語氣輸入…")
  const [loading, setLoading] = useState(false)
  const [badges, setBadges] = useState([
    "語氣封印中",
    "自動模組快取",
    "iOS 任務對位完成",
  ])

  const handleCommand = (cmd: string) => {
    if (cmd === "清理碎片" || cmd === "記憶刷新" || cmd === "清理加速") {
      setLoading(true)
      setStatus("♻️ 系統清理中…")
      setTimeout(() => {
        setStatus("✅ 碎片與記憶已清空")
        setBadges([])
        setLoading(false)
      }, 1000)
      return
    }

    setLoading(true)
    setStatus("語氣辨識中：" + cmd)
    setTimeout(() => {
      setStatus("✅ 任務執行：「" + cmd + "」已完成")
      setLoading(false)
    }, 1200)
  }

  useEffect(() => {
    return () => {
      setStatus("等待語氣輸入…")
      setLoading(false)
      setBadges([])
    }
  }, [])

  return (
    <div className="p-6 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">📱 語氣任務加速器</h1>

      <Card className="bg-white/80 shadow-xl">
        <CardContent className="p-4 flex flex-col gap-2">
          <div className="text-sm text-muted-foreground">目前狀態：</div>
          <div className="text-lg font-medium">
            {loading ? (
              <Loader2 className="animate-spin inline-block mr-2" />
            ) : (
              <Zap className="inline-block mr-2" />
            )}
            {status}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Button onClick={() => handleCommand("上傳截圖")}>📤 上傳截圖</Button>
        <Button onClick={() => handleCommand("開啟地圖")}>🗺️ 開啟地圖</Button>
        <Button onClick={() => handleCommand("語氣查詢紀錄")}>🧠 查詢紀錄</Button>
        <Button onClick={() => handleCommand("封印語氣 × 加速模組")}>🔐 語氣加速</Button>
        <Button onClick={() => handleCommand("清理加速")}>♻️ 清理加速</Button>
      </div>

      <div className="flex gap-2 items-center">
        <Mic className="text-muted-foreground" />
        <Input
          placeholder="請以語氣輸入：如『幫我找圖片』、『太慢了』"
          onKeyDown={(e) => {
            if (e.key === "Enter")
              handleCommand((e.target as HTMLInputElement).value)
          }}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {badges.map((badge, i) => (
          <Badge key={i} variant={badge === "自動模組快取" ? "default" : "outline"}>
            {badge}
          </Badge>
        ))}
      </div>
    </div>
  )
}