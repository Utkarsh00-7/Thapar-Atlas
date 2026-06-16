/**
 * @component Button
 * @description Versatile button component with multiple variants, sizes, and states.
 *
 * @param {'primary'|'secondary'|'ghost'|'danger'} [variant='primary'] - Visual style
 * @param {'sm'|'md'|'lg'} [size='md'] - Button size
 * @param {boolean} [loading=false] - Shows a spinner and disables interaction
 * @param {boolean} [disabled=false] - Disables the button
 * @param {boolean} [fullWidth=false] - Stretches to fill container width
 * @param {React.ReactNode} [iconLeft] - Icon element rendered before children
 * @param {React.ReactNode} [iconRight] - Icon element rendered after children
 * @param {string} [className] - Additional CSS classes
 * @param {React.ReactNode} children - Button content
 */
import './Button.css';

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  className = '',
  children,
  ...props
}) {
  const isIconOnly = !children && (iconLeft || iconRight);

  const classes = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    loading && 'btn--loading',
    fullWidth && 'btn--full',
    isIconOnly && 'btn--icon-only',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!loading && iconLeft && (
        <span className="btn__icon" aria-hidden="true">{iconLeft}</span>
      )}
      {children}
      {!loading && iconRight && (
        <span className="btn__icon" aria-hidden="true">{iconRight}</span>
      )}
    </button>
  );
}

export default Button;
