import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
    id: string | null;
    setId: (id: string) => void;
}

export const useAppStore = create<State>()(
    persist(
        (set) => ({
            id: null,
            setId: (id: string) => set({ id }),
        }),
        {
            name: 'application',
        },
    ),
)

