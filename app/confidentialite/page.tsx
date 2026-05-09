import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Bumbeez",
  description:
    "Politique de confidentialité de l'application Bumbeez. Données collectées, finalités, droits RGPD.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="prose-legal mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Politique de confidentialité
      </h1>
      <p className="mt-2 mb-8 text-sm italic text-gray-400">
        Dernière mise à jour : Février 2026
      </p>

      <p>
        La société BUMBEEZ (ci-après « <strong>l&apos;Éditeur</strong> »)
        attache une importance capitale à la protection de la vie privée et des
        données à caractère personnel de ses Utilisateurs. La présente
        Politique de Confidentialité a pour objet de définir les modalités de
        collecte, d&apos;utilisation et de partage des données fournies via
        l&apos;Application, conformément au Règlement Général sur la Protection
        des Données (RGPD) et à la Loi Informatique et Libertés.
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement des données est la société{" "}
        <strong>BUMBEEZ SAS</strong>, immatriculée au RCS de Thionville sous le
        numéro 929 391 787, dont le siège social est situé au 80 rue de
        Dudelange, 57330 Volmerange-les-Mines.
      </p>
      <p>
        <strong>Contact référent RGPD</strong> :{" "}
        <a href="mailto:contact@bumbeez.fr">contact@bumbeez.fr</a>
      </p>

      <h2>2. Données collectées et finalités</h2>
      <p>
        Nous collectons les données suivantes sur la base de{" "}
        <strong>l&apos;exécution du contrat</strong> (CGU) ou de votre{" "}
        <strong>consentement</strong> :
      </p>
      <ul>
        <li>
          <strong>Données d&apos;identification</strong> : Nom, prénom, adresse
          e-mail, numéro de téléphone, photographie de profil.
          <br />
          <em>Finalité</em> : Création et gestion du compte utilisateur.
        </li>
        <li>
          <strong>Données de localisation</strong> : Coordonnées GPS précises
          (latitude/longitude).
          <br />
          <em>Finalité</em> : Fonctionnement de l&apos;algorithme de pertinence
          et calcul de la distance entre voisins.
        </li>
        <li>
          <strong>Données transactionnelles</strong> : Historique des services,
          détails de la mission, montants facturés, notes et avis.
          <br />
          <em>Finalité</em> : Suivi des interventions et gestion du système de
          confiance.
        </li>
        <li>
          <strong>Données de paiement</strong> : Informations de carte bancaire
          (traitées exclusivement par notre partenaire certifié PCI-DSS{" "}
          <strong>Stripe</strong>). BUMBEEZ ne conserve qu&apos;une empreinte
          technique (token) et ne stocke jamais vos coordonnées bancaires en
          clair.
        </li>
        <li>
          <strong>Communications</strong> : Messages échangés via le chat
          interne.
          <br />
          <em>Finalité</em> : Sécurisation des transactions et preuve en cas de
          litige.
        </li>
      </ul>

      <h2>3. Bases légales du traitement</h2>
      <p>
        Conformément à l&apos;Article 6 du RGPD, vos données sont traitées pour
        les raisons suivantes :
      </p>
      <ol>
        <li>
          <strong>Exécution du contrat</strong> : Pour vous permettre
          d&apos;utiliser les fonctionnalités de l&apos;Application.
        </li>
        <li>
          <strong>Obligation légale</strong> : Notamment pour la lutte contre la
          fraude et les déclarations fiscales (Loi DAC7).
        </li>
        <li>
          <strong>Intérêt légitime</strong> : Pour améliorer l&apos;ergonomie de
          l&apos;Application et assurer la sécurité de la communauté.
        </li>
        <li>
          <strong>Consentement</strong> : Notamment pour l&apos;envoi de
          notifications push ou l&apos;accès à la géolocalisation, appareil
          photo.
        </li>
      </ol>

      <h2>4. Destinataires des données et transferts</h2>
      <p>
        Vos données sont destinées exclusivement aux services internes de
        BUMBEEZ. Elles peuvent être partagées avec :
      </p>
      <ul>
        <li>
          <strong>L&apos;autre Utilisateur</strong> : Uniquement les données
          nécessaires à la réalisation de la mission (Prénom, photo, adresse
          exacte après validation).
        </li>
        <li>
          <strong>Sous-traitants techniques</strong> : Hébergeur Cloud (Railway
          : L&apos;utilisation de Railway implique un transfert de données vers
          les États-Unis. Ce transfert est encadré par des clauses
          contractuelles types afin de garantir un niveau de protection
          équivalent au RGPD), prestataire de paiement (Stripe), notifications
          push (Firebase).
        </li>
        <li>
          <strong>Autorités publiques</strong> : Uniquement sur réquisition
          judiciaire ou pour se conformer à la loi DAC7.
        </li>
      </ul>
      <p>
        <strong>Note</strong> : BUMBEEZ s&apos;engage à ne jamais vendre ou
        louer vos données personnelles à des tiers à des fins de marketing.
      </p>

      <h2>5. Durée de conservation des données</h2>
      <p>
        Bumbeez applique des durées de conservation strictes, limitées à ce qui
        est juridiquement nécessaire :
      </p>
      <ul>
        <li>
          <strong>Compte actif</strong> : Vos données personnelles sont
          conservées tant que votre compte est ouvert.
        </li>
        <li>
          <strong>En cas de suppression du compte</strong> :
          <ul>
            <li>
              <strong>Profil &amp; Contenu</strong> : Vos informations
              personnelles (nom, photo, bio, annonces) sont supprimées ou
              anonymisées immédiatement de nos serveurs de production
              (Hébergement Railway).
            </li>
            <li>
              <strong>Données financières</strong> : Les justificatifs de
              transactions sont archivés pendant <strong>10 ans</strong>. Cette
              conservation est une obligation légale (Code de commerce) gérée
              de manière sécurisée par notre prestataire de paiement Stripe.
            </li>
            <li>
              <strong>Sécurité (Logs)</strong> : Les données permettant
              l&apos;identification des connexions (adresses IP) sont
              conservées pendant <strong>1 an</strong>, conformément à la loi
              (LCEN), afin de répondre à d&apos;éventuelles réquisitions
              judiciaires.
            </li>
            <li>
              <strong>Prévention des litiges</strong> : Certaines données liées
              aux échanges de missions peuvent être conservées en archivage
              intermédiaire pendant <strong>5 ans</strong> (délai de
              prescription civile) pour protéger les droits de Bumbeez en cas
              de réclamation.
            </li>
          </ul>
        </li>
      </ul>

      <h2>6. Vos droits (RGPD)</h2>
      <p>Vous disposez des droits suivants sur vos données :</p>
      <ul>
        <li>
          <strong>Droit d&apos;accès et de rectification</strong> (Articles 15
          et 16 RGPD).
        </li>
        <li>
          <strong>Droit à l&apos;effacement</strong> (« droit à l&apos;oubli »,
          Article 17 RGPD).
        </li>
        <li>
          <strong>Droit à la portabilité</strong> (récupération de vos données
          dans un format structuré).
        </li>
        <li>
          <strong>Droit à la limitation et d&apos;opposition</strong> au
          traitement de vos données.
        </li>
      </ul>
      <p>
        Vous pouvez exercer ces droits en écrivant à{" "}
        <a href="mailto:contact@bumbeez.fr">contact@bumbeez.fr</a>. Une réponse
        vous sera adressée dans les meilleurs délais.
      </p>

      <h2>7. Sécurité des données</h2>
      <p>
        BUMBEEZ met en œuvre des mesures de sécurité techniques (chiffrement
        TLS/SSL, hachage des mots de passe) et organisationnelles pour protéger
        vos données contre tout accès non autorisé, perte ou altération.
      </p>

      <h2>8. Protection des mineurs</h2>
      <p>
        L&apos;Application est principalement destinée aux personnes majeures
        (<strong>18 ans et plus</strong>). L&apos;accès est également autorisé
        aux mineurs âgés de <strong>16 ans ou plus</strong>, sous réserve
        qu&apos;ils soient :
      </p>
      <ul>
        <li>Soit émancipés ;</li>
        <li>
          Soit titulaires d&apos;une autorisation parentale spécifique leur
          permettant d&apos;utiliser les services de BUMBEEZ.
        </li>
      </ul>
      <p>
        En dehors de ces cas spécifiques, BUMBEEZ ne collecte pas sciemment de
        données relatives à des mineurs de moins de 16 ans. Si nous découvrons
        qu&apos;un utilisateur ne remplit pas ces conditions d&apos;âge ou
        d&apos;autorisation légale, son compte sera immédiatement clôturé et
        ses données personnelles seront supprimées.
      </p>

      <h2>9. Réclamation auprès de la CNIL</h2>
      <p>
        Si vous estimez que le traitement de vos données constitue une
        violation du RGPD, vous avez le droit d&apos;introduire une
        réclamation auprès de la Commission Nationale de l&apos;Informatique et
        des Libertés (CNIL) sur son site internet{" "}
        <a
          href="https://www.cnil.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.cnil.fr
        </a>
        .
      </p>

      <h2>10. Modifications de la politique</h2>
      <p>
        BUMBEEZ se réserve le droit de modifier la présente Politique à tout
        moment. En cas de modification substantielle, vous serez informé par
        une notification au sein de l&apos;Application ou par e-mail.
      </p>
    </article>
  );
}
