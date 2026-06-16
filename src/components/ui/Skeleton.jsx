/**
 * @component Skeleton
 * @description Animated placeholder for content that is loading.
 *
 * @param {'text'|'block'|'circle'} [variant='text'] - Shape variant
 * @param {string|number} [width] - Explicit width (e.g. '100%', 200)
 * @param {string|number} [height] - Explicit height (e.g. 40, '2rem')
 * @param {'full'|'three-quarter'|'half'|'third'} [widthPreset] - Preset width class (text variant)
 * @param {string} [className] - Additional CSS classes
 */
import './Skeleton.css';

export function Skeleton({
  variant = 'text',
  width,
  height,
  widthPreset = 'full',
  className = '',
  ...props
}) {
  const classes = [
    'skeleton',
    `skeleton--${variant}`,
    variant === 'text' && !width && `skeleton--${widthPreset}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  /* Only apply inline styles for explicit dimensions */
  const style = {};
  if (width !== undefined)  style.width  = typeof width  === 'number' ? `${width}px`  : width;
  if (height !== undefined) style.height = typeof height === 'number' ? `${height}px` : height;

  /* Default sizes for circle if not specified */
  if (variant === 'circle') {
    if (!style.width)  style.width  = '40px';
    if (!style.height) style.height = '40px';
  }

  return (
    <div
      className={classes}
      style={Object.keys(style).length > 0 ? style : undefined}
      aria-hidden="true"
      {...props}
    />
  );
}

export default Skeleton;
