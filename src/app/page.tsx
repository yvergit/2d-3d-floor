import Script from 'next/script';
import { CozyShell } from '@/components/shell/CozyShell';



export default function Page() {
  return (
    
    <>
      <Script id="cursor-fix" strategy="afterInteractive">
{`
  document.addEventListener('pointermove', e => {
    const v = document.getElementById('viewer');
    if (!v) return;
    const c = v.querySelector('canvas');
    if (!c) return;
    const r = c.getBoundingClientRect();
    event.clientX = e.clientX - r.left;
    event.clientY = e.clientY - r.top;
  }, true);
`}
</Script>


      {/* Keep legacy libs in the same order as the original app */}
      <Script src="/js/lib/jquery-2.1.4.min.js" strategy="beforeInteractive" />
      <Script src="/js/lib/jquery.flip.min.js" strategy="afterInteractive" />
      <Script src="/js/lib/dat.gui.min.js" strategy="afterInteractive" />
      <Script src="/js/lib/quicksettings.min.js" strategy="afterInteractive" />
      <Script src="/js/lib/bootstrap.min.js" strategy="afterInteractive" />

      {/* Core engine + inventory + app wiring */}
      <Script src="/js/bp3djs.js" strategy="afterInteractive" />
      <Script src="/js/items.js" strategy="afterInteractive" />
      <Script src="/js/items_gltf.js" strategy="afterInteractive" />
      <Script src="/js/app.js" strategy="afterInteractive" />

      <CozyShell />
    </>
  );
}
