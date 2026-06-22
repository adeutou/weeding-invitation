'use client'

import type { TWeddingConfig } from '@/modules/home/@types'
import type { StoryChapterRecord } from '@/server/db/schema'

interface AdminStoryTabProps {
  localConfig: TWeddingConfig
  onUpdateChapter: (
    index: number,
    key: keyof StoryChapterRecord,
    value: string
  ) => void
}

export function AdminStoryTab({
  localConfig,
  onUpdateChapter,
}: AdminStoryTabProps) {
  return (
    <div className="space-y-6 max-w-3xl">
      {localConfig.storyChapters.map((chap, idx) => (
        <div
          key={chap.id}
          className="bg-white rounded-2xl border border-taupe p-5 flex flex-col gap-3"
        >
          <span className="text-[10px] font-sans tracking-widest text-gold uppercase font-bold">
            Chapter {idx + 1}
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-sans font-bold mb-0.5">
                Chapter Title
              </label>
              <input
                type="text"
                value={chap.title}
                onChange={e => onUpdateChapter(idx, 'title', e.target.value)}
                className="w-full bg-cream border border-taupe/80 rounded-lg px-3 py-1.5 font-serif text-xs focus:ring-1 focus:ring-gold outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-sans font-bold mb-0.5">
                Period Label
              </label>
              <input
                type="text"
                value={chap.period}
                onChange={e => onUpdateChapter(idx, 'period', e.target.value)}
                className="w-full bg-cream border border-taupe/80 rounded-lg px-3 py-1.5 font-sans text-xs focus:ring-1 focus:ring-gold outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-sans font-bold mb-0.5">
              Lyrical Subtitle
            </label>
            <input
              type="text"
              value={chap.subtitle}
              onChange={e => onUpdateChapter(idx, 'subtitle', e.target.value)}
              className="w-full bg-cream border border-taupe/80 rounded-lg px-3 py-1.5 font-serif text-xs focus:ring-1 focus:ring-gold outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-stone-400 font-sans font-bold mb-0.5">
              The Chronicle Text
            </label>
            <textarea
              value={chap.content}
              onChange={e => onUpdateChapter(idx, 'content', e.target.value)}
              rows={3}
              className="w-full bg-cream border border-taupe/80 rounded-lg p-3 font-serif text-xs leading-relaxed focus:ring-1 focus:ring-gold outline-none resize-none"
              required
            />
          </div>
        </div>
      ))}
    </div>
  )
}
