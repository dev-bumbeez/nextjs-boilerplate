import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact & Support — Bumbeez",
  description:
    "Contactez l'équipe Bumbeez pour toute question, signalement ou demande de support.",
};

export default function ContactPage() {
  return (
    <article className="prose-legal mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Contact &amp; Support
      </h1>
      <p className="mt-2 mb-8 italic text-gray-500">
        Une question ? Un souci avec votre compte ou une mission ? Nous sommes
        là pour vous aider.
      </p>

      <div className="my-8 rounded-2xl border border-gray-100 bg-gray-50 p-8">
        <h3 className="m-0 mb-2 text-lg font-semibold text-gray-900">
          Nous écrire
        </h3>
        <p className="m-0 mb-4 text-gray-600">
          Pour toute demande, écrivez-nous directement par e-mail. Nous nous
          engageons à répondre sous 48 heures ouvrées.
        </p>
        <a
          href="mailto:contact@bumbeez.fr"
          className="inline-block rounded-xl bg-[var(--primary)] px-5 py-2.5 text-base font-semibold text-gray-900 no-underline hover:bg-[var(--primary-dark)]"
        >
          contact@bumbeez.fr
        </a>
      </div>

      <h2>Quel type de demande ?</h2>

      <h3>🆘 Vous avez besoin d&apos;aide sur l&apos;application</h3>
      <p>
        Compte bloqué, mot de passe oublié, paiement qui n&apos;aboutit pas,
        notification qui n&apos;arrive pas… Décrivez-nous le problème avec
        précision (capture d&apos;écran si possible) à{" "}
        <a href="mailto:contact@bumbeez.fr">contact@bumbeez.fr</a>, nous
        reviendrons vers vous rapidement.
      </p>

      <h3>⚠️ Vous voulez signaler un comportement</h3>
      <p>
        Vous avez constaté un comportement inapproprié, frauduleux, ou un
        contenu choquant ? Vous pouvez signaler directement depuis
        l&apos;application via le bouton « Signaler », ou nous écrire à{" "}
        <a href="mailto:contact@bumbeez.fr">contact@bumbeez.fr</a>. Notre
        équipe de modération examine chaque signalement.
      </p>

      <h3>💼 Vous êtes prestataire et avez une question fiscale</h3>
      <p>
        En tant que prestataire sur Bumbeez, vous êtes responsable de la
        déclaration de vos revenus. Si vous avez des questions sur votre statut
        ou les obligations DAC7, consultez votre conseiller ou contactez-nous
        pour des informations générales.
      </p>

      <h3>🤝 Vous êtes journaliste, partenaire ou investisseur</h3>
      <p>
        Pour toute demande presse, partenariat ou investissement, écrivez-nous
        à <a href="mailto:contact@bumbeez.fr">contact@bumbeez.fr</a> avec en
        objet la nature de votre demande.
      </p>

      <h2>Horaires &amp; délais</h2>
      <p>
        Notre équipe est disponible du lundi au vendredi, de 9h à 18h. Les
        demandes envoyées en dehors de ces horaires seront traitées le jour
        ouvré suivant.
      </p>

      <h2>Exercice de vos droits RGPD</h2>
      <p>
        Pour exercer vos droits relatifs à vos données personnelles (accès,
        rectification, effacement, portabilité, opposition), consultez notre{" "}
        <a href="/confidentialite">Politique de confidentialité</a> ou
        écrivez-nous à{" "}
        <a href="mailto:contact@bumbeez.fr">contact@bumbeez.fr</a> en joignant
        un justificatif d&apos;identité valide. Une réponse vous sera adressée
        dans les meilleurs délais.
      </p>

      <h2>Médiation de la consommation</h2>
      <p>
        Conformément aux articles L.612-1 et suivants du Code de la
        consommation, en cas de litige n&apos;ayant pu être résolu amiablement
        par une réclamation préalable écrite auprès de notre service client,
        vous pouvez saisir gratuitement le médiateur de la consommation :
      </p>
      <div className="my-4 flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
        <Image
          src="/partners/cm2c.png"
          alt="CM2C — Centre de la Médiation de la Consommation de Conciliateurs de Justice"
          width={127}
          height={72}
          className="shrink-0"
        />
        <p className="m-0">
          <strong>
            CM2C (Centre de la Médiation de la Consommation de Conciliateurs de
            Justice)
          </strong>
          <br />
          49 Rue de Ponthieu, 75008 Paris
          <br />
          <a
            href="https://www.cm2c.net"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.cm2c.net
          </a>
        </p>
      </div>

      <h2>Adresse postale</h2>
      <p>
        Bumbeez SAS
        <br />
        80 rue de Dudelange
        <br />
        57330 Volmerange-les-Mines
        <br />
        France
      </p>
    </article>
  );
}
