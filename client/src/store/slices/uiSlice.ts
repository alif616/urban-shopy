import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  isAssistantOpen: boolean;
}

const initialState: UIState = {
  isCartOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  isAssistantOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCartDrawer: (state) => { state.isCartOpen = true; },
    closeCartDrawer: (state) => { state.isCartOpen = false; },
    toggleCartDrawer: (state) => { state.isCartOpen = !state.isCartOpen; },
    openMobileMenu: (state) => { state.isMobileMenuOpen = true; },
    closeMobileMenu: (state) => { state.isMobileMenuOpen = false; },
    openSearch: (state) => { state.isSearchOpen = true; },
    closeSearch: (state) => { state.isSearchOpen = false; },
    openAssistant: (state) => { state.isAssistantOpen = true; },
    closeAssistant: (state) => { state.isAssistantOpen = false; },
  },
});

export const {
  openCartDrawer, closeCartDrawer, toggleCartDrawer,
  openMobileMenu, closeMobileMenu,
  openSearch, closeSearch,
  openAssistant, closeAssistant,
} = uiSlice.actions;

export default uiSlice.reducer;
