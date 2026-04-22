import React from "react";
import { motion } from "framer-motion";
import { IBannerInfo, IBannerProfile } from "./interfaces/banner.interface";
import { PALETTE } from "../../../../constants/theme";

// Props interface moved here per architecture rule: props interfaces must live in the component file
export interface IBannerProps {
  info: IBannerInfo;
  profile: IBannerProfile;
}

export const Banner: React.FC<IBannerProps> = ({ info, profile }) => {
  return (
    <header
      className="py-16 px-4 md:px-8 shadow-lg relative overflow-hidden"
      style={{
        backgroundColor: PALETTE.neutral[900],
        color: PALETTE.text.inverted,
        borderBottom: `4px solid ${PALETTE.primary.DEFAULT}`,
      }}
    >
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${PALETTE.text.inverted} 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10"
        >
          <div className="space-y-4">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase"
              style={{
                backgroundColor: PALETTE.neutral[800],
                border: `1px solid ${PALETTE.neutral[700]}`,
                color: PALETTE.primary.gradientStart,
              }}
            >
              {info.badgeIcon &&
                React.createElement(info.badgeIcon, {
                  className: "w-4 h-4",
                })}{" "}
              {info.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
              {info.title}
            </h1>
            <p
              className="text-xl md:text-2xl font-light flex items-center gap-3"
              style={{ color: PALETTE.text.subtle }}
            >
              {info.subtitle}
            </p>
          </div>
          <div
            className="p-6 rounded-2xl backdrop-blur-md max-w-sm w-full md:w-auto shadow-2xl"
            style={{
              backgroundColor: PALETTE.overlays.neutral800_80,
              border: `1px solid ${PALETTE.neutral[700]}`,
            }}
          >
            <div className="flex items-center gap-4 mb-3">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-inner"
                style={{ background: PALETTE.overlays.infoGradient }}
              >
                {profile.initials}
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">{profile.name}</h3>
                <p
                  className="text-sm font-semibold tracking-wide uppercase"
                  style={{ color: PALETTE.primary.gradientStart }}
                >
                  {profile.role}
                </p>
              </div>
            </div>
            <p
              className="text-sm mt-2 leading-relaxed"
              style={{ color: PALETTE.text.subtle }}
            >
              {profile.description}
            </p>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Banner;
