import React from 'react';
import { func, shape, string } from 'prop-types';

import { CrossIcon } from '../internal/icons/CrossIcon';
import { ZIndex } from '../ZIndex';
import { ThemeConsumer } from '../ThemeConsumer';
import { Theme } from '../../lib/theming/Theme';

import { jsStyles } from './ToastView.styles';

export interface ToastViewProps {
  /**
   * Toast content
   */
  children?: string;
  /**
   * Adds action handling and close icon for toast
   */
  action?: {
    label: string;
    handler: () => void;
  } | null;
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export class ToastView extends React.Component<ToastViewProps> {
  public static propTypes = {
    /**
     * Adds action handling and close icon for toast
     */
    action: shape({
      label: string.isRequired,
      handler: func.isRequired,
    }),
    /**
     * Toast content
     */
    children: string.isRequired,
    onClose: func,
  };

  private theme!: Theme;

  public render() {
    return (
      <ThemeConsumer>
        {theme => {
          this.theme = theme;
          return this.renderMain();
        }}
      </ThemeConsumer>
    );
  }

  private renderMain() {
    const { children, action, onClose, ...rest } = this.props;

    const link = action ? (
      <span className={jsStyles.link(this.theme)} onClick={action.handler}>
        {action.label}
      </span>
    ) : null;

    const close = action ? (
      <span className={jsStyles.closeWrapper()}>
        <span className={jsStyles.close(this.theme)} onClick={onClose}>
          <CrossIcon />
        </span>
      </span>
    ) : null;

    return (
      <ZIndex priority="Toast" className={jsStyles.wrapper()}>
        <div data-tid="ToastView__root" className={jsStyles.root(this.theme)} {...rest}>
          <span>{children}</span>
          {link}
          {close}
        </div>
      </ZIndex>
    );
  }
}
