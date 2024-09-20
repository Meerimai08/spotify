import { create } from "zustand";

interface IPlayerStore {
	accessToken: string;
	trackUris: string[];
	trackIndex: number | null;
	activeUri: string | null;

	setAccessToken: (value: string) => void;
	setTrackUris: (value: string[]) => void;
	setTrackIndex: (value: number) => void;
	setActiveUri: (value: string) => void;
}

export const usePlayerStore = create<IPlayerStore>((set) => ({
	accessToken: "",
	trackUris: [],
	trackIndex: null,
	activeUri: null,

	setAccessToken: (value) => set({ accessToken: value }),
	setTrackUris: (value) => set({ trackUris: value }),
	setTrackIndex: (value) => set({ trackIndex: value }),
	setActiveUri: (value) => set({ activeUri: value }),
}));
