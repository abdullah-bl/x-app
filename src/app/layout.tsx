import type { Metadata } from "next"
import { Rubik } from "../fonts"
import "./globals.css"
import { ThemeProvider } from "~/components/layout/theme"
import { Toaster } from "~/components/ui/sonner"

export const metadata: Metadata = {
  title: "Overview App",
  description: "Manage your tasks and projects with ease.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      translate="no"
      suppressHydrationWarning
      className={Rubik.className}
    >
      <body className=" overflow-hidden scroll-smooth mx-auto max-w-8xl">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
