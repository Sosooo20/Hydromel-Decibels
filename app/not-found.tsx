import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero">
      <div className="hero__bg-gradient" />
      <div className="hero__bg-overlay" />

      <div className="hero__content">
        <p className="notfound__code">404</p>

        <div className="hero__label">
          <span>Territoire Inexploré</span>
        </div>

        <h1 className="notfound__title">Vous Êtes Perdus, Voyageur</h1>

        <p className="hero__quote">
          Ce chemin n&apos;existe pas dans notre royaume. La page que vous cherchez
          s&apos;est peut-être évanouie dans les brumes de l&apos;Aude, ou n&apos;a jamais existé.
        </p>

        <div className="hero__cta">
          <Link href="/" className="btn-hero-primary">
            Retour au Château &raquo;
          </Link>
          <Link href="/evenement" className="btn-hero-outline">
            Voir les Événements
          </Link>
        </div>
      </div>
    </section>
  );
}
