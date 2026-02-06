import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { inter, jetbrainsMono } from "@/lib/config/fonts";
import "./globals.css";
import { PageTransition } from "@/components/page-transition";
import { Header } from "@/features/navigation/Header";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Portfolio — Developer Control Room",
  description: "Portfolio senior — Vision, ADN & Design System",
};

export default async function RootLayout({ children }: Props) {
  const messages = await getMessages();

  return (
    <html lang="en">
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
            <div className="flex min-h-screen flex-col overflow-hidden">
              <Header />
              <main className="flex min-h-0 flex-1">
                {children}
              </main>
            </div>
          </PageTransition>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
