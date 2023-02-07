import React, { isValidElement, useEffect, useRef } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import tippy, { Instance, Props } from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

type TooltipCustomProps = Omit<React.HtmlHTMLAttributes<HTMLElement>, 'role'> & { [key in keyof Omit<Props, 'content'>]?: Props[key] } & {
  content: any;
}

export default React.forwardRef((props: TooltipCustomProps, ref: any) => {
  const {
    children,
    className,
    style,
    content,
    theme = 'light',
    arrow = false,
    allowHTML = true,
    ...restToolTip
  } = props;

  React.useImperativeHandle(ref, () => childRef);

  const childRef = useRef<any>(null);
  const tippyRef = useRef<Instance<Props> | Instance<Props>[]>()

  useEffect(() => {
    if (content && childRef.current) {
      tippyRef.current = tippy(childRef.current, {
        theme: theme,
        arrow: arrow,
        allowHTML: allowHTML,
        content: renderToStaticMarkup(content),
        ...restToolTip
      });
    }
    return () => {
      const instances = tippyRef.current instanceof Array ? tippyRef.current : [tippyRef.current];
      instances?.map((instance) => instance?.unmount());
    }
  }, []);

  return isValidElement(children) ? React.cloneElement(children, {
    ref: childRef,
    className,
    style
  }) : null
});
