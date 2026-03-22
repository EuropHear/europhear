import './App.css';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import {
  Truck,
  ShieldCheck,
  RefreshCcw,
  CreditCard,
  Headphones,
  Ear,
  ChevronRight,
  Zap,
  Volume2
} from 'lucide-react';

import Comments from './components/Comments';
import Footer from './components/Footer';
import PurchaseAlert from './components/PurchaseAlert';
import { useLanguage } from './i18n/LanguageContext';

// Product images
import { voxtonHeroImage } from './produtos/voxton';
import { voxchargeHeroImage } from './produtos/Voxcharge';
import { iaVoiceHeroImage } from './produtos/IAvoice';
import { vitalAirHeroImage } from './produtos/VitalAir';
import { voiceProHeroImage } from './produtos/VoicePro';
import { smartVoiceHeroImage } from './produtos/SmartVoice';
import { softVoiceHeroImage } from './produtos/SoftVoice';

const whatsappBase = 'https://tawk.to/chat/69bf5403977ac51c36884631/1jk9m0bi0';
const voiceProStripeUrl = 'https://buy.stripe.com/eVq7sLe92bImexa7doeUU00';
const heroVideoId = 'Z4-1AfiPFQ0';

const renderStars = (nota: number) => {
  const estados: Array<'full' | 'half' | 'empty'> = [];
  for (let i = 1; i <= 5; i += 1) {
    if (nota >= i) estados.push('full');
    else if (nota >= i - 0.5) estados.push('half');
    else estados.push('empty');
  }
  return estados;
};

const trustIconMap = [Truck, ShieldCheck, RefreshCcw, CreditCard];
const whyIconMap = [ShieldCheck, RefreshCcw, Truck, Headphones];

const aparelhosBase = [
  {
    sigla: 'Vital Air',
    nome: 'Vital Air Bluetooth Inteligente',
    precoOriginal: 2899.0,
    precoAtual: 1999.0,
    avaliacoes: 42,
    imagem: vitalAirHeroImage,
    esgotado: true,
    rota: '/produto/vitalair',
    badge: 'TWS',
    nota: 4.8,
    link: whatsappBase,
    descKey: 'vitalair',
  },
  {
    sigla: 'Voxton Mini CIC',
    nome: 'Voxton Aparelho Auditivo Mini CIC',
    precoOriginal: 1399.0,
    precoAtual: 599.9,
    avaliacoes: 21,
    imagem: voxtonHeroImage,
    esgotado: true,
    rota: '/produto/voxton',
    badge: 'CIC',
    nota: 4.3,
    link: whatsappBase,
    descKey: 'voxton',
  },
  {
    sigla: 'IAvoice',
    nome: 'IAvoice InteligÃªncia Auditiva',
    precoOriginal: 1999.0,
    precoAtual: 1699.0,
    avaliacoes: 51,
    imagem: iaVoiceHeroImage,
    esgotado: true,
    rota: '/produto/iavoice',
    badge: 'IA',
    nota: 4.6,
    link: whatsappBase,
    descKey: 'iavoice',
  },
  {
    sigla: 'VoicePro',
    nome: 'VoicePro Profissional Digital',
    precoOriginal: 2099.0,
    precoAtual: 199.0,
    avaliacoes: 47,
    imagem: voiceProHeroImage,
    esgotado: false,
    rota: '/produto/voicepro',
    badge: 'PRO',
    nota: 4.5,
    link: voiceProStripeUrl,
    checkoutUrl: voiceProStripeUrl,
    destaque: true,
    descKey: 'voicepro',
  },
  {
    sigla: 'SmartVoice',
    nome: 'SmartVoice CIC Bluetooth',
    precoOriginal: 2699.0,
    precoAtual: 1999.9,
    avaliacoes: 18,
    imagem: smartVoiceHeroImage,
    esgotado: true,
    rota: '/produto/smartvoice',
    badge: 'BT',
    nota: 4.5,
    novo: true,
    link: whatsappBase,
    descKey: 'smartvoice',
  },
  {
    sigla: 'SoftVoice',
    nome: 'SoftVoice RecarregÃ¡vel 16 Canais',
    precoOriginal: 4499.0,
    precoAtual: 2699.9,
    avaliacoes: 15,
    imagem: softVoiceHeroImage,
    esgotado: true,
    rota: '/produto/softvoice',
    badge: 'CIC',
    nota: 4.4,
    novo: true,
    link: whatsappBase,
    descKey: 'softvoice',
  },
  {
    sigla: 'Voxcharge',
    nome: 'Voxcharge Mini CIC RecarregÃ¡vel',
    precoOriginal: 1799.0,
    precoAtual: 1199.9,
    avaliacoes: 34,
    imagem: voxchargeHeroImage,
    esgotado: true,
    rota: '/produto/voxcharge',
    badge: 'CIC',
    nota: 4.4,
    link: whatsappBase,
    descKey: 'voxcharge',
  },
];

