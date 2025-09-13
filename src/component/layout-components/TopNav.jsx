import React from 'react'
import { connect } from 'react-redux';
import { NAV_TYPE_TOP } from '@/constant/ThemeConstant';
import utils from '@/util'
import MenuContent from './MenuContent'

export const TopNav = ({topNavColor, localization = true}) => {
	const props = { topNavColor, localization }
	return (
		<div className={`top-nav ${utils.getColorContrast(topNavColor)}`} style={{backgroundColor: topNavColor}}>
			<div className="top-nav-wrapper">
				<MenuContent
					type={NAV_TYPE_TOP} 
					{...props}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = ({ theme }) => {
  const { topNavColor } =  theme;
  return { topNavColor }
};

export default connect(mapStateToProps)(TopNav);
