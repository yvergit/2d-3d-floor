import Script from 'next/script';
import { CozyShell } from '@/components/shell/CozyShell';

export default function Page() {
  return (
    <>
      {/* Keep legacy libs in the same order as the original app */}
      <Script src="/js/lib/jquery-2.1.4.min.js" strategy="beforeInteractive" />
      <Script src="/js/lib/jquery.flip.min.js" strategy="afterInteractive" />
      {/* IMPORTANT: jquery.flip uses CSS transforms which can break pointer math in WebGL.
          This shim replaces flip() with a transform-free show/hide toggle while keeping
          the same flip(true/false) API used by legacy /public/js/app.js. */}
      <Script src="/compat/flip-no-transform.js" strategy="afterInteractive" />
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
