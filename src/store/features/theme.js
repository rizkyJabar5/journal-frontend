import { createSlice } from '@reduxjs/toolkit'
import { THEME_CONFIG } from '@/config/AppConfig'
import envConfig from "@/config/env";

const initialState = {
	...THEME_CONFIG,
	authBackground: envConfig.authBackground,
	mobileLogo: envConfig.mobileLogo,
	companyLogo: envConfig.companyLogo,
	sidebarLogo: envConfig.sidebarLogo,
	collapsedSidebarLogo: envConfig.collapsedSidebarLogo,
}

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleCollapsedNav: (state, action) => {
			state.navCollapsed =  action.payload
		},
		onNavStyleChange: (state, action) => {
			state.sideNavTheme = action.payload
		},
		onLocaleChange: (state, action) => {
			state.locale = action.payload
		},
		onNavTypeChange: (state, action) => {
			state.navType = action.payload
		},
		onTopNavColorChange: (state, action) => {
			state.topNavColor = action.payload
		},
		onHeaderNavColorChange: (state, action) => {
			state.headerNavColor = action.payload
		},
		onMobileNavToggle: (state, action) => {
			state.mobileNav = action.payload
		}
	}
});

export const {
	toggleCollapsedNav,
	onNavStyleChange,
	onLocaleChange,
	onNavTypeChange,
	onTopNavColorChange,
	onHeaderNavColorChange,
	onMobileNavToggle
} = themeSlice.actions

export default themeSlice.reducer;

