import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <p className="text-sm text-foreground-muted">Page not found</p>
      <Link
        href="/"
        className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
      >
        Go home
      </Link>
    </div>
  );
}
