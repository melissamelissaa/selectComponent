/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        text: {
          primary: "#05060F",
          secondary: "#05060F80",
          placeholder: "#05060F52",
          disabled: "#05060F3D",
        },

        primary: "#05060F",
        secondary: "#05060F80",
        placeholder: "#05060F52",
        disabled: "#05060F3D",

        component: {
          primary: "#05060F0D",
          hover: "#05060F1A",
          press: "#05060F26",
          selected: "#05060F0D",
          disabled: "#05060F0D",
        },

        layout: {
          canvas: "#F1F3F3",
          container: "#FFFFFF",
          pure: "#05060F0D",
          "surface-1": "#FFFFFF",
          "surface-2": "#FFFFFF",
          focus: "#0F0F1080",
        },

        "white-inverted": "#FFFFFF",
        "black-inverted": "#151515",
        "white-base": "#FFFFFF",
        "white-base-op-50": "rgba(255, 255, 255, 0.5)",
        "white-base-op-5": "rgba(255, 255, 255, 0.05)",
        "black-base": "#151515",
        "black-base-op-50": "rgba(21, 21, 21, 0.5)",
        "black-base-op-5": "rgba(21, 21, 21, 0.05)",

        primary: {
          dark: "#003E2E",
          base: "#007256",
          light: "#5AB59B",
          "op-24": "rgba(0, 114, 86, 0.24)",
          "op-16": "rgba(0, 114, 86, 0.16)",
          "op-8": "rgba(0, 114, 86, 0.08)",
        },

        "secondary-dark": "#6B21A8",
        "secondary-base": "#9333EA",
        "secondary-light": "#C084FC",
        "secondary-op-24": "rgba(147, 51, 234, 0.24)",
        "secondary-op-16": "rgba(147, 51, 234, 0.16)",
        "secondary-op-8": "rgba(147, 51, 234, 0.08)",

        "success-dark": "#065F46",
        "success-base": "#10B981",
        "success-light": "#6EE7B7",
        "success-op-24": "rgba(16, 185, 129, 0.24)",
        "success-op-16": "rgba(16, 185, 129, 0.16)",
        "success-op-8": "rgba(16, 185, 129, 0.08)",

        "warning-dark": "#9A3412",
        "warning-base": "#F97316",
        "warning-light": "#FDBA74",
        "warning-op-24": "rgba(249, 115, 22, 0.24)",
        "warning-op-16": "rgba(249, 115, 22, 0.16)",
        "warning-op-8": "rgba(249, 115, 22, 0.08)",

        "error-dark": "#BF2A2A",
        "error-base": "#F51616",
        "error-light": "#FA3939",
        "error-op-24": "#F516163D",
        "error-op-16": "#F5161629",
        "error-op-8": "#F5161614",

        "informative-dark": "#1E40AF",
        "informative-base": "#3B82F6",
        "informative-light": "#93C5FD",
        "informative-op-24": "rgba(59, 130, 246, 0.24)",
        "informative-op-16": "rgba(59, 130, 246, 0.16)",
        "informative-op-8": "rgba(59, 130, 246, 0.08)",

        "grayscale-dark": "#374151",
        "grayscale-base": "#6B7280",
        "grayscale-light": "#9CA3AF",
        "grayscale-op-24": "rgba(107, 114, 128, 0.24)",
        "grayscale-op-16": "rgba(107, 114, 128, 0.16)",
        "grayscale-op-8": "rgba(107, 114, 128, 0.08)",
      },
    },
  },
  plugins: [],
};
