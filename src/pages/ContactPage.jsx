import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('meta.contact.title')}</title>
        <meta name="description" content={t('seo.contact.description')} />
        <meta name="keywords" content={t('seo.contact.keywords', { returnObjects: true }).join(', ')} />
        <meta property="og:title" content={`${t('meta.contact.title')} | BLUCO Travel`} />
        <meta property="og:description" content={t('seo.contact.description')} />
        <meta property="og:image" content="https://blucotravel.com/og-contact.svg" />

      </Helmet>
      <div className="max-w-2xl mx-auto bg-slate-50 p-6 rounded-2xl">
        <h2 className="text-3xl font-bold text-blue-900 mb-4 border-b-2 border-cyan-500">
          {t('contact.title')}
        </h2>
        <p className="text-lg text-gray-500 mb-12">{t('contact.lead')}</p>

        <ContactForm />

        <div className="mt-12 flex items-center justify-center gap-8">
          <a
            href="https://wa.me/573000726521"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('contact.whatsapp')}
            title={t('contact.whatsapp')}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
          >
            <FontAwesomeIcon icon={faWhatsapp} className="text-3xl" />
          </a>
          <a
            href="mailto:info@blucotravel.com"
            aria-label={t('contact.email')}
            title={t('contact.email')}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
          >
            <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
          </a>
          <a
            href="https://www.instagram.com/blucotravelco/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
          >
            <FontAwesomeIcon icon={faInstagram} className="text-3xl" />
          </a>
          <a
            href="https://www.tiktok.com/@blucotravelco"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            title="TikTok"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
          >
            <FontAwesomeIcon icon={faTiktok} className="text-3xl" />
          </a>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