// Product descriptions per language
const productDescs: Record<string, Record<string, string>> = {
  en: {
    vitalair: 'Bluetooth 5.0, control app, 32-channel DSP',
    voxton: 'Discreet design, 60h battery, easy operation',
    iavoice: '16-channel digital chip, LED display, BTE design',
    voicepro: 'UV sterilization, magnetic charging, 24h battery',
    smartvoice: 'Discreet CIC, BT streaming, 4-6h + magnetic case',
    softvoice: 'Imported chip, 16 channels, 20h with UV/LED case',
    voxcharge: 'CIC rechargeable, 117dB gain, 20h battery',
  },
  de: {
    vitalair: 'Bluetooth 5.0, Steuer-App, 32-Kanal DSP',
    voxton: 'Diskretes Design, 60h Akku, einfache Bedienung',
    iavoice: '16-Kanal-Digitalchip, LED-Display, BTE-Design',
    voicepro: 'UV-Sterilisation, magnetisches Laden, 24h Akku',
    smartvoice: 'Diskretes CIC, BT-Streaming, 4-6h + Magnetetui',
    softvoice: 'Importierter Chip, 16 KanÃ¤le, 20h mit UV/LED-Etui',
    voxcharge: 'CIC wiederaufladbar, 117dB VerstÃ¤rkung, 20h Akku',
  },
  fr: {
    vitalair: 'Bluetooth 5.0, app de contrÃ´le, DSP 32 canaux',
    voxton: 'Design discret, batterie 60h, utilisation facile',
    iavoice: 'Puce numÃ©rique 16 canaux, affichage LED, design BTE',
    voicepro: 'StÃ©rilisation UV, chargement magnÃ©tique, batterie 24h',
    smartvoice: 'CIC discret, streaming BT, 4-6h + Ã©tui magnÃ©tique',
    softvoice: 'Puce importÃ©e, 16 canaux, 20h avec Ã©tui UV/LED',
    voxcharge: 'CIC rechargeable, gain 117dB, batterie 20h',
  },
  'pt-PT': {
    vitalair: 'Bluetooth 5.0, app de controlo, 32 canais DSP',
    voxton: 'Design discreto, bateria 60h, fÃ¡cil operaÃ§Ã£o',
    iavoice: 'Chip digital 16 canais, display LED, design BTE',
    voicepro: 'EsterilizaÃ§Ã£o UV, carregamento magnÃ©tico, bateria 24h',
    smartvoice: 'CIC discreto, streaming BT, 4-6h + estojo magnÃ©tico',
    softvoice: 'Chip importado, 16 canais, 20h com estojo UV/LED',
    voxcharge: 'CIC recarregÃ¡vel, ganho 117dB, bateria 20h',
  },
};

