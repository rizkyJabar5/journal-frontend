import React from "react";
import { Link } from "react-router-dom";
import { Menu, Grid } from "antd";
import Icon from "@ant-design/icons";
import navigationConfig from "@/config/NavigationConfig";
import { connect } from "react-redux";
import { SIDE_NAV_LIGHT, NAV_TYPE_SIDE } from "@/constant/ThemeConstant";
import utils from '@/util'
import { onMobileNavToggle } from "@/store/features/theme";
import IntlMessage from "@/component/util-components/IntlMessage";

const { useBreakpoint } = Grid;

const titleStyle = {
  marginTop: "-20px",
};

const MenuStyle = {
  fontSize: "1em",
  color: "#1445E4",
};

const setLocale = (isLocaleOn, localeKey) =>
  isLocaleOn ? <IntlMessage id={localeKey} /> : localeKey.toString();

const setDefaultOpen = (key) => {
  let keyList = [];
  let keyString = "";
  if (key) {
    const arr = key.split("-");
    for (let index = 0; index < arr.length; index++) {
      const elm = arr[index];
      index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
      keyList.push(keyString);
    }
  }
  return keyList;
};

// Build Menu items using Antd v5 `items` API for cleaner implementation
const buildMenuItems = (config, localization, closeMobileNav) => {
  const buildItem = (item) => {
    const labelContent = (
      <span style={item.groupLabel ? {} : titleStyle}>
        {setLocale(localization, item.title)}
      </span>
    );

    // If item has children, map them recursively
    if (item.submenu && item.submenu.length > 0) {
      return {
        key: item.key,
        icon: item.icon ? <Icon component={item.icon} /> : null,
        label: item.path ? (
          <Link onClick={() => closeMobileNav()} to={item.path}>
            {labelContent}
          </Link>
        ) : (
          labelContent
        ),
        children: item.submenu.map((c) => buildItem(c)),
      };
    }

    // Leaf node
    return {
      key: item.key,
      icon: item.icon ? <Icon component={item.icon} /> : null,
      label: item.path ? (
        <Link onClick={() => closeMobileNav()} to={item.path}>
          {setLocale(localization, item.title)}
        </Link>
      ) : (
        setLocale(localization, item.title)
      ),
    };
  };

  // Support top-level groups (item.group is interpreted as ItemGroup)
  return config.map((menu) => {
    if (menu.submenu && menu.submenu.length > 0 && menu.type === 'group') {
      return {
        key: menu.key,
        type: 'group',
        label: setLocale(localization, menu.title),
        children: menu.submenu.map((m) => buildItem(m)),
      };
    }

    if (menu.submenu && menu.submenu.length > 0) {
      return buildItem(menu);
    }

    return buildItem(menu);
  });
};

const SideNavContent = (props) => {
  const { sideNavTheme, routeInfo, hideGroupTitle, localization, onMobileNavToggle } = props;
  const screens = useBreakpoint();
  const isMobile = !utils.getBreakPoint(screens).includes('lg');
  const closeMobileNav = () => {
    if (isMobile) {
      onMobileNavToggle(false);
    }
  };

  const items = buildMenuItems(navigationConfig, localization, closeMobileNav);

  return (
    <Menu
      theme={sideNavTheme === SIDE_NAV_LIGHT ? "light" : "dark"}
      mode="inline"
      items={items}
      style={{ height: "100%", borderRight: 0 }}
      defaultSelectedKeys={[routeInfo?.key]}
      defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
      inlineIndent={40}
      className={hideGroupTitle ? "hide-group-title" : ""}
    />
  );
};

const TopNavContent = (props) => {
  const { topNavColor, localization } = props;
  const closeMobileNav = () => {};
  const items = buildMenuItems(navigationConfig, localization, closeMobileNav);

  return (
    <Menu mode="horizontal" items={items} popupClassName="top-nav-menu" style={{ backgroundColor: topNavColor }} />
  );
};

const MenuContent = (props) => {
  return props.type === NAV_TYPE_SIDE ? (
    <SideNavContent {...props} />
  ) : (
    <TopNavContent {...props} />
  );
};

const mapStateToProps = ({ theme }) => {
  const { sideNavTheme, topNavColor } = theme;
  return { sideNavTheme, topNavColor };
};

export default connect(mapStateToProps, { onMobileNavToggle })(MenuContent);
