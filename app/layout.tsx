import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bumbeez — Services entre voisins",
  description:
    "Bumbeez met en relation voisins et prestataires pour les services du quotidien : ménage, bricolage, jardinage, garde d'enfants et plus. Paiement sécurisé.",
  metadataBase: new URL("https://bumbeez.fr"),
  openGraph: {
    title: "Bumbeez — Services entre voisins",
    description:
      "Trouvez un service près de chez vous ou proposez les vôtres en quelques minutes.",
    locale: "fr_FR",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-10 border-b border-gray-100 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-extrabold text-gray-900"
            >
              <Image
                src="/applogo.png"
                alt="Bumbeez"
                width={32}
                height={32}
                className="rounded-lg"
                priority
              />
              Bumbeez
            </Link>
            <nav className="hidden items-center gap-4 text-sm font-medium text-gray-600 sm:flex sm:gap-6">
              <Link href="/contact" className="hover:text-gray-900">
                Contact
              </Link>
              <Link href="/cgu" className="hover:text-gray-900">
                CGU/V
              </Link>
              <Link href="/confidentialite" className="hover:text-gray-900">
                Confidentialité
              </Link>
              <Link href="/mentions-legales" className="hover:text-gray-900">
                Mentions légales
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-gray-100 bg-gray-50 px-6 py-10 text-center text-sm text-gray-600">
          <div className="mx-auto max-w-5xl">
            <div className="mb-3 flex flex-wrap justify-center gap-4">
              <Link href="/" className="hover:text-gray-900">
                Accueil
              </Link>
              <Link href="/contact" className="hover:text-gray-900">
                Contact
              </Link>
              <Link href="/cgu" className="hover:text-gray-900">
                CGU/V
              </Link>
              <Link href="/confidentialite" className="hover:text-gray-900">
                Confidentialité
              </Link>
              <Link href="/mentions-legales" className="hover:text-gray-900">
                Mentions légales
              </Link>
            </div>
            <div className="mb-3 text-xs text-gray-400">
              BUMBEEZ SAS · RCS Thionville 929 391 787 · 80 rue de Dudelange,
              57330 Volmerange-les-Mines
            </div>
            <div className="text-gray-400">
              © {new Date().getFullYear()} Bumbeez. Tous droits réservés.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
