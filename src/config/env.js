const {
  REACT_APP_COMPANY_LOGO,
  REACT_APP_SIDEBAR_LOGO,
  REACT_APP_COLLAPSED_SIDEBAR_LOGO,
  REACT_APP_AUTH_BACKGROUND,
  REACT_APP_MOBILE_LOGO
} = process.env

const config = {
  companyLogo: REACT_APP_COMPANY_LOGO || '/default-logo.png',
  mobileLogo: REACT_APP_MOBILE_LOGO || '/mobile-logo.png',
  sidebarLogo: REACT_APP_SIDEBAR_LOGO || '/sidebar-logo.png',
  collapsedSidebarLogo: REACT_APP_COLLAPSED_SIDEBAR_LOGO || '/collapsed-sidebar-logo.png',
  authBackground: REACT_APP_AUTH_BACKGROUND || '/auth-background.png',
}

export default config;