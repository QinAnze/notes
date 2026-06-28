const PLAYLIST_ID = "18095645858"
const API_URL = "https://api.injahow.cn/meting/"
const CACHE_KEY = "radio-playlist-cache"
const CACHE_EXPIRY = 30 * 60 * 1000 // 30分钟缓存过期

interface Song {
  id: string
  name: string
  artist: string
  url: string
  pic: string
}

class RadioPlayer {
  private audio: HTMLAudioElement
  private playlist: Song[] = []
  private currentIndex: number = 0
  private isPlaying: boolean = false
  private isInitialized: boolean = false

  private static instance: RadioPlayer | null = null

  static getInstance(): RadioPlayer {
    if (!RadioPlayer.instance) {
      RadioPlayer.instance = new RadioPlayer()
    }
    return RadioPlayer.instance
  }

  constructor() {
    if (RadioPlayer.instance) {
      return RadioPlayer.instance
    }
    
    this.audio = this.createAudioElement()
    RadioPlayer.instance = this
    
    this.init()
  }

  private createAudioElement(): HTMLAudioElement {
    let audio = document.getElementById("radio-audio") as HTMLAudioElement
    
    if (!audio) {
      audio = document.createElement("audio")
      audio.id = "radio-audio"
      audio.preload = "metadata"
      audio.setAttribute("spa-preserve", "")
      document.head.appendChild(audio)
    }
    
    return audio
  }

  private async init() {
    if (this.isInitialized) return
    
    await this.fetchPlaylist()
    this.bindEvents()
    this.loadVolume()
    this.updateUI()
    this.isInitialized = true
  }

