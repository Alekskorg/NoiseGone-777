import DropZone from './components/DropZone'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="max-w-4xl mx-auto px-4 pt-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-ng-accent/20 border border-ng-accent/30 flex items-center justify-center">
            <div className="w-4 h-4 bg-ng-accent rounded-sm" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">NoiseGone <span className="text-ng-accent">Lite</span></h1>
        </div>
        <p className="mt-3 text-ng-text/80">Очистите голос от фона за секунды. Сейчас демо-версия: загрузка, проверка длины (до 5 мин), фейковая обработка и скачивание.</p>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <DropZone />

        <section className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="bg-ng-card/60 rounded-2xl p-4 border border-white/5 shadow-soft">
            <h3 className="font-semibold mb-2">1. Загрузите файл</h3>
            <p className="text-sm text-white/70">Поддерживаются MP3/WAV/M4A. Файлы длиннее 5 минут пока не принимаются.</p>
          </div>
          <div className="bg-ng-card/60 rounded-2xl p-4 border border-white/5 shadow-soft">
            <h3 className="font-semibold mb-2">2. Обработка (демо)</h3>
            <p className="text-sm text-white/70">Сейчас — имитация прогресса. На шаге 2 будет добавлен реальный движок.</p>
          </div>
          <div className="bg-ng-card/60 rounded-2xl p-4 border border-white/5 shadow-soft">
            <h3 className="font-semibold mb-2">3. Скачайте результат</h3>
            <p className="text-sm text-white/70">Пока скачивается исходный файл с суффиксом “-clean”. Это заглушка для сохранения UX.</p>
          </div>
        </section>
      </main>

      <footer className="max-w-4xl mx-auto px-4 pb-10 text-xs text-white/50">
        <p>Шаг 1 из серии: Drop Zone → Реальный движок → Тарифы → Аккаунт.</p>
      </footer>
    </div>
  )
}
