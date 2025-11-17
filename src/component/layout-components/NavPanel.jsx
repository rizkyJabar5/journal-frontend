import React, { useState } from 'react';
import Menu from '@/component/ui/MenuWrapper';
import { connect } from "react-redux";
import { NavProfile } from './NavProfile';

const NavPanel = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const menuItems = [
    {
      key: 'profile',
      label: (
        <div onClick={showDrawer}>
          <NavProfile />
        </div>
      ),
      style: {
        display: 'flex',
        alignItems: 'center',
        height: '64px',
        padding: '0 16px'
      }
    }
  ];

  return (
    <Menu
      mode="horizontal"
      items={menuItems}
      style={{ 
        border: 'none',
        background: 'transparent'
      }}
      selectedKeys={[]}
    />
  );
}

const mapStateToProps = ({ theme }) => {
  const { locale } = theme;
  return { locale };
};

export default connect(mapStateToProps)(NavPanel);