/**
 * @component Badge
 * @description Small pill-shaped label for status indicators, tags, and counts.
 *
 * @param {'default'|'accent'|'success'|'warning'|'danger'} [variant='default'] - Color variant
 * @param {'sm'|'md'} [size='sm'] - Badge size
 * @param {boolean} [dot=false] - Show a dot indicator before the label
 * @param {string} [className] - Additional CSS classes
 * @param {React.ReactNode} children - Badge content
 */
import './Badge.css';

export function Badge({
  variant = 'default',
  size = 'sm',
  dot = false,
  className = '',
  children,
  ...props
}) {
  const classes = [
    'badge',
    `badge--${variant}`,
    `badge--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {dot && <span className="badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

export default Badge;
