import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const namesByLang: Record<string, string[]> = {
  en: ['Peter S.', 'Anna P.', 'John M.', 'Mary R.', 'Charles L.', 'Julia F.', 'Luke V.', 'Fiona G.', 'Richard T.', 'Patricia K.', 'Steve H.', 'Laura B.', 'Edward C.', 'Camille D.', 'Andrew E.'],
  de: ['Peter S.', 'Anna P.', 'Johann M.', 'Maria R.', 'Karl L.', 'Julia F.', 'Lukas V.', 'Frieda G.', 'Richard T.', 'Patrizia K.', 'Stefan H.', 'Laura B.', 'Eduard C.', 'Kamila D.', 'Andreas E.'],
  fr: ['Pierre S.', 'Anne P.', 'Jean M.', 'Marie R.', 'Charles L.', 'Julie F.', 'Luc V.', 'Florence G.', 'Richard T.', 'Patrice K.', 'Stéphane H.', 'Laura B.', 'Édouard C.', 'Camille D.', 'André E.'],
  'pt-PT': ['Pedro S.', 'Ana P.', 'João M.', 'Mariana R.', 'Carlos L.', 'Juliana F.', 'Lucas V.', 'Fernanda G.', 'Ricardo T.', 'Patrícia K.', 'Sérgio H.', 'Larissa B.', 'Eduardo C.', 'Camila D.', 'André E.'],
};

const citiesByLang: Record<string, string[]> = {
  en: ['London, UK', 'Manchester, UK', 'Dublin, IE', 'Sydney, AU', 'Toronto, CA', 'New York, US', 'Los Angeles, US', 'Edinburgh, UK', 'Auckland, NZ', 'Cape Town, ZA'],
  de: ['Berlin, DE', 'München, DE', 'Hamburg, DE', 'Wien, AT', 'Zürich, CH', 'Frankfurt, DE', 'Köln, DE', 'Stuttgart, DE', 'Düsseldorf, DE', 'Dresden, DE'],
  fr: ['Paris, FR', 'Lyon, FR', 'Marseille, FR', 'Bordeaux, FR', 'Toulouse, FR', 'Bruxelles, BE', 'Genève, CH', 'Montréal, CA', 'Nice, FR', 'Strasbourg, FR'],
  'pt-PT': ['Lisboa, PT', 'Porto, PT', 'Braga, PT', 'Coimbra, PT', 'Setúbal, PT', 'Faro, PT', 'Aveiro, PT', 'Évora, PT', 'Viseu, PT', 'Funchal, PT'],
};

const produtos = ['Voxton', 'Voxcharge', 'Vitalvoice', 'VitalAir', 'VoicePro'];

export default function PurchaseAlert() {
  const { lang, t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ nome: '', cidade: '', produto: '' });

  useEffect(() => {
    let interval: number;

    const showAlert = () => {
      if (visible) return;
      const names = namesByLang[lang] ?? namesByLang['en'];
      const cities = citiesByLang[lang] ?? citiesByLang['en'];
      setData({
        nome: names[Math.floor(Math.random() * names.length)],
        cidade: cities[Math.floor(Math.random() * cities.length)],
        produto: produtos[Math.floor(Math.random() * produtos.length)],
      });
      setVisible(true);
      setTimeout(() => setShow(true), 5000);
      setTimeout(() => {
        setShow(false);
        setTimeout(() => setVisible(false), 500);
      }, 15000);
    };

    const firstTimeout = setTimeout(showAlert, 1000);
    interval = window.setInterval(showAlert, 60000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, [visible, lang]);

  return visible ? (
    <div
      className={`
        fixed top-20 left-2
        bg-white/95 backdrop-blur-sm rounded-lg border-l-4 border-green-500
        px-3 py-2 shadow-md
        flex items-start gap-2.5 w-[75vw] max-w-[220px]
        transition-all duration-500 ease-out z-40
        ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
      `}
    >
      <div className="h-2 w-2 rounded-full bg-green-500 mt-1" />
      <div className="space-y-0.5">
        <p className="font-semibold text-gray-800 text-xs sm:text-sm">{data.nome}</p>
        <p className="text-gray-500 text-[11px] sm:text-xs">{data.cidade}</p>
        <p className="text-green-600 text-[11px] sm:text-xs font-medium">
          {t.purchaseAlert.bought} {data.produto}
        </p>
      </div>
    </div>
  ) : null;
}
