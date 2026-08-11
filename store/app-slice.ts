import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  sidebarCollapsed: boolean;
  locale: string;
  accentColor: string;
}

const initialState: AppState = {
  sidebarCollapsed: false,
  locale: 'en',
  accentColor: 'default',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
    setAccentColor: (state, action: PayloadAction<string>) => {
      state.accentColor = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarCollapsed, setLocale, setAccentColor } = appSlice.actions;

export const selectLocale = (state: { app: AppState }) => state.app.locale;

export default appSlice.reducer;
