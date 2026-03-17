import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

const PromoBanner: React.FC = () => {
  const { t } = useLanguage();
  const b = t.promoBanner;

  return (
    <div className="bg-gradient-to-r from-[#005f6e] via-[#008B91] to-[#005f6e] text-white w-full overflow-hidden border-b border-[#005f6e] shadow-[0_6px_18px_rgba(0,79,90,0.35)]">
      <div className="animate-marquee inline-block whitespace-nowrap py-2 md:py-2.5 font-semibold text-sm md:text-base lg:text-lg tracking-wide">
        <span className="text-[#ecfeff] font-bold">{b.brand}</span> —{" "}
        <span className="text-[#F5B50A] font-extrabold">{b.off}</span> {b.couponText}{" "}
        <span className="px-2 py-0.5 rounded-md bg-[#ecfeff] text-[#007c91] font-black tracking-[0.1em]">
          {b.coupon}
        </span>{" "}
        &nbsp;|&nbsp; {b.installments} &nbsp;|&nbsp; {b.shipping}
      </div>
    </div>
  );
};

export default PromoBanner;