  private async fetchPlaylist() {
    // 检查缓存是否过期
    const cacheData = localStorage.getItem(CACHE_KEY)
    if (cacheData) {
      try {
        const { playlist, timestamp } = JSON.parse(cacheData)
        if (playlist.length > 0 && Date.now() - timestamp < CACHE_EXPIRY) {
          this.playlist = playlist
          return
        }
      } catch {}
    }
    
    try {
      const response = await fetch(`${API_URL}?type=playlist&id=${PLAYLIST_ID}`)
      const data = await response.json()
      
      if (Array.isArray(data)) {
        this.playlist = data.map((item: any) => ({
          id: item.id || item.url_id,
          name: item.name || item.title,
          artist: item.artist || item.author,
          url: item.url,
          pic: item.pic,
        }))
        
        // 保存到缓存
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          playlist: this.playlist,
          timestamp: Date.now()
        }))
      }
      
      if (this.playlist.length > 0) {
        this.loadSong(0)
      }
    } catch (error) {
      console.error("Failed to fetch playlist:", error)
      await this.fetchPlaylistAlternative()
    }
  }

  private async fetchPlaylistAlternative() {
    if (this.playlist.length > 0) return
    
    try {
      const response = await fetch(`https://music.163.com/api/playlist/detail?id=${PLAYLIST_ID}`)
      const data = await response.json()
      
      if (data.playlist && data.playlist.tracks) {
        this.playlist = data.playlist.tracks.slice(0, 20).map((track: any) => ({
          id: track.id,
          name: track.name,
          artist: track.ar.map((a: any) => a.name).join(", "),
          url: `https://music.163.com/song/media/outer/url?id=${track.id}.mp3`,
          pic: track.al.picUrl,
        }))
        
        if (this.playlist.length > 0) {
          this.loadSong(0)
        }
      }
    } catch (error) {
      console.error("Alternative API also failed:", error)
      this.updateSongName("加载歌单失败")
    }
  }

  private bindEvents() {
    const playBtn = document.getElementById("radio-play")
    const prevBtn = document.getElementById("radio-prev")
    const nextBtn = document.getElementById("radio-next")
    const progressBar = document.getElementById("radio-progress-bar")
    const volumeInput = document.getElementById("radio-volume") as HTMLInputElement

    playBtn?.addEventListener("click", () => this.togglePlay())
    prevBtn?.addEventListener("click", () => this.playPrev())
    nextBtn?.addEventListener("click", () => this.playNext())
    progressBar?.addEventListener("click", (e: MouseEvent) => this.seek(e))
    
    if (volumeInput) {
      volumeInput.addEventListener("input", (e: Event) => {
        const value = (e.target as HTMLInputElement).value
        this.setVolume(parseInt(value))
      })
    }

    this.audio.addEventListener("timeupdate", () => this.updateProgress())
    this.audio.addEventListener("ended", () => this.playNext())
    this.audio.addEventListener("loadedmetadata", () => this.updateUI())
    this.audio.addEventListener("error", () => {
      console.error("Audio error, trying next song")
      this.playNext()
    })
  }

  private loadSong(index: number) {
    if (index < 0 || index >= this.playlist.length) return
    
    this.currentIndex = index
    const song = this.playlist[index]
    
    this.audio.src = song.url
    this.updateSongName(`${song.name} - ${song.artist}`)
    this.updateUI()
  }

  private updateSongName(text: string) {
    const songNameEl = document.getElementById("radio-song-name")
    if (songNameEl) {
      songNameEl.textContent = text
      songNameEl.title = text
    }
  }

  private togglePlay() {
    if (this.playlist.length === 0) return
    
    if (this.isPlaying) {
      this.audio.pause()
    } else {
      this.audio.play().catch((error) => {
        console.error("Play error:", error)
      })
    }
    
    this.isPlaying = !this.isPlaying
    this.updatePlayButton()
  }

  private playPrev() {
    if (this.playlist.length === 0) return
    
    let newIndex = this.currentIndex - 1
    if (newIndex < 0) {
      newIndex = this.playlist.length - 1
    }
    
    this.loadSong(newIndex)
    if (this.isPlaying) {
      this.audio.play().catch(() => {})
    }
  }

  private playNext() {
    if (this.playlist.length === 0) return
    
    let newIndex = this.currentIndex + 1
    if (newIndex >= this.playlist.length) {
      newIndex = 0
    }
    
    this.loadSong(newIndex)
    if (this.isPlaying) {
      this.audio.play().catch(() => {})
    }
  }

  private seek(e: MouseEvent) {
    const progressBar = document.getElementById("radio-progress-bar")
    if (!progressBar) return
    
    const rect = progressBar.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const duration = this.audio.duration
    
    if (duration && !isNaN(duration)) {
      this.audio.currentTime = percent * duration
    }
  }

  private setVolume(value: number) {
    this.audio.volume = value / 100
    localStorage.setItem("radio-volume", value.toString())
  }

  private loadVolume() {
    const savedVolume = localStorage.getItem("radio-volume")
    const volume = savedVolume ? parseInt(savedVolume) : 80
    
    this.audio.volume = volume / 100
    
    const volumeInput = document.getElementById("radio-volume") as HTMLInputElement
    if (volumeInput) {
      volumeInput.value = volume.toString()
    }
  }

  private updateProgress() {
    const currentTime = this.audio.currentTime
    const duration = this.audio.duration
    
    if (duration && !isNaN(duration)) {
      const percent = (currentTime / duration) * 100
      
      const progressFill = document.getElementById("radio-progress-fill")
      if (progressFill) {
        progressFill.style.width = `${percent}%`
      }
      
      const timeEl = document.getElementById("radio-time")
      if (timeEl) {
        timeEl.textContent = `${this.formatTime(currentTime)} / ${this.formatTime(duration)}`
      }
    }
  }

  private updateUI() {
    this.updateProgress()
    this.updatePlayButton()
  }

  private updatePlayButton() {
    const playBtn = document.getElementById("radio-play")
    if (playBtn) {
      playBtn.textContent = this.isPlaying ? "⏸" : "▶"
    }
  }

  private formatTime(seconds: number): string {
    if (isNaN(seconds)) return "00:00"
    
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
}

if (!window.radioPlayerInstance) {
  window.radioPlayerInstance = RadioPlayer.getInstance()
}