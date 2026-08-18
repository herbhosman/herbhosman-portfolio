export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://herbhosman.com/#person",
        name: "Herbert Hosman",
        alternateName: "Herb Hosman",
        url: "https://herbhosman.com",
        image: "https://herbhosman.com/herb-hosman.jpg",
        jobTitle: "AEM Architect",
        description:
          "Adobe Experience Manager architect and engineering leader. Open to AEM Architect, Solution Architect, Engineering Manager, and Director of Engineering roles.",
        email: "mailto:hahosman@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ventura",
          addressRegion: "CA",
          addressCountry: "US",
        },
        sameAs: [
          "https://linkedin.com/in/herbhosman",
          "https://github.com/herbhosman",
        ],
        knowsAbout: [
          "Adobe Experience Manager",
          "AEM",
          "Solution Architecture",
          "Engineering Leadership",
          "JavaScript",
          "React",
          "Adobe Target",
          "Adobe Analytics",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Brigham Young University",
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "Adobe Certified Expert - Adobe Experience Manager Sites Developer",
            credentialCategory: "certification",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Adobe Certified Expert - Adobe Experience Manager Sites Business Practitioner",
            credentialCategory: "certification",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Certified ScrumMaster",
            credentialCategory: "certification",
            recognizedBy: {
              "@type": "Organization",
              name: "Scrum Alliance",
            },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://herbhosman.com/#website",
        url: "https://herbhosman.com",
        name: "Herb Hosman",
        description:
          "Portfolio of Herbert Hosman — AEM architect and engineering leader.",
        publisher: { "@id": "https://herbhosman.com/#person" },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": "https://herbhosman.com/#profilepage",
        url: "https://herbhosman.com",
        name: "Herb Hosman | AEM Architect & Engineering Leader",
        isPartOf: { "@id": "https://herbhosman.com/#website" },
        about: { "@id": "https://herbhosman.com/#person" },
        mainEntity: { "@id": "https://herbhosman.com/#person" },
        inLanguage: "en-US",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
