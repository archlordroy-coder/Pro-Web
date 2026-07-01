export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord Admin</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded shadow">
          <h2 className="font-bold">Services</h2>
          <p>Gérer les services proposés.</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="font-bold">Produits</h2>
          <p>Gérer le catalogue produits.</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="font-bold">Commandes</h2>
          <p>Voir les commandes clients.</p>
        </div>
      </div>
    </div>
  );
}
