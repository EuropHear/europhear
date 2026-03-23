import { useEffect, useState } from "react";
import {
  Ear,
  CheckCircle,
  Truck,
  Store,
  Lock,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const f = t.footer;
  const [raLoaded, setRaLoaded] = useState(false);

  useEffect(() => {
    const TARGET_ID = "reputation-ra";
    const SCRIPT_ID = "ra-embed-reputation";

    if (document.getElementById(SCRIPT_ID)) {
      const RA = (window as any).RA;
      if (RA && typeof RA.render === "function") {
        RA.render();
        setRaLoaded(true);
      }
      return;
    }

    const s = document.createElement("script");
    s.src = "https://s3.amazonaws.com/raichu-beta/selos/bundle.js";
    s.id = SCRIPT_ID;
    s.type = "text/javascript";
    s.async = true;
    s.dataset.id = "UEhEaDkzUU1wU1Z2WU9xeDpmb25vdml0YWwtbHRkYQ==";
    s.dataset.target = TARGET_ID;
    s.dataset.model = "2";
    s.onload = () => setRaLoaded(true);
    document.body.appendChild(s);

    const timer = setTimeout(() => {
      if (!raLoaded) setRaLoaded(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [raLoaded]);

  return (
    <footer className="w-full bg-[#f6f8fb] text-slate-700 py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Column 1 */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center space-x-2">
            <Ear size={20} className="text-teal-600" />
            <span>{f.col1Title}</span>
          </h3>
          <p className="text-sm mb-4">{f.col1Desc}</p>
          <ul className="text-sm space-y-2">
            <li className="flex items-center space-x-2">
              <CheckCircle size={16} className="text-teal-600" />
              <span>{f.warranty}</span>
            </li>
            <li className="flex items-center space-x-2">
              <Truck size={16} className="text-teal-600" />
              <span>{f.shipping}</span>
            </li>
            <li className="flex items-center space-x-2">
              <Store size={16} className="text-teal-600" />
              <span>{f.marketplace}</span>
            </li>
            <li className="flex items-center space-x-2">
              <Lock size={16} className="text-teal-600" />
              <span>{f.ssl}</span>
            </li>
          </ul>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{f.col2Title}</h3>
          <ul className="text-sm space-y-1">
            <li>Voxton CIC</li>
            <li>Voxcharge CIC</li>
            <li>Vitalvoice CIC</li>
            <li>VitalAir</li>
            <li>IAvoice</li>
            <li>VoicePro</li>
            <li>SmartVoice</li>
            <li>SoftVoice</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">{f.col3Title}</h3>
          <a
            href="https://wa.me/351912588990"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 mb-3 rounded-lg bg-[#25D366] text-white font-semibold shadow hover:shadow-md transition"
          >
            <Phone size={16} />
            <span>WhatsApp: +351 912 588 990</span>
          </a>
          <ul className="text-sm space-y-2">
            <li className="flex items-center space-x-2">
              <Phone size={16} className="text-teal-600" />
              <span>(32) 99906-9763</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={16} className="text-teal-600" />
              <span>europhear@gmail.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin size={16} className="text-teal-600" />
              <span>São João del Rei, MG</span>
            </li>
          </ul>
          <div className="mt-8 text-center text-xs text-slate-600 space-y-1">
            <div>
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-medium text-slate-800">Europhear</span>. {f.developer}{" "}
              <span className="font-medium text-slate-800">{f.devName}</span>.
            </div>
            <div>
              <span className="font-semibold text-slate-800">{f.cnpjLabel}:</span> 61.894.698/0001-20
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
