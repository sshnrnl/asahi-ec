import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import Providers from "./Providers";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import { getTotalItems } from "./(carts)/cart/action";
import { getTotalWishlist } from "./(carts)/wishlist/action";
import { Phone } from "lucide-react";

import "../styles/globals.css";

export const metadata: Metadata = {
  title: "PT ASAHI FIBREGLASS",
  description: "JUAL IPAL BIO ASAHI FIBREGLASS TERPERCAYA DI INDONESIA",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await getServerSession(authOptions);
  const totalItemsCart = await getTotalItems(session);
  const totalItemsWishlists = await getTotalWishlist();

  return (
    <html lang="en">
      <Providers>
        <body className={GeistSans.className}>
          <Navbar
            session={session}
            totalItemsCart={totalItemsCart}
            totalWishlists={totalItemsWishlists?.items.length}
          />

          

          <main className="pointer-events-auto">
            {children}
            <Toaster position="top-right" />
            <Analytics />
            <SpeedInsights />
          </main>
          <Footer />

          <div className="z-10 flex items-center gap-2 h-min py-3 px-5 rounded-md bg-green-500 w-min fixed bottom-4 right-4">
            <a
              className="flex items-center gap-2"
              href={`https://api.whatsapp.com/send?phone=6282116600600&text=${encodeURIComponent(
                "Terima kasih telah menghubungi PT. Asahi Fibreglass. Kami produsen IPAL, STP, Tangki Air, Tangki Kimia, Septic Tank & produk fiberglass lainnya.\n\nMohon isi data berikut,\n\n\t1.	Nama :\n\t2.	Perusahaan (PT) :\n\t3.	Lokasi Proyek :\n\t4.	Kebutuhan : \n\nTim kami akan segera menghubungi Anda 🙏🏻"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="z-50 border-2 p-2 rounded-full ">
                <Phone color="#f5f5f5" size={20} strokeWidth={2} />
              </div>
              <p className=" font-bold text-neutral-100">Marketing</p>
            </a>
          </div>
        </body>
      </Providers>
    </html>
  );
}
