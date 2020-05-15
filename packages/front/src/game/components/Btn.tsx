import React from 'react'
import styles from './Btn.module.scss'
import classNames from 'classnames/bind'
import { PropsWithChildren } from 'react'

const cx = classNames.bind(styles)
// TO-DO: MIgrate to enum
// enum ButtonSize = {
//   Big,
//   Small,
//   SmallDesktop
// }

type Props = {
  className?: string
  onClick: () => any
  disabled?: boolean
  size?: 'big' | 'small' | 'small-desktop'
  variant?: 'default' | 'light' | 'red'
  desktop?: 'small'
  style?: object
  isLoading?: boolean
  loadingText?: string
}

const Btn = ({
  disabled = false,
  size = 'big',
  variant = 'default',
  className = '',
  isLoading = false,
  onClick,
  desktop,
  style,
  children,
  loadingText
}: PropsWithChildren<Props>) => {
  const handleClick = (event: any) => {
    event.preventDefault()
    if (!disabled && !isLoading && onClick) {
      onClick()
    }
  }
  const renderSpinner = () => {
    return (
      <div id="spinner-return" className={cx('spinner')}>
        <div className={cx('spinner__item', 'spinner__item1')}></div>
        <div className={cx('spinner__item', 'spinner__item2')}></div>
        <div className={cx('spinner__item', 'spinner__item3')}></div>
        <div className={cx('spinner__item', 'spinner__item4')}></div>
      </div>
    )
  }
  const classes = cx(
    'btn',
    {
      // Size
      'btn-big': size === 'big',
      'btn-small': size === 'small'
    },
    {
      // Variants
      'btn-main': variant === 'default',
      'btn-light': variant === 'light',
      'btn-red': variant === 'red'
    },
    {
      // Modifiers
      disabled: !!disabled || !!isLoading
    },
    {
      // Desktop Layout
      'btn-small-desktop': desktop === 'small'
    },
    className
  )
  return (
    <button onClick={handleClick} className={classes} style={style}>
      <div className={cx('label')}>
        {isLoading && loadingText ? loadingText : children}
        {isLoading && renderSpinner()}
      </div>
    </button>
  )
}
export default Btn
