import { Touchpad04Icon } from './Touchpad04Icon';

interface IconProps {
  className?: string;
}

/**
 * Figma Copy E-mail leading icon on nested `selection-list` (246:359).
 * Same overlapping-square glyph as the selection-item default (`touchpad-04`).
 */
export function Copy01Icon({ className }: IconProps) {
  return <Touchpad04Icon className={className} />;
}
