"use client";

export default function PerfilPage() {
  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Perfil</h1>
        <p className="text-sm text-slate-500">Informações básicas e contatos úteis.</p>
      </header>

      <div className="card-base space-y-3 p-5 text-sm text-slate-600">
        <p className="text-base font-semibold text-slate-800">Dona Maria</p>
        <p>Idade: 84 anos</p>
        <p>Contato de emergência: (11) 99999-0000</p>
        <p>Observações: Manter hidratação e caminhar com apoio.</p>
      </div>
    </main>
  );
}
