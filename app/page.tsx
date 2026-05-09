import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-b from-[var(--bg-soft)] to-white px-6 py-20 text-center">
        <Image
          src="/applogo.png"
          alt="Bumbeez"
          width={80}
          height={80}
          className="mx-auto mb-8 rounded-2xl shadow-lg shadow-amber-200/60"
          priority
        />
        <h1 className="mx-auto max-w-2xl text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Vos services entre voisins
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-gray-600">
          Bumbeez met en relation voisins et prestataires pour les services du
          quotidien : ménage, bricolage, jardinage, garde d&apos;enfants et bien
          plus.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon="🏡"
            title="Trouvez près de chez vous"
            description="Découvrez les services proposés par les voisins autour de vous grâce à la géolocalisation."
          />
          <Feature
            icon="💬"
            title="Discutez en direct"
            description="Échangez avec le prestataire via la messagerie intégrée et fixez ensemble le tarif."
          />
          <Feature
            icon="🔒"
            title="Paiement sécurisé"
            description="Le paiement n'est prélevé qu'après validation de la mission. Géré par Stripe."
          />
          <Feature
            icon="⭐"
            title="Avis vérifiés"
            description="Chaque mission donne lieu à des avis mutuels pour bâtir une communauté de confiance."
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Comment ça marche ?
        </h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          <Step
            n={1}
            title="Publiez votre besoin"
            description="Décrivez le service dont vous avez besoin et fixez votre tarif horaire."
          />
          <Step
            n={2}
            title="Recevez des propositions"
            description="Des prestataires à proximité vous répondent. Choisissez celui qui vous convient."
          />
          <Step
            n={3}
            title="Suivez et validez"
            description="Suivez la mission en temps réel. Validez le paiement une fois terminée à votre satisfaction."
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-3xl bg-gray-900 px-6 py-14 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Téléchargez Bumbeez
          </h2>
          <p className="mx-auto mt-3 max-w-md text-gray-300">
            Disponible sur iOS et Android. L&apos;inscription est gratuite, vous ne
            payez qu&apos;au moment d&apos;une mission.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="cursor-default rounded-xl bg-white/90 px-5 py-3 font-semibold text-gray-900 opacity-60">
              App Store · Bientôt
            </span>
            <span className="cursor-default rounded-xl bg-white/90 px-5 py-3 font-semibold text-gray-900 opacity-60">
              Google Play · Bientôt
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
      <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)] text-2xl">
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  );
}

function Step({
  n,
  title,
  description,
}: {
  n: number;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 font-extrabold text-[var(--primary)]">
        {n}
      </div>
      <h3 className="font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  );
}
