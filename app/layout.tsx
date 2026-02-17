import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { inter, jetbrainsMono } from "@/lib/config/fonts";
import { getUserLocale } from "@/lib/locale";
import "./globals.css";
import { PageTransition } from "@/components/page-transition";
import { Header } from "@/features/navigation/Header";
import { HeaderScrollEffect } from "@/features/navigation/HeaderScrollEffect";
import { HeroBackground } from "@/features/hero/ui/hero-background/HeroBackground";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Portfolio — Dev DNA",
  description: "Portfolio — Tech, Style & Product Vision",
};

export default async function RootLayout({ children }: Props) {
  const [messages, locale] = await Promise.all([
    getMessages(),
    getUserLocale(),
  ]);

  return (
    <html lang={locale}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover"
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <PageTransition>
            <div className="layout-root relative flex min-h-screen flex-col">
              <HeroBackground />
              <div className="relative z-10 flex min-h-screen flex-col">
                <HeaderScrollEffect />
                <Header />
                <main className="flex min-h-0 flex-1 flex-col">{children}</main>
              </div>
            </div>
          </PageTransition>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
