import React from "react";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export const H1: React.FC<BaseProps> = ({
  children,
  className = "",
  style,
}) => (
  <h1 style={{ ...style }} className={`text-4xl font-extrabold ${className}`}>
    {children}
  </h1>
);

export const H2: React.FC<BaseProps> = ({
  children,
  className = "",
  style,
}) => (
  <h2 style={{ ...style }} className={`text-3xl font-bold ${className}`}>
    {children}
  </h2>
);

export const H3: React.FC<BaseProps> = ({
  children,
  className = "",
  style,
}) => (
  <h3 style={{ ...style }} className={`text-2xl font-semibold ${className}`}>
    {children}
  </h3>
);

export const H4: React.FC<BaseProps> = ({
  children,
  className = "",
  style,
}) => (
  <h4 style={{ ...style }} className={`text-xl font-medium ${className}`}>
    {children}
  </h4>
);

export const Text: React.FC<BaseProps> = ({
  children,
  className = "",
  style,
}) => (
  <p style={{ ...style }} className={`text-base ${className}`}>
    {children}
  </p>
);

export const Small: React.FC<BaseProps> = ({
  children,
  className = "",
  style,
}) => (
  <small style={{ ...style }} className={`text-sm ${className}`}>
    {children}
  </small>
);

export default {
  H1,
  H2,
  H3,
  H4,
  Text,
  Small,
};
