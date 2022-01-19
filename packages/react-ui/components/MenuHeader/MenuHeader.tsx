import React, { ReactNode, useContext } from 'react';

import { ThemeContext } from '../../lib/theming/ThemeContext';
import { CommonProps, CommonWrapper } from '../../internal/CommonWrapper';
import { cx } from '../../lib/theming/Emotion';

import { styles } from './MenuHeader.styles';

export type MenuHeaderProps = {
  /**
   * @ignore
   */
  _enableIconPadding?: boolean;
  /**
   * @ignore
   */
  children: ReactNode;
} & CommonProps;

/**
 * `Заголовок меню` используется для того, чтобы разделить `элементы меню` на категории в рамках одного меню.
 *
 * _Примечание_: `заголовок меню`, в отличие от `элемента меню` нельзя затаргетить с клавиатуры.
 *
 * Сущности в которых может быть использован `MenuHeader`: [`DropdownMenu`](#/Components/DropdownMenu), [`Kebab`](#/Components/Kebab), [`TooltipMenu`](#/Components/TooltipMenu) и [`Select`](#/Components/Select).
 */
export const MenuHeader = ({ _enableIconPadding = false, children, ...rest }: MenuHeaderProps) => {
  const theme = useContext(ThemeContext);

  return (
    <CommonWrapper {...rest}>
      <div
        className={cx({
          [styles.root(theme)]: true,
          [styles.withLeftPadding(theme)]: _enableIconPadding,
        })}
      >
        {children}
      </div>
    </CommonWrapper>
  );
};

MenuHeader.__KONTUR_REACT_UI__ = 'MenuHeader';
MenuHeader.__MENU_HEADER__ = true;

export const isMenuHeader = (child: React.ReactNode): child is React.ReactElement<MenuHeaderProps> => {
  return React.isValidElement<MenuHeaderProps>(child)
    ? Object.prototype.hasOwnProperty.call(child.type, '__MENU_HEADER__')
    : false;
};
