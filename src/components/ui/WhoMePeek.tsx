import Image from 'next/image';

/**
 * Figma `artiom-vector` (160:2717) — cartoon that peeks from behind
 * the Who Me? pill on hover / keyboard focus.
 */
export function WhoMePeek() {
  return (
    <span className="t-who-me-peek" aria-hidden="true">
      <span className="t-who-me-peek-figure">
        <Image
          src="/brand/artiom-vector.svg"
          alt=""
          width={71}
          height={85}
          unoptimized
          draggable={false}
        />
      </span>
    </span>
  );
}
