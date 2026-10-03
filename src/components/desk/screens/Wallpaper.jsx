export default function Wallpaper() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/desk/wallpaper.jpg" alt="" className="h-full w-full object-cover object-center" />
    </div>
  );
}
