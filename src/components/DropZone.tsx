import { useCallback, useMemo, useRef, useState } from 'react'
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
