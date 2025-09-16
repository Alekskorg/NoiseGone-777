import { useCallback, useMemo, useRef, useState } from 'react'

const MAX_MINUTES = 5

function secondsToHMS(sec: number) {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function DropZone() {
  const [dragOver, setDragOver] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [readyUrl, setReadyUrl] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const onSelect = useCallback(async (f: File) => {
    setError(null)
    setReadyUrl(null)
    setProgress(0)
    setFile(f)

    // decode duration via Web Audio API
    try {
      const arr = await f.arrayBuffer()
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const audioBuf = await ctx.decodeAudioData(arr.slice(0))
      const dur = audioBuf.duration
      setDuration(dur)
      if (dur > MAX_MINUTES * 60) {
        setError(`Файл слишком длинный: ${secondsToHMS(dur)}. Лимит — ${MAX_MINUTES} минут.`)
        setFile(null)
        return
      }
    } catch (e) {
      setError('Не удалось прочитать аудио. Попробуйте WAV/MP3.')
      setFile(null)
      return
    }

    // mock processing with progress
    let p = 0
    const timer = setInterval(() => {
      p += Math.random() * 12 + 6 // 6–18%
      if (p >= 100) {
        p = 100
        clearInterval(timer)
        // for demo, return the same file as "processed"
        const url = URL.createObjectURL(f)
        setReadyUrl(url)
      }
      setProgress(Math.floor(p))
    }, 250)
  }, [])

  const onDrop = useCallback((ev: React.DragEvent) => {
    ev.preventDefault()
    setDragOver(false)
    const f = ev.dataTransfer.files?.[0]
    if (f) onSelect(f)
  }, [onSelect])

  const onChange = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const f = ev.target.files?.[0]
    if (f) onSelect(f)
  }, [onSelect])

  const border = dragOver ? 'border-ng-accent/60 bg-white/5' : 'border-white/10'

  return (
    <div className="bg-ng-card/60 rounded-3xl p-6 border border-white/5 shadow-soft">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`rounded-2xl border-2 ${border} p-8 text-center transition-colors cursor-pointer`}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={onChange}
        />
        <div className="text-lg font-medium">Перетащите аудио сюда или нажмите, чтобы выбрать</div>
        <div className="text-sm text-white/60 mt-2">MP3 / WAV / M4A • Лимит: 5 минут</div>
      </div>

      {error && (
        <div className="mt-4 text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-xl p-3">{error}</div>
      )}

      {file && !error && (
        <div className="mt-4 grid gap-2">
          <div className="text-sm text-white/80">Файл: <span className="text-white">{file.name}</span></div>
          {duration != null && (
            <div className="text-xs text-white/60">Длина: {secondsToHMS(duration)}</div>
          )}
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-ng-accent transition-all" style={{ width: `${progress}%` }} />
          </div>
          <div className="text-xs text-white/60">Прогресс: {progress}%</div>
        </div>
      )}

      {readyUrl && (
        <div className="mt-4 flex items-center gap-3">
          <a
            href={readyUrl}
            download={file ? file.name.replace(/(\.[a-z0-9]+)$/i, '-clean$1') : 'output-clean.wav'}
            className="px-4 py-2 rounded-xl bg-ng-accent/20 border border-ng-accent/40 text-ng-accent hover:bg-ng-accent/30"
          >
            Скачать результат
          </a>
          <button
            onClick={() => { setFile(null); setDuration(null); setProgress(0); setReadyUrl(null); setError(null); }}
            className="px-4 py-2 rounded-xl border border-white/10 hover:bg-white/5"
          >
            Очистить
          </button>
        </div>
      )}
    </div>
  )
}
