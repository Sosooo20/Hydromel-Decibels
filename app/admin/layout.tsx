import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-8"
     style={{
        backgroundImage: "url('/parchemin-bg.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-black" />
          <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-black">
            Salle du Conseil
          </span>
          <div className="h-px w-8 bg-black" />
        </div>
        <h1 className="font-display mb-6 text-center text-2xl font-bold text-brown md:text-3xl">
          Administration
        </h1>

        <div className="flex flex-col gap-6 md:flex-row">
          <AdminSidebar />
          <div className="min-w-0 flex-1 text-black">{children}</div>
        </div>
      </div>
    </section>
  );
}