// Installments per language
const installmentsByLang: Record<string, Record<string, string>> = {
  en: {
    vitalair: '12x € 216.36', voxton: '12x € 64.94', iavoice: '12x € 216.36',
    voicepro: '12x € 16.58', smartvoice: '12x € 166.66', softvoice: '12x € 224.99', voxcharge: '12x € 116.75',
  },
  de: {
    vitalair: '12x € 216,36', voxton: '12x € 64,94', iavoice: '12x € 216,36',
    voicepro: '12x € 16,58', smartvoice: '12x € 166,66', softvoice: '12x € 224,99', voxcharge: '12x € 116,75',
  },
  fr: {
    vitalair: '12x € 216,36', voxton: '12x € 64,94', iavoice: '12x € 216,36',
    voicepro: '12x € 16,58', smartvoice: '12x € 166,66', softvoice: '12x € 224,99', voxcharge: '12x € 116,75',
  },
  'pt-PT': {
    vitalair: '12x € 216,36', voxton: '12x € 64,94', iavoice: '12x € 216,36',
    voicepro: '12x € 16,58', smartvoice: '12x € 166,66', softvoice: '12x € 224,99', voxcharge: '12x € 116,75',
  },
};

export default function App() {
  const { t, lang } = useLanguage();
  const h = t.hero;
  const p = t.products;
  const w = t.why;
  const test = t.testimonials;
  const loc = t.location;

  const descs = productDescs[lang] ?? productDescs['en'];
  const installs = installmentsByLang[lang] ?? installmentsByLang['en'];

  const aparelhos = aparelhosBase.map(a => ({
    ...a,
    descricao: descs[a.descKey] ?? '',
    precoParcela: installs[a.descKey] ?? '',
  }));

  const featuredProduct = aparelhos.find(p => p.destaque) || aparelhos[0];

  return (
    <div className="min-h-screen hero-bg grid-bg">
      <PurchaseAlert />

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="particle" style={{ top: '10%', left: '10%' }} />
        <div className="particle" style={{ top: '20%', left: '80%' }} />
        <div className="particle" style={{ top: '60%', left: '15%' }} />
        <div className="particle" style={{ top: '70%', left: '75%' }} />
        <div className="particle" style={{ top: '40%', left: '50%' }} />
      </div>

      {/* Ring Decorations */}
      <div className="ring-decoration w-96 h-96 -top-48 -right-48 opacity-20" />
      <div className="ring-decoration w-[600px] h-[600px] -bottom-72 -left-72 opacity-10" style={{ animationDirection: 'reverse' }} />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center py-20 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left z-10 flex flex-col gap-6">
              {/* Hero Video */}
              <div className="order-1 lg:order-7 max-w-xl w-full mx-auto lg:mx-0">
                <div className="relative group">
                  <div className="absolute -inset-[6px] bg-gradient-to-r from-[#00c2c7]/70 via-[#3ac28b]/60 to-[#007c91]/60 opacity-60 blur-lg group-hover:opacity-100 transition" />
                  <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#0d1829] border border-white/10 shadow-[0_25px_70px_-40px_#00c2c7]">
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-white/[0.02] pointer-events-none" />
                    <iframe
                      src={`https://www.youtube.com/embed/${heroVideoId}?rel=0&modestbranding=1&color=white`}
                      title={h.videoTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                      className="w-full h-full border-0 saturate-125 contrast-110"
                    />
                    <div className="absolute -left-6 top-1/2 h-24 w-24 bg-[#00c2c7]/30 blur-3xl rotate-12" />
                    <div className="absolute -right-10 bottom-0 h-24 w-24 bg-[#3ac28b]/30 blur-3xl" />
                  </div>
                </div>
              </div>

              <div className="order-2 inline-flex items-center gap-2 bg-[#008B91]/20 border border-[#008B91]/30 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-[#3ac28b] rounded-full animate-pulse" />
                <span className="text-sm text-gray-300">{h.badge}</span>
              </div>

              <h1 className="order-3 text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                {h.h1_1}{' '}
                <span className="text-gradient">{h.h1_2}</span>
              </h1>

              <p className="order-4 text-lg text-gray-400 max-w-lg mx-auto lg:mx-0">
                {h.p}
              </p>

              {/* Featured Product Card */}
              <div className="order-5 card-3d p-6 max-w-md mx-auto lg:mx-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="badge-type">{featuredProduct.badge}</span>
                  <span className="badge-discount">
                    -{Math.round(((featuredProduct.precoOriginal - featuredProduct.precoAtual) / featuredProduct.precoOriginal) * 100)}%
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-1">{h.fromPrice}</p>
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-white">
                    € {featuredProduct.precoAtual.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    € {featuredProduct.precoOriginal.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{featuredProduct.precoParcela}</p>
              </div>

              {/* CTAs */}
              <div className="order-6 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href={featuredProduct.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d flex items-center justify-center gap-2 text-lg"
                >
                  <Zap size={20} />
                  {h.buyNow}
                </a>
                <Link
                  to="/garantia"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-[#008B91]/50 text-[#008B91] font-semibold hover:bg-[#008B91]/10 transition"
                >
                  <ShieldCheck size={18} />
                  {h.warrantyBtn}
                </Link>
              </div>
            </div>

            {/* Product Image */}
            <div className="relative perspective">
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-[#008B91]/20 rounded-full blur-3xl scale-75" />
                <img
                  src={featuredProduct.imagem.src}
                  alt={featuredProduct.nome}
                  className="relative w-full max-w-[450px] mx-auto drop-shadow-2xl"
                />
                <div className="absolute top-4 right-4 card-3d p-3 animate-float-slow" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-[#3ac28b]" />
                    <span className="text-sm font-semibold">{h.floatWarranty}</span>
                  </div>
                </div>
                <div className="absolute bottom-8 left-4 card-3d p-3 animate-float-slow" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-2">
                    <Volume2 size={18} className="text-[#008B91]" />
                    <span className="text-sm font-semibold">{h.floatHearing}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST BADGES ===== */}
      <section className="py-8 px-4 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {t.trustBadges.map((badge, i) => (
              <div key={badge.label} className="trust-badge-3d flex items-center gap-3">
                {(() => { const Icon = trustIconMap[i]; return <Icon size={24} className="text-[#008B91]" />; })()}
                <div>
                  <p className="font-semibold text-white text-sm">{badge.label}</p>
                  <p className="text-xs text-gray-400">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUCTS SECTION ===== */}
      <section className="py-20 px-4 lg:px-8 section-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {p.title1} <span className="text-gradient">{p.title2}</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{p.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {aparelhos.map((item, index) => {
              const desconto = Math.round(
                ((item.precoOriginal - item.precoAtual) / item.precoOriginal) * 100
              );

              return (
                <div
                  key={index}
                  className={`product-card-3d flex flex-col ${item.esgotado ? 'opacity-60' : ''}`}
                >
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex gap-2">
                    {item.novo && (
                      <span className="flex items-center gap-1 rounded-full bg-amber-300 text-slate-900 text-[10px] font-black px-2 py-1 shadow-sm">
                        {p.newBadge}
                      </span>
                    )}
                    <span className="badge-type">{item.badge}</span>
                    {!item.esgotado && <span className="badge-discount">-{desconto}%</span>}
                    {item.esgotado && (
                      <span className="bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded-full">
                        {p.soldOut}
                      </span>
                    )}
                  </div>

                  {/* Image */}
                  <div className="p-6 pb-2 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent">
                    <img
                      src={item.imagem.src}
                      alt={item.sigla}
                      className="h-40 w-auto object-contain drop-shadow-lg"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-white mb-1">{item.sigla}</h3>
                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{item.descricao}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {renderStars(item.nota).map((estado, i) => {
                        if (estado === 'full') return <FaStar key={i} className="text-yellow-400 text-sm" />;
                        if (estado === 'half') return <FaStarHalfAlt key={i} className="text-yellow-400 text-sm" />;
                        return <FaRegStar key={i} className="text-yellow-400 text-sm" />;
                      })}
                      <span className="text-xs text-gray-500 ml-1">({item.avaliacoes})</span>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 line-through">
                        € {item.precoOriginal.toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-xl font-bold text-[#008B91]">
                        € {item.precoAtual.toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-sm font-semibold text-[#006d7e]">{item.precoParcela}</p>
                    </div>

                    {/* CTA */}
                    <div className="mt-auto">
                      {item.esgotado ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-700/50 text-gray-300 font-medium text-sm"
                        >
                          {p.notifyMe}
                        </a>
                      ) : (
                        item.checkoutUrl ? (
                          <a
                            href={item.checkoutUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg btn-3d text-sm"
                          >
                            {p.seeProduct}
                            <ChevronRight size={16} />
                          </a>
                        ) : (
                          <Link
                            to={item.rota}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg btn-3d text-sm"
                          >
                            {p.seeProduct}
                            <ChevronRight size={16} />
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* CTA Card */}
            <div className="product-card-3d flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#008B91]/12 to-[#3ac28b]/8">
              <div className="w-16 h-16 rounded-full bg-[#008B91]/20 flex items-center justify-center mb-4">
                <Ear size={32} className="text-[#008B91]" />
              </div>
              <h3 className="font-bold text-[#0f172a] mb-2 text-lg">
                {p.ctaTitle}
              </h3>
              <p className="text-sm text-gray-400 mb-6">{p.ctaDesc}</p>
              <a
                href={whatsappBase}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg border border-[#008B91] text-[#008B91] font-semibold text-sm hover:bg-[#008B91]/10 transition flex items-center justify-center gap-2"
              >
                {p.ctaBtn}
                <ChevronRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHY EUROPHEAR ===== */}
      <section className="py-20 px-4 lg:px-8 section-dark">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {w.title1} <span className="text-gradient">{w.title2}</span>
              </h2>

              <div className="space-y-4">
                {w.items.map((item, i) => (
                  <div key={i} className="card-3d p-4 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#008B91]/20 flex items-center justify-center shrink-0">
                      {(() => { const Icon = whyIconMap[i]; return <Icon size={20} className="text-[#008B91]" />; })()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={whatsappBase}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-8 btn-3d"
              >
                {w.cta}
                <ChevronRight size={18} />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {w.stats.map((stat, i) => (
                <div key={i} className="card-3d p-6 text-center">
                  <p className="text-3xl md:text-4xl font-extrabold text-gradient mb-2">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 px-4 lg:px-8 section-gradient">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {test.title1} <span className="text-gradient">{test.title2}</span> {test.title3}
            </h2>
            <p className="text-gray-400">{test.subtitle}</p>
          </div>
          <Comments />
        </div>
      </section>

      {/* ===== LOCATION ===== */}
      <section className="py-20 px-4 lg:px-8 section-dark">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {loc.title1} <span className="text-gradient">{loc.title2}</span>
            </h2>
            <p className="text-gray-400">{loc.subtitle}</p>
          </div>

          <div className="card-3d overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.122083025319!2d-44.2522057!3d-21.1475393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa1c963c59a1c0f%3A0x53f730cb26c74473!2sFonovital%20LTDA!5e0!3m2!1spt-BR!2sbr!4v1759945084576!5m2!1spt-BR!2sbr"
              width="100%"
              height="360"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title={loc.mapTitle}
            />
          </div>

          <div className="text-center mt-6 text-sm text-gray-400">
            <p className="font-semibold text-[#008B91]">{loc.company}</p>
            <p>{loc.cnpj}</p>
            <p>{loc.address}</p>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <Footer />
    </div>
  );
}

