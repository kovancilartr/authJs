import type { Metadata } from "next";
// Next.js'de metadata türünü içe aktarır. Bu, sayfanın başlık ve açıklama gibi meta bilgilerini tanımlamak için kullanılır.

import localFont from "next/font/local";
// Next.js'den localFont fonksiyonunu içe aktarır. Bu, yerel font dosyalarını projeye dahil etmek için kullanılır.

import "./globals.css";
// Global CSS stil dosyasını içe aktarır. Bu, tüm uygulamada geçerli olacak genel stilleri uygular.

import { SessionProvider } from "next-auth/react";
// next-auth paketinden SessionProvider bileşenini içe aktarır. Bu, kullanıcı oturumlarını yönetmek için kullanılır.

import { auth } from "@/auth";
// auth fonksiyonunu içe aktarır. Bu fonksiyon, kullanıcı oturumunu doğrulamak için kullanılır.

import Navbar from "@/components/Navbar";
// Navbar bileşenini içe aktarır. Bu bileşen, uygulamanın navigasyon çubuğunu temsil eder.

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
// Yerel bir font olan Geist Sans'ı tanımlar. Fontun kaynağı (src) ve CSS'te kullanılacak değişken adı (variable) belirtilir. Ayrıca, fontun ağırlık aralığı da tanımlanır.

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
// Yerel bir font olan Geist Mono'yu tanımlar. Benzer şekilde, fontun kaynağı (src), CSS değişken adı (variable) ve ağırlık aralığı belirtilir.

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
// Sayfanın metadata'sını tanımlar. Bu, sayfa başlığı ve açıklama gibi meta bilgilerini içerir.

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Uygulamanın kök layout bileşenini tanımlar. Bu bileşen, sayfanın temel yapısını oluşturur ve children olarak belirtilen alt bileşenleri içerir.

  const session = await auth();
  // Kullanıcının oturum bilgilerini almak için auth fonksiyonunu çağırır.

  return (
    <SessionProvider session={session}>
      {/* Kullanıcının oturum bilgilerini sağlayan SessionProvider bileşeniyle tüm uygulamayı sarmalar. */}
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Sayfa gövdesi için, daha önce tanımlanan font değişkenlerini ve antialiased sınıfını uygular. */}
          <div className="mx-auto max-w-screen-xl h-screen flex flex-col">
            {/* Sayfanın ana yapısını oluşturan bir div. max-w-screen-xl ile ekran genişliğine uyum sağlar ve h-screen ile tam yükseklik kaplar. Flex ve flex-col ile dikey yönlü bir esnek kutu oluşturur. */}
            <Navbar />
            {/* Sayfanın en üstünde görünen Navbar bileşenini ekler. */}
            <div className="flex-grow">{children}</div>
            {/* Sayfanın geri kalan kısmını kaplayan bir div. Flex-grow, bu div'in kalan alanı doldurmasını sağlar. */}
          </div>
        </body>
      </html>
    </SessionProvider>
  );
  // Sayfanın HTML yapısını ve body içeriğini döndürür. SessionProvider ile sarılan yapı, oturum yönetimini sağlar.
}
