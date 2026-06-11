export default function AppInstallSection() {
  return (
    <section className="bg-parchment py-16">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <div className="mb-4 flex items-center justify-center gap-3">
          <div className="h-px w-8 bg-gold" />
          <span className="font-heading text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
            L&apos;App
          </span>
          <div className="h-px w-8 bg-gold" />
        </div>
        <h2 className="font-display mb-3 text-2xl font-bold text-brown md:text-3xl">
          Votre Compagnon de Quête Numérique
        </h2>
        <p className="font-heading mx-auto mb-10 max-w-xl text-sm leading-relaxed text-brown-mid">
          Installez Hydromel et Décibels sur votre écran d&apos;accueil pour accéder à la
          programmation, la carte et vos quêtes même sans connexion.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-xl bg-parchment-light p-6 text-left">
            <h3 className="font-display mb-3 text-base font-bold text-brown">Android (Chrome)</h3>
            <ol className="font-heading flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed text-brown-mid">
              <li>Ouvrez le menu &laquo;&nbsp;⋮&nbsp;&raquo; en haut à droite</li>
              <li>Sélectionnez &laquo;&nbsp;Installer l&apos;application&nbsp;&raquo;</li>
              <li>Confirmez l&apos;installation</li>
            </ol>
          </div>

          <div className="rounded-xl bg-parchment-light p-6 text-left">
            <h3 className="font-display mb-3 text-base font-bold text-brown">iOS (Safari)</h3>
            <ol className="font-heading flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed text-brown-mid">
              <li>Appuyez sur l&apos;icône de partage</li>
              <li>Choisissez &laquo;&nbsp;Sur l&apos;écran d&apos;accueil&nbsp;&raquo;</li>
              <li>Appuyez sur &laquo;&nbsp;Ajouter&nbsp;&raquo;</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
