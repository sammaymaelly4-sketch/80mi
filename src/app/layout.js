import "./globals.css";
import BottomNav from "@/components/nav/BottomNav";
import WelcomeLayoutClient from "@/components/welcome/WelcomeLayoutClient";

export const metadata = {
  title: "Painel de Saúde",
  description: "App simples para rotina, agenda e exames."
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <WelcomeLayoutClient>
          <div className="mx-auto min-h-screen max-w-md px-6 pb-24 pt-8">
            {children}
          </div>
          <BottomNav />
        </WelcomeLayoutClient>
      </body>
    </html>
  );
}
