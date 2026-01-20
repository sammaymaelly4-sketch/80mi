// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JULIO SAÚDE",
  applicationName: "JULIO SAÚDE",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JULIO SAÚDE"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <link rel="apple-touch-icon" href="/icons/app-icon.svg" />
      </head>
      <body className="min-h-screen bg-white text-slate-900">
        {children}
        
        {/* Service Worker Registration - Otimizado */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', async () => {
                  try {
                    // Remover service workers antigos
                    const registrations = await navigator.serviceWorker.getRegistrations();
                    for (const registration of registrations) {
                      if (registration.active && registration.active.scriptURL.includes('service-worker.js')) {
                        await registration.unregister();
                        console.log('[App] Service worker antigo removido');
                      }
                    }
                    
                    // Registrar novo service worker
                    const registration = await navigator.serviceWorker.register('/sw.js', {
                      scope: '/',
                      updateViaCache: 'none' // Sempre buscar nova versão
                    });
                    
                    console.log('[App] Service worker registrado:', registration.scope);
                    
                    // Verificar atualizações a cada 30 segundos
                    setInterval(() => {
                      registration.update();
                    }, 30000);
                    
                    // Recarregar página quando nova versão estiver ativa
                    registration.addEventListener('updatefound', () => {
                      const newWorker = registration.installing;
                      
                      newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
                          console.log('[App] Nova versão disponível, recarregando...');
                          window.location.reload();
                        }
                      });
                    });
                    
                  } catch (error) {
                    console.error('[App] Erro ao registrar service worker:', error);
                  }
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}
