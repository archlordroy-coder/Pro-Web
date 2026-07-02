export default function AdminDashboard() {
  return (
    <div className="p-8 bg-background min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-text-primary">Tableau de bord Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Services", desc: "Gérer les services proposés." },
          { title: "Produits", desc: "Gérer le catalogue produits." },
          { title: "Commandes", desc: "Voir les commandes clients." },
        ].map((item) => (
          <div key={item.title} className="p-6 bg-surface border border-border rounded-3xl shadow-sm">
            <h2 className="text-xl font-bold mb-2 text-primary">{item.title}</h2>
            <p className="text-text-secondary">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
