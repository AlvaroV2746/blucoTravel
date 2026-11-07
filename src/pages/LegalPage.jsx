import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { LEGAL } from '../data/legal';

const LegalPage = ({ kind = 'terms' }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('en') ? 'en' : 'es';
  const content = LEGAL[lang][kind];

  return (
    <>
      <Helmet>
        <title>{content.title} | BLUCO Travel</title>
        <meta name="description" content={content.intro.slice(0, 155)} />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <article className="max-w-3xl mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2 border-b-2 border-cyan-500 pb-2">
            {content.title}
          </h1>
          <p className="text-sm text-gray-500">{content.updated}</p>
        </header>

        <p className="text-gray-700 leading-relaxed mb-8">{content.intro}</p>

        <div className="space-y-8">
          {content.sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-xl font-semibold text-blue-900 mb-3">
                {section.heading}
              </h2>

              {section.paragraphs?.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-gray-700 leading-relaxed mb-3">
                  {paragraph}
                </p>
              ))}

              {section.list && (
                <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
                  {section.list.map((item, lIndex) => (
                    <li key={lIndex}>{item}</li>
                  ))}
                </ul>
              )}

              {section.subgroups?.map((subgroup, sIndex) => (
                <div key={sIndex} className="mt-4">
                  <h3 className="text-lg font-medium text-cyan-700 mb-2">
                    {subgroup.heading}
                  </h3>

                  {subgroup.paragraphs?.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-700 leading-relaxed mb-3">
                      {paragraph}
                    </p>
                  ))}

                  {subgroup.list && (
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 leading-relaxed">
                      {subgroup.list.map((item, lIndex) => (
                        <li key={lIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          ))}
        </div>
      </article>
    </>
  );
};

export default LegalPage;
