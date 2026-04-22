import React from "react";
import { PALETTE } from "../constants/theme";

export const H1: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 style={{ color: PALETTE.text.default }} className="text-4xl font-extrabold">{children}</h1>
);

export const H2: React.FC<{ children: React.ReactNode }>
= ({ children }) => (
  <h2 style={{ color: PALETTE.text.default }} className="text-3xl font-bold">{children}</h2>
);

export const H3: React.FC<{ children: React.ReactNode }>
= ({ children }) => (
  <h3 style={{ color: PALETTE.text.default }} className="text-2xl font-semibold">{children}</h3>
);

export const H4: React.FC<{ children: React.ReactNode }>
= ({ children }) => (
  <h4 style={{ color: PALETTE.text.default }} className="text-xl font-medium">{children}</h4>
);

export const Text: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p style={{ color: PALETTE.text.default }} className="text-base">{children}</p>
);

export const Small: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <small style={{ color: PALETTE.text.muted }} className="text-sm">{children}</small>
);

export default {
  H1,
  H2,
  H3,
  H4,
  Text,
  Small,
};
