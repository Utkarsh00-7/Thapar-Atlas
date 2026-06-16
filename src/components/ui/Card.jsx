/**
 * @component Card
 * @description Flexible card container with visual variants and optional interactivity.
 *
 * @param {'default'|'elevated'|'interactive'} [variant='default'] - Visual style
 * @param {'none'|'sm'|'md'|'lg'} [padding='md'] - Internal padding
 * @param {Function} [onClick] - Click handler (automatically uses interactive variant styles)
 * @param {string} [className] - Additional CSS classes
 * @param {React.ReactNode} children - Card content
 */
import './Card.css';

export function Card({
  variant = 'default',
  padding = 'md',
  onClick,
  className = '',
  children,
  ...props
}) {
  /* If onClick is provided, prefer interactive variant for hover feedback */
  const resolvedVariant = onClick && variant === 'default' ? 'interactive' : variant;

  const classes = [
    'card',
    `card--${resolvedVariant}`,
    `card--padding-${padding}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={classes}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      {...props}
    >
      {children}
    </Component>
  );
}

export default Card;
