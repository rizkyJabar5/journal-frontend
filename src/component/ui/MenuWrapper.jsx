import React from 'react';
import { Menu as AntdMenu } from 'antd';

// Lightweight wrapper around antd Menu to centralize any compatibility work
// (for example switching to the `items` API, or adding logging / telemetry).
// Use this when you want project-wide control over Menu rendering.
const MenuWrapper = (props) => {
  const { items, children, ...rest } = props;

  // Prefer the items API when provided (Antd v5+)
  if (items) {
    return <AntdMenu items={items} {...rest} />;
  }

  // Fallback to children-based rendering for older callsites
  return <AntdMenu {...rest}>{children}</AntdMenu>;
};

export default MenuWrapper;
