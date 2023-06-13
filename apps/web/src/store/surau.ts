import { create } from 'zustand'
import type { Surau } from '../components/SurauTable/columns'

interface SurauState {
    surau: Surau[]
    setSurau: () => void
}

const useSurauStore = create<SurauState>()((set) => ({
  surau: [],
  setSurau: () => set((state)=> ()  )
}))