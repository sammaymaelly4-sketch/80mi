import "./globals.css";
import BottomNav from "@/components/nav/BottomNav";
import ServiceWorker from "@/components/pwa/ServiceWorker";

export const metadata = {
  title: "Painel de Saúde",
  description: "App simples para rotina, agenda e exames.",
  applicationName: "Painel de Saúde",
  manifest: "/manifest.webmanifest",
  themeColor: "#0f172a",
  appleWebApp: {
    capable: true,
    title: "Painel de Saúde",
    statusBarStyle: "default"
  },
  icons: {
    icon: "/icons/app-icon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ServiceWorker />
        <div className="app-enter mx-auto min-h-screen max-w-md px-6 pb-24 pt-8">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
