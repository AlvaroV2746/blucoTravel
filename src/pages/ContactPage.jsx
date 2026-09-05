import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const ContactPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('contact.title')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* WhatsApp */}
        <div className="bg-green-500/10 border-green-500 border rounded-2xl p-6 text-center hover:bg-green-50 transition-colors">
          <div className="mx-auto mb-3">
            <FontAwesomeIcon icon={faWhatsapp} className="text-4xl text-green-400" />
          </div>
          <h3 className="text-lg font-semibold text-green-400 mb-1">{t('contact.whatsapp')}</h3>
          <p className="text-green-200 text-sm">{t('contact.whatsappDesc')}</p>
          <a
            href="https://wa.me/573184559655"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-green-300 text-sm font-medium underline hover:underline-offset-2"
          >
            Chatea en WhatsApp
          </a>
        </div>

        {/* Instagram */}
        <div className="bg-gradient-to-tr from-yellow-400 via-pink-400 to-purple-400 rounded-2xl p-6 text-center hover:bg-gradient-to-b transition-colors">
          <div className="mx-auto mb-3">
            <FontAwesomeIcon icon={faInstagram} className="text-4xl text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">{t('contact.instagram')}</h3>
          <p className="text-white/90 text-sm">{t('contact.instagramDesc')}</p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-white/80 text-sm font-medium underline hover:underline-offset-2"
          >
            Síguenos en Instagram
          </a>
        </div>

        {/* Email */}
        <div className="bg-red-500 rounded-2xl p-6 text-center hover:bg-red-600 transition-colors">
          <div className="mx-auto mb-3">
            <FontAwesomeIcon icon={faEnvelope} className="text-4xl text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">{t('contact.email')}</h3>
          <p className="text-white/80 text-sm">{t('contact.emailDesc')}</p>
          <a
            href="mailto:info@blucotravel.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-white/80 text-sm font-medium underline hover:underline-offset-2"
          >
            Enviar correo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;