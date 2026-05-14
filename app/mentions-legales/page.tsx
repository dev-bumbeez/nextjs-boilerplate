import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Mentions légales — Bumbeez",
  description:
    "Mentions légales de l'application Bumbeez : éditeur, hébergeur, propriété intellectuelle, médiation.",
};

export default function LegalNoticePage() {
  return (
    <article className="prose-legal mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Mentions légales
      </h1>

      <h2>1. Édition de l&apos;application et du site</h2>
      <p>
        En vertu de l&apos;article 6 de la Loi n° 2004-575 du 21 juin 2004 pour
        la confiance dans l&apos;économie numérique (LCEN), il est précisé aux
        utilisateurs de l&apos;application Bumbeez l&apos;identité des
        différents intervenants dans le cadre de sa réalisation et de son
        suivi :
      </p>
      <ul>
        <li>
          <strong>Éditeur</strong> : La société BUMBEEZ, Société par Actions
          Simplifiée (SAS) au capital social de 100 €.
        </li>
        <li>
          <strong>Siège social</strong> : 80 rue de Dudelange, 57330
          Volmerange-les-Mines.
        </li>
        <li>
          <strong>Immatriculation</strong> : Inscrite au Registre du Commerce
          et des Sociétés (RCS) de Thionville sous le numéro 929 391 787.
        </li>
        <li>
          <strong>Numéro de TVA Intracommunautaire</strong> : FR01929391787
        </li>
        <li>
          <strong>Directeur de la publication</strong> : Monsieur Pierre
          Peuvrel, en sa qualité de Président.
        </li>
        <li>
          <strong>Contact</strong> :{" "}
          <a href="mailto:contact@bumbeez.fr">contact@bumbeez.fr</a>
        </li>
      </ul>

      <h2>2. Hébergement</h2>
      <p>L&apos;Application et ses bases de données sont hébergées par :</p>
      <ul>
        <li>
          <strong>Hébergeur</strong> : Railway Corp.
        </li>
        <li>
          <strong>Adresse</strong> : 548 Market St, PMB 54723, San Francisco,
          CA 94104, USA.
        </li>
        <li>
          <strong>Contact</strong> :{" "}
          <a href="mailto:contact@railway.app">contact@railway.app</a>
        </li>
      </ul>

      <h2>3. Définitions</h2>
      <ul>
        <li>
          <strong>Application</strong> : Désigne l&apos;application mobile
          « Bumbeez » et le site web associé.
        </li>
        <li>
          <strong>Utilisateur</strong> : Toute personne physique utilisant
          l&apos;Application.
        </li>
        <li>
          <strong>Contenu</strong> : Désigne l&apos;ensemble des éléments
          (textes, images…) publiés par l&apos;Éditeur ou les Utilisateurs sur
          l&apos;Application.
        </li>
      </ul>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        La société BUMBEEZ est propriétaire exclusive de tous les droits de
        propriété intellectuelle ou détient les droits d&apos;usage sur tous
        les éléments accessibles sur l&apos;Application (textes, logo, icônes,
        logiciels, base de données). Toute reproduction, représentation,
        modification ou adaptation totale ou partielle de ces éléments est
        strictement interdite sans autorisation écrite préalable. Toute
        exploitation non autorisée sera considérée comme constitutive
        d&apos;une contrefaçon (articles L.335-2 et suivants du Code de
        Propriété Intellectuelle).
      </p>

      <h2>5. Protection des données personnelles (RGPD)</h2>
      <p>
        Conformément au Règlement Général sur la Protection des Données (RGPD)
        et à la loi « Informatique et Libertés », BUMBEEZ s&apos;engage à
        protéger la vie privée de ses Utilisateurs.
      </p>
      <ul>
        <li>
          <strong>Collecte</strong> : Les données collectées sont nécessaires à
          la mise en relation et au paiement.
        </li>
        <li>
          <strong>Droits</strong> : Chaque Utilisateur dispose d&apos;un droit
          d&apos;accès, de rectification, de portabilité et de suppression de
          ses données.
        </li>
        <li>
          <strong>Contact RGPD</strong> :{" "}
          <a href="mailto:contact@bumbeez.fr">contact@bumbeez.fr</a>.
        </li>
      </ul>
      <p>
        Pour plus de détails, consultez notre{" "}
        <a href="/confidentialite">Politique de confidentialité</a>.
      </p>

      <h2>6. Rôle et limitation de responsabilité</h2>
      <p>
        <strong>Intermédiation</strong> : BUMBEEZ agit en qualité
        d&apos;opérateur de plateforme en ligne (Art. L. 111-7 du Code de la
        consommation). Son rôle est limité à la mise en relation technique.
        BUMBEEZ n&apos;intervient pas dans la réalisation des prestations et
        n&apos;est pas responsable des dommages résultant de la relation
        contractuelle entre Utilisateurs.
      </p>
      <p>
        <strong>Disponibilité</strong> : L&apos;Éditeur s&apos;efforce
        d&apos;assurer un accès 24h/24 à l&apos;Application mais ne saurait
        être tenu responsable en cas d&apos;interruption pour maintenance, de
        bugs techniques ou de défaillance du réseau internet.
      </p>

      <h2>7. Obligations fiscales (DAC7)</h2>
      <p>
        En application de la directive européenne « DAC7 », BUMBEEZ informe
        les Utilisateurs que les revenus générés sur la plateforme font
        l&apos;objet d&apos;une déclaration annuelle auprès de
        l&apos;administration fiscale française dès que les seuils légaux sont
        franchis.
      </p>

      <h2>8. Médiation et signalement</h2>
      <ul>
        <li>
          <strong>Signalement</strong> : Tout contenu abusif, comportement
          inapproprié ou manquement aux règles de la communauté peut être
          signalé directement via l&apos;Application ou par e-mail à
          l&apos;adresse :{" "}
          <a href="mailto:contact@bumbeez.fr">contact@bumbeez.fr</a>.
        </li>
        <li>
          <strong>Médiation de la consommation</strong> : Conformément aux
          articles L.612-1 et suivants du Code de la consommation, en cas de
          litige de consommation n&apos;ayant pu être résolu amiablement par
          une réclamation préalable écrite auprès du service client de
          BUMBEEZ, l&apos;Utilisateur peut saisir gratuitement le médiateur de
          la consommation suivant :
          <div className="my-3 flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <Image
              src="/partners/cm2c.png"
              alt="CM2C — Centre de la Médiation de la Consommation de Conciliateurs de Justice"
              width={127}
              height={72}
              className="shrink-0"
            />
            <ul className="m-0">
              <li>
                <strong>
                  CM2C (Centre de la Médiation de la Consommation de
                  Conciliateurs de Justice)
                </strong>
              </li>
              <li>
                Site internet :{" "}
                <a
                  href="https://www.cm2c.net"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://www.cm2c.net
                </a>
              </li>
              <li>Adresse postale : 14 rue Saint Jean, 75017 Paris</li>
            </ul>
          </div>
        </li>
      </ul>
      <p>
        L&apos;Utilisateur peut également recourir à la plateforme de{" "}
        <strong>Règlement en Ligne des Litiges (RLL)</strong> fournie par la
        Commission européenne, accessible à l&apos;adresse suivante :{" "}
        <a
          href="https://ec.europa.eu/consumers/odr"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://ec.europa.eu/consumers/odr
        </a>
        .
      </p>

      <h2>9. Droit applicable et juridiction</h2>
      <p>
        Les présentes mentions sont régies par le droit français. À défaut de
        résolution amiable, compétence exclusive est attribuée au Tribunal de
        Thionville.
      </p>
    </article>
  );
}
