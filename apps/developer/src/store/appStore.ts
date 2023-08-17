import { create } from 'zustand'

type State = {
    id: string | null;
    setId: (id: string) => void;
}

export const useAppStore = create<State>()(
    (set) => ({
        id: null,
        setId: (id: string) => set({ id }),
    }),
)

