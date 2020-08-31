import { shift } from '../../lib/styles/DimensionFunctions';
import { isIE11, isEdge } from '../../lib/utils';

const getBtnPadding = (fontSize: string, paddingY: string, paddingX: string, additionalOffset = 0): string => {
  let paddingTop = paddingY;
  let paddingBottom = paddingY;

  const shiftUp = (top: string, bottom: string, offset: number) => {
    return [shift(top, `${-offset}`), shift(bottom, `${offset}`)];
  };

  if (fontSize === '16px') {
    [paddingTop, paddingBottom] = shiftUp(paddingTop, paddingBottom, 1);
  }
  if (additionalOffset) {
    [paddingTop, paddingBottom] = shiftUp(paddingTop, paddingBottom, additionalOffset);
  }

  return `${paddingTop} ${paddingX} ${paddingBottom}`;
};

export const buttonUseMixin = (
  btnBackground: string,
  btnBackgroundStart: string,
  btnBackgroundEnd: string,
  arrowBackgroundStart: string,
  arrowBackgroundEnd: string,
  shadow: string,
  shadowArrow: string,
  shadowArrowLeft: string,
  color: string,
  border: string,
  selectorArrow: string,
  isLeftArrow: boolean,
) => {
  return `
    background: ${
      btnBackgroundStart === btnBackgroundEnd && btnBackground
        ? btnBackground
        : `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})`
    };
    color: ${color};
    box-shadow: ${shadow};
    border: ${border};

    ${selectorArrow} {
      ${
        isLeftArrow
          ? `
        background: ${
          arrowBackgroundStart === arrowBackgroundEnd
            ? arrowBackgroundStart
            : `linear-gradient(to top left, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`
        };
        box-shadow: ${shadowArrowLeft};
      `
          : `
        background: ${
          arrowBackgroundStart === arrowBackgroundEnd
            ? arrowBackgroundStart
            : `linear-gradient(to bottom right, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`
        };
        box-shadow: ${shadowArrow};
      `
      }
    }
  `;
};

export const buttonHoverMixin = (
  btnBackground: string,
  btnBackgroundStart: string,
  btnBackgroundEnd: string,
  arrowBackgroundStart: string,
  arrowBackgroundEnd: string,
  btnShadow: string,
  arrowShadow: string,
  arrowLeftShadow: string,
  btnBorder: string,
  selectorArrow: string,
  isLeftArrow: boolean,
) => {
  return `
    &:hover {
      background: ${
        btnBackgroundStart === btnBackgroundEnd && btnBackground
          ? btnBackground
          : `linear-gradient(${btnBackgroundStart}, ${btnBackgroundEnd})`
      };
      box-shadow: ${btnShadow};
      border-color: ${btnBorder};

      ${selectorArrow} {
        ${
          isLeftArrow
            ? `
            background: ${
              arrowBackgroundStart === arrowBackgroundEnd
                ? arrowBackgroundStart
                : `linear-gradient(to top left, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`
            };
            box-shadow: ${arrowLeftShadow};
          `
            : `
            background: ${
              arrowBackgroundStart === arrowBackgroundEnd
                ? arrowBackgroundStart
                : `linear-gradient(to bottom right, ${arrowBackgroundStart}, ${arrowBackgroundEnd})`
            };
            box-shadow: ${arrowShadow};
          `
        }
      }
    }
  `;
};

export const buttonActiveCaptionMixin = () => {
  return `
    transform: translateY(1px);
  `;
};

export const buttonActiveMixin = (
  isActive: boolean,
  btnBackground: string,
  arrowBackground: string,
  arrowLeftBackground: string,
  btnShadow: string,
  arrowShadow: string,
  arrowLeftShadow: string,
  selectorArrow: string,
  isLeftArrow: boolean,
) => {
  const activeStyles = `
    background: ${btnBackground};
    box-shadow: ${btnShadow};

    ${selectorArrow} {
      ${
        isLeftArrow
          ? `
        background: ${arrowLeftBackground};
        box-shadow: ${arrowLeftShadow};
      `
          : `
        background: ${arrowBackground};
        box-shadow: ${arrowShadow};
      `
      }
    }
  `;
  return `
    &:active {
      ${activeStyles};
    }
    ${
      isActive
        ? `
        &, &:hover {
          ${activeStyles};
        }
      `
        : ``
    }
  `;
};

export const buttonIconSizeMixin = (size: string, gap: string) => {
  return `
    width: ${size};
    padding-right: ${gap};
  `;
};

export const buttonLinkSizeMixin = (fontSize: string) => {
  return `
    font-size: ${fontSize};
  `;
};

export const buttonSizeMixin = (
  fontSize: string,
  height: string, // todo: remove, in IE broke screenshots without height
  heightShift: string, // todo: remove, in IE broke screenshots without height
  lineHeight: string,
  paddingX: string,
  paddingY: string,
  borderRadius: string,
) => {
  return `
    font-size: ${fontSize};
    box-sizing: border-box;
    height: ${shift(height, heightShift)};
    padding: ${getBtnPadding(fontSize, paddingY, paddingX)};
    line-height: ${lineHeight};
    border-radius: ${borderRadius};

    ${
      isIE11 || isEdge
        ? `
        padding: ${getBtnPadding(fontSize, paddingY, paddingX, 1)};
        line-height: normal;
      `
        : ``
    }
  `;
};

export const buttonArrowSizeMixin = (
  top: string,
  left: string,
  right: string,
  size: string,
  transform: string,
  selectorArrow: string,
  isLeftArrow: boolean,
) => {
  return `
    ${selectorArrow} {
      top: ${top};
      right: ${right};
      height: ${size};
      width: ${size};
      transform: ${transform};
      overflow: hidden;

      ${isLeftArrow &&
        `
        left: ${left};
        transform: rotate(232deg) skewX(25deg) skewY(8deg);
      `}
    }
  `;
};

export const buttonLoadingArrowMixin = (
  top: string,
  leftArrowTop: string,
  left: string,
  height: string,
  background: string,
  delay: string,
  btn_loading_arrow: string,
  selectorArrow: string,
  isLeftArrow: boolean,
) => {
  return `
    ${selectorArrow}::before {
      content: '';
      display: block;
      position: absolute;
      top: ${top};
      left: -207px;
      right: -72px;
      height: ${height};
      background: ${background};
      background-size: 41px 100%;
      opacity: 0.2;
      transform: translateX(50px) rotate(-44.3deg);
      animation: ${btn_loading_arrow} 1s linear infinite;

      ${isLeftArrow &&
        `
        top: ${leftArrowTop};
        left: ${left};
        animation-direction: reverse;
        transform: translateX(42px) rotate(-44.3deg);
        animation-delay: ${delay};
      `}
    }
  `;
};