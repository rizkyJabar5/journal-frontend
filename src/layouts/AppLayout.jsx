import React from 'react';
import { Layout, Grid } from 'antd';
import { Outlet, useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import SideNav from '@/component/layout-components/SideNav';
import TopNav from '@/component/layout-components/TopNav';
import MobileNav from '@/component/layout-components/MobileNav';
import HeaderNav from '@/component/layout-components/HeaderNav';
import PageHeader from '@/component/layout-components/PageHeader';
import Footer from '@/component/layout-components/Footer';
import navigationConfig from "@/config/NavigationConfig";
import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_TYPE_SIDE,
  NAV_TYPE_TOP
} from '@/constant/ThemeConstant';
import utils from '@/util';

const { Content } = Layout;
const { useBreakpoint } = Grid;

export const AppLayout = ({ navCollapsed, navType }) => {
  const location = useLocation();
  const currentRouteInfo = utils.getRouteInfo(navigationConfig, location.pathname);
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes('lg');
  const isNavSide = navType === NAV_TYPE_SIDE;
  const isNavTop = navType === NAV_TYPE_TOP;

  const getLayoutGutter = () => {
    if (isNavTop || isMobile) {
      return 0;
    }
    return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH;
  };

  return (
    <Layout>
      <HeaderNav isMobile={isMobile} />
      {(isNavTop && !isMobile) && <TopNav routeInfo={currentRouteInfo} />}
      <Layout className="app-container">
        {(isNavSide && !isMobile) && <SideNav routeInfo={currentRouteInfo} />}
        <Layout className="app-layout" style={{ paddingLeft: getLayoutGutter() }}>
          <div className={`app-content ${isNavTop ? 'layout-top-nav' : ''}`}>
            <PageHeader
              display={currentRouteInfo?.breadcrumb}
              title={currentRouteInfo?.title}
            />
            <Content>
              <Outlet />
            </Content>
          </div>
          <Footer />
        </Layout>
      </Layout>
      {isMobile && <MobileNav />}
    </Layout>
  );
};

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, navType, locale } = theme;
  return { navCollapsed, navType, locale };
};

export default connect(mapStateToProps)(AppLayout);
