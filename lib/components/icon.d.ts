import React from 'react';
import './icon.less';
declare const SvgIcon: React.ForwardRefExoticComponent<{
    name: string;
    className?: string | undefined;
} & React.RefAttributes<SVGSVGElement>>;
export default SvgIcon;
