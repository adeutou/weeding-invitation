'use client'

import { useState, useEffect } from 'react'
import {
  FiSettings,
  FiBookOpen,
  FiCompass,
  FiScissors,
  FiUsers,
  FiMusic,
  FiCamera,
  FiLogOut,
  FiEye,
  FiLock,
  FiKey,
  FiSave,
  FiRotateCcw,
  FiCheckCircle,
  FiClock,
} from 'react-icons/fi'
import {
  loginToAtelier,
  logoutFromAtelier,
  deleteRsvpAction,
  approveGuestbookEntryAction,
  deleteGuestbookEntryAdminAction,
} from '@/server/actions/atelier'
import {
  getAdminDataAction,
  updateGeneralConfigAction,
  updateStoryChaptersAction,
  updateTravelConfigAction,
  updateDressCodeConfigAction,
  getWeddingConfigAction,
} from '@/server/actions/config'
import type { TWeddingConfig } from '@/modules/home/@types'
import type {
  RsvpSelect,
  GuestbookEntrySelect,
  MusicTrackSelect,
  StoryChapterRecord,
  DressCodeSwatchRecord,
  GalleryPhotoSelect,
  TimelineEventSelect,
} from '@/server/db/schema'
import { AdminGeneralTab } from './tabs/AdminGeneralTab'
import { AdminStoryTab } from './tabs/AdminStoryTab'
import { AdminTravelTab } from './tabs/AdminTravelTab'
import { AdminDressCodeTab } from './tabs/AdminDressCodeTab'
import { AdminRsvpsTab } from './tabs/AdminRsvpsTab'
import { AdminPlaylistTab } from './tabs/AdminPlaylistTab'
import { AdminGalleryTab } from './tabs/AdminGalleryTab'
import { AdminTimelineTab } from './tabs/AdminTimelineTab'

interface AdminModalProps {
  isOpen: boolean
  onClose: () => void
  config: TWeddingConfig
}

type TAdminTab =
  | 'general'
  | 'story'
  | 'travel'
  | 'dresscode'
  | 'rsvps_blessings'
  | 'playlist'
  | 'gallery'
  | 'timeline'

const TABS = [
  { id: 'general', label: 'Paramètres Généraux', icon: FiSettings },
  { id: 'story', label: 'Notre Histoire', icon: FiBookOpen },
  { id: 'travel', label: 'Logistique & Voyage', icon: FiCompass },
  { id: 'dresscode', label: 'Code Couleur', icon: FiScissors },
  { id: 'rsvps_blessings', label: 'RSVPs & Livre d\'Or', icon: FiUsers },
  { id: 'playlist', label: 'Playlist de Danse', icon: FiMusic },
  { id: 'gallery', label: 'Collection Galerie', icon: FiCamera },
  { id: 'timeline', label: 'Planning & Programme', icon: FiClock },
] as const

