import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE } from 'constants/ThemeConstant';
import { env } from './EnvironmentConfig'

export const APP_NAME = ' PT. Putra Mahkota Plastik';
export const API_BASE_URL = env.API_ENDPOINT_URL

export const THEME_CONFIG = {
	navCollapsed: false,
	sideNavTheme: SIDE_NAV_LIGHT,
	locale: 'en',
	navType: NAV_TYPE_SIDE,
	topNavColor: '#f7b63eff',
	headerNavColor: '#ffffff',
	mobileNav: false
};
