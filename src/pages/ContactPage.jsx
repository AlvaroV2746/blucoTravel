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
      <h2 className="text-3xl font-bold text-blue-900 mb-4 underline underline-offset-4 border-b-2 border-cyan-500">
        {t('contact.title')}
      </h2>
      <p className="text-lg text-gray-500 mb-8">{t('contact.lead')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* WhatsApp */}
        <div className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-colors">
          <div className="bg-green-500 rounded-t-2xl p-4">
            <FontAwesomeIcon icon={faWhatsapp} className="text-3xl text-white" />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1">{t('contact.whatsapp')}</h3>
            <p className="text-gray-600 text-sm">{t('contact.whatsappDesc')}</p>
            <a
              href="https://wa.me/573184559655"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-gray-600 mt-3 rounded py-2 text-center text-sm font-medium transition-colors "
            >
              Chatea en WhatsApp
            </a>
          </div>
        </div>

        {/* Instagram */}
        <div className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-colors">
          <div className="bg-gradient-to-tr from-yellow-400 via-pink-400 to-purple-400 rounded-t-2xl p-4">
            <FontAwesomeIcon icon={faInstagram} className="text-3xl text-white" />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1">{t('contact.instagram')}</h3>
            <p className="text-gray-600 text-sm">{t('contact.instagramDesc')}</p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-3 rounded bg-white/20 text-gray-800 py-2 text-center text-sm font-medium transition-colors hover:bg-white/30"
            >
              Síguenos en Instagram
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="group bg-white rounded-2xl shadow-sm overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-colors">
          <div className="bg-red-500 rounded-t-2xl p-4">
            <FontAwesomeIcon icon={faEnvelope} className="text-3xl text-white" />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-1">{t('contact.email')}</h3>
            <p className="text-gray-600 text-sm">{t('contact.emailDesc')}</p>
            <a
              href="mailto:info@blucotravel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-3 rounded bg-white/20 text-gray-800 py-2 text-center text-sm font-medium transition-colors hover:bg-white/30"
            >
              Enviar correo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;