export function AdminModal({ isOpen, onClose, config }: AdminModalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passphrase, setPassphrase] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeTab, setActiveTab] = useState<TAdminTab>('general')
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [rsvps, setRsvps] = useState<RsvpSelect[]>([])
  const [entries, setEntries] = useState<GuestbookEntrySelect[]>([])
  const [tracks, setTracks] = useState<MusicTrackSelect[]>([])
  const [photos, setPhotos] = useState<GalleryPhotoSelect[]>([])
  const [events, setEvents] = useState<TimelineEventSelect[]>([])

  const [localConfig, setLocalConfig] = useState<TWeddingConfig>(config)

  useEffect(() => {
    if (isOpen) {
      setLocalConfig(config)
    }
  }, [isOpen, config])

  if (!isOpen) return null

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setLoginError('')
    const result = await loginToAtelier(passphrase)
    if (result.success) {
      setIsAuthenticated(true)
      const dataResult = await getAdminDataAction()
      if (dataResult.success) {
        setRsvps(dataResult.data.rsvps)
        setEntries(dataResult.data.entries)
        setTracks(dataResult.data.tracks)
        setPhotos(dataResult.data.photos)
        setEvents(dataResult.data.events)
      }
    } else {
      setLoginError('Mot de passe invalide. Veuillez réessayer.')
    }
    setIsLoading(false)
  }

  async function handleLogout() {
    await logoutFromAtelier()
    setIsAuthenticated(false)
    setPassphrase('')
    setRsvps([])
    setEntries([])
    setTracks([])
    setPhotos([])
    setEvents([])
  }

  async function handleRevert() {
    if (
      window.confirm(
        'Êtes-vous sûr de vouloir annuler toutes les modifications et rétablir les valeurs par défaut ?'
      )
    ) {
      setIsLoading(true)
      const result = await getWeddingConfigAction()
      if (result.success) {
        setLocalConfig(result.data)
      }
      setIsLoading(false)
    }
  }

  async function handleSave() {
    setIsLoading(true)
    let success = false
    if (activeTab === 'general') {
      const res = await updateGeneralConfigAction({
        brideName: localConfig.brideName,
        groomName: localConfig.groomName,
        weddingDateStr: localConfig.weddingDateStr,
        weddingDateReadable: localConfig.weddingDateReadable,
        venueName: localConfig.venueName,
        venueLocation: localConfig.venueLocation,
        editorialQuote: localConfig.editorialQuote,
      })
      success = res.success
    } else if (activeTab === 'story') {
      const res = await updateStoryChaptersAction(localConfig.storyChapters)
      success = res.success
    } else if (activeTab === 'travel') {
      const res = await updateTravelConfigAction({
        travelFlights: localConfig.travelFlights,
        travelTrains: localConfig.travelTrains,
        travelStays: localConfig.travelStays,
        travelTreasures: localConfig.travelTreasures,
      })
      success = res.success
    } else if (activeTab === 'dresscode') {
      const res = await updateDressCodeConfigAction(
        {
          dressCodeTitle: localConfig.dressCodeTitle,
          dressCodeDescription: localConfig.dressCodeDescription,
        },
        localConfig.dressCodeSwatches
      )
      success = res.success
    } else {
      success = true
    }
    setIsLoading(false)
    if (success) {
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 2500)
    }
  }

  const updateGeneralConfig = (updates: Partial<TWeddingConfig>) => {
    setLocalConfig(prev => ({
      ...prev,
      ...updates,
    }))
  }

  const updateStory = (
    index: number,
    key: keyof StoryChapterRecord,
    value: string
  ) => {
    const updated = [...localConfig.storyChapters]
    const item = updated[index]
    if (item) {
      updated[index] = {
        ...item,
        [key]: value,
      }
      setLocalConfig(prev => ({
        ...prev,
        storyChapters: updated,
      }))
    }
  }

  const updateSwatch = (
    index: number,
    key: keyof DressCodeSwatchRecord,
    value: string
  ) => {
    const updated = [...localConfig.dressCodeSwatches]
    const item = updated[index]
    if (item) {
      updated[index] = {
        ...item,
        [key]: value,
      }
      setLocalConfig(prev => ({
        ...prev,
        dressCodeSwatches: updated,
      }))
    }
  }

  const handleDeleteRsvp = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce RSVP ?')) {
      const res = await deleteRsvpAction(id)
      if (res.success) {
        setRsvps(prev => prev.filter(r => r.id !== id))
      }
    }
  }

  const handleApproveEntry = async (id: string) => {
    const res = await approveGuestbookEntryAction(id)
    if (res.success) {
      setEntries(prev =>
        prev.map(e => (e.id === id ? { ...e, isApproved: true } : e))
      )
    }
  }

  const handleDeleteEntry = async (id: string) => {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer ce message du livre d'or ?")
    ) {
      const res = await deleteGuestbookEntryAdminAction(id)
      if (res.success) {
        setEntries(prev => prev.filter(e => e.id !== id))
      }
    }
  }

  const totalGuests = rsvps.reduce(
    (sum, r) => sum + (r.attendance === 'attending' ? r.guestsCount : 0),
    0
  )

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-cream border border-taupe rounded-3xl w-full max-w-5xl shadow-[0_30px_70px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col md:flex-row min-h-[80vh] max-h-[92vh]">
        <div className="w-full md:w-64 bg-charcoal text-parchment p-6 flex flex-col justify-between border-r border-taupe/10 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-2.5 h-2.5 rounded-full bg-gold" />
              <span className="font-serif text-sm tracking-[0.2em] uppercase font-bold text-white">
                Atelier des Mariés
              </span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-4 font-sans">
              Espace de Gestion
            </p>
            {isAuthenticated ? (
              <div className="space-y-1.5 font-sans text-xs">
                {TABS.map(tab => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center gap-2.5 transition-all cursor-pointer ${isActive
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-stone-400 hover:text-white'
                        }`}
                    >
                      <Icon className="w-4 h-4 text-gold" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className="bg-white/5 border border-white/15 p-4 rounded-xl text-[11px] text-stone-400 space-y-2 leading-relaxed font-sans">
                <p className="font-semibold text-white flex items-center gap-1.5"><FiLock className="text-gold" /> Espace de Gestion Verrouillé</p>
                <p>
                  Veuillez vous connecter avec le mot de passe pour modifier les textes, changer la date du compte à rebours et suivre la liste des invités.
                </p>
              </div>
            )}
          </div>
          <div className="space-y-3 font-sans text-xs mt-8">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="w-full py-2 border border-white/20 text-stone-400 hover:text-white hover:border-white/40 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <FiLogOut className="w-3.5 h-3.5" />
                <span>Verrouiller l'Atelier</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full py-2 bg-gold hover:bg-gold-dark text-charcoal font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <FiEye className="w-3.5 h-3.5" />
              <span>Retour au Site</span>
            </button>
          </div>
        </div>

        <div className="flex-1 p-6 md:p-10 overflow-y-auto flex flex-col justify-between">
          {!isAuthenticated ? (
            <div className="flex-1 flex flex-col justify-center items-center max-w-md mx-auto w-full py-12">
              <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-gold mb-4 border border-gold/20">
                <FiLock className="w-5 h-5 animate-pulse" />
              </div>
              <h2 className="font-serif text-3xl font-light text-charcoal text-center mb-1">
                Accès à l'Atelier des Mariés
              </h2>
              <p className="font-serif italic text-xs text-stone-500 text-center mb-8">
                Entrez le mot de passe de l'Atelier pour modifier le contenu du site en temps réel.
              </p>
              <form onSubmit={handleLogin} className="w-full space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 font-sans font-bold mb-1.5">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={passphrase}
                    onChange={e => setPassphrase(e.target.value)}
                    placeholder="Entrez le mot de passe de l'Atelier"
                    className="w-full bg-white border border-taupe rounded-xl px-4 py-2.5 font-sans text-xs focus:ring-1 focus:ring-gold focus:border-gold outline-none"
                    required
                    disabled={isLoading}
                  />
                </div>
                {loginError && (
                  <p className="text-xs text-rose font-medium text-center">
                    {loginError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-charcoal text-white hover:bg-black rounded-xl font-sans uppercase font-bold text-[10px] tracking-widest transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <FiKey className="w-3.5 h-3.5 text-gold" />
                  <span>Vérifier &amp; Ouvrir</span>
                </button>
              </form>
              <div className="mt-8 bg-parchment p-4 rounded-xl border border-taupe/60 w-full text-[11px] font-sans text-stone-500">
                <p className="font-semibold text-charcoal mb-1">Indice :</p>
                <p>Veuillez demander le mot de passe de l'Atelier aux mariés.</p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col h-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-taupe pb-4 mb-6 gap-3">
                <div>
                  <span className="text-[10px] tracking-[0.25em] text-gold uppercase font-bold font-sans">
                    Configuration Active
                  </span>
                  <h3 className="font-serif text-2xl font-light text-charcoal">
                    {activeTab === 'general' && 'Paramètres Généraux'}
                    {activeTab === 'story' && 'Notre Histoire'}
                    {activeTab === 'travel' && 'Logistique & Voyage'}
                    {activeTab === 'dresscode' && 'Code Couleur'}
                    {activeTab === 'rsvps_blessings' && 'RSVPs & Livre d\'Or'}
                    {activeTab === 'playlist' && 'Playlist de Danse'}
                    {activeTab === 'gallery' && 'Collection Galerie'}
                    {activeTab === 'timeline' && 'Planning & Programme'}
                  </h3>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {['general', 'story', 'travel', 'dresscode'].includes(
                    activeTab
                  ) && (
                      <>
                        <button
                          onClick={handleRevert}
                          disabled={isLoading}
                          className="px-3.5 py-1.5 border border-taupe text-[10px] tracking-wider uppercase font-bold text-stone-500 hover:text-charcoal rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                          title="Annuler les modifications et rétablir les valeurs enregistrées"
                        >
                          <FiRotateCcw className="w-3 h-3 text-gold" />
                          <span>Rétablir les valeurs par défaut</span>
                        </button>
                        <button
                          onClick={handleSave}
                          disabled={isLoading}
                          className="px-4 py-1.5 bg-charcoal text-white hover:bg-black text-[10px] tracking-wider uppercase font-bold rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer disabled:opacity-50"
                        >
                          <FiSave className="w-3 h-3 text-gold" />
                          <span>Enregistrer</span>
                        </button>
                      </>
                    )}
                </div>
              </div>

              {saveSuccess && (
                <div className="bg-sage/10 text-sage border border-sage/30 p-3 rounded-xl mb-6 text-xs flex items-center gap-2 font-serif italic">
                  <FiCheckCircle className="w-4 h-4 text-sage" />
                  Atelier de l'invitation enregistré ! Les modifications sont appliquées immédiatement sur l'invitation.
                </div>
              )}

              <div className="flex-1">
                {activeTab === 'general' && (
                  <AdminGeneralTab
                    localConfig={localConfig}
                    onChange={updateGeneralConfig}
                  />
                )}

                {activeTab === 'story' && (
                  <AdminStoryTab
                    localConfig={localConfig}
                    onUpdateChapter={updateStory}
                  />
                )}

                {activeTab === 'travel' && (
                  <AdminTravelTab
                    localConfig={localConfig}
                    onChange={updateGeneralConfig}
                  />
                )}

                {activeTab === 'dresscode' && (
                  <AdminDressCodeTab
                    localConfig={localConfig}
                    onChange={updateGeneralConfig}
                    onUpdateSwatch={updateSwatch}
                  />
                )}

                {activeTab === 'rsvps_blessings' && (
                  <AdminRsvpsTab
                    rsvps={rsvps}
                    entries={entries}
                    totalGuests={totalGuests}
                    onDeleteRsvp={handleDeleteRsvp}
                    onApproveEntry={handleApproveEntry}
                    onDeleteEntry={handleDeleteEntry}
                  />
                )}

                {activeTab === 'playlist' && (
                  <AdminPlaylistTab
                    tracks={tracks}
                    onAddTrack={track => setTracks(prev => [...prev, track])}
                    onDeleteTrack={id => setTracks(prev => prev.filter(t => t.id !== id))}
                  />
                )}

                {activeTab === 'gallery' && (
                  <AdminGalleryTab
                    photos={photos}
                    onAddPhoto={photo => setPhotos(prev => [...prev, photo])}
                    onDeletePhoto={id =>
                      setPhotos(prev => prev.filter(p => p.id !== id))
                    }
                  />
                )}

                {activeTab === 'timeline' && (
                  <AdminTimelineTab
                    events={events}
                    onAddEvent={event => setEvents(prev => [...prev, event].sort((a, b) => a.sortOrder - b.sortOrder))}
                    onUpdateEvent={(id, updatedEvent) =>
                      setEvents(prev => prev.map(e => (e.id === id ? updatedEvent : e)).sort((a, b) => a.sortOrder - b.sortOrder))
                    }
                    onDeleteEvent={id => setEvents(prev => prev.filter(e => e.id !== id))}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
