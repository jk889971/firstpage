import type { Metadata } from 'next'
import './globals.css'

import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

export const metadata: Metadata = {
  title: 'Moonexpress',
  description: 'moonexpress is a platform for launching tokens',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#000025] text-white max-[899px]:pb-16">
        {/* ─── TOP NAVBAR (always visible) ─── */}
        <SiteNavbar />

        {/* ─── PAGE CONTENT (hero, cards, etc.) ─── */}
        <main className="flex-1">
          {children}
        </main>

        {/* ─── SITE FOOTER (always rendered below everything) ─── */}
        <SiteFooter />
      </body>
    </html>
  );
}