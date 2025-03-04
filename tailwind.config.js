/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // for texts and icons
        content: {
          primary: {
            light: "rgba(3, 7, 18, 1)",
            dark: "rgba(255, 255, 255, 1)",
          },
          secondary: {
            light: "rgba(3, 7, 18, 0.5)",
            dark: "rgba(255, 255, 255, 0.5)",
          },
          placeholder: {
            light: "rgba(3, 7, 18, 0.32)",
            dark: "rgba(255, 255, 255, 0.32)",
          },
          disabled: {
            light: "rgba(3, 7, 18, 0.24)",
            dark: "rgba(255, 255, 255, 0.24)",
          },
        },
        components: {
          default: {
            light: "rgba(3, 7, 18, 0.05)",
            dark: "rgba(255, 255, 255, 0.05)",
          },
          hover: {
            light: "rgba(3, 7, 18, 0.1)",
            dark: "rgba(255, 255, 255, 0.1)",
          },
          press: {
            light: "rgba(3, 7, 18, 0.15)",
            dark: "rgba(255, 255, 255, 0.15)",
          },
          selected: {
            light: "rgba(3, 7, 18, 0.05)",
            dark: "rgba(255, 255, 255, 0.05)",
          },
          disabled: {
            light: "rgba(3, 7, 18, 0.05)",
            dark: "rgba(255, 255, 255, 0.05)",
          },
        },

        layout: {
          canvas: {
            light: "rgba(242, 243, 243, 1)",
            dark: "rgba(16, 16, 17, 1)",
          },
          container: {
            light: "rgba(255, 255, 255, 1)",
            dark: "rgba(26, 26, 27, 1)",
          },
          pure: {
            light: "rgba(255, 255, 255, 1)",
            dark: "rgba(16, 16, 17, 1)",
          },
          surface1: {
            light: "rgba(255, 255, 255, 1)",
            dark: "rgba(36, 36, 38, 1)",
          },
          surface2: {
            light: "rgba(255, 255, 255, 1)",
            dark: "rgba(57, 57, 59, 1)",
          },
          focus: {
            light: "rgba(16, 16, 17, 0.5)",
            dark: "rgba(3, 7, 18, 0.5)",
          },
        },

        additional: {
          whiteInverted: {
            light: "rgba(242, 243, 243, 1)",
            dark: "rgba(16, 16, 17, 1)",
          },
          blackInverted: {
            light: "rgba(3, 7, 18, 1)",
            dark: "rgba(255, 255, 255, 1)",
          },
          "white-Base": "rgba(255, 255, 255, 1)",
          "white-Base-Op-50": "rgba(255, 255, 255, 0.5)",
          "white-Base-Op-5": "rgba(255, 255, 255, 0.5)",
          "black-Base": "rgba(3, 7, 18, 1)",
          "black-Base-Op-50": "rgba(3, 7, 18, 0.5)",
        },

        primary: {
          dark: {
            light: "rgba(6, 66, 53, 1)",
            dark: "rgba(60, 167, 144, 1)",
          },
          base: {
            light: "rgba(8, 95, 76, 1)",
            dark: "rgba(38, 155, 130, 1)",
          },
          light: {
            light: "rgba(20, 134, 109, 1)",
            dark: "rgba(27, 132, 109, 1)",
          },
          op24: {
            light: "rgba(8, 95, 76, 0.24)",
            dark: "rgba(29, 139, 115, 0.24)",
          },
          op16: {
            light: "rgba(8, 95, 76, 0.16)",
            dark: "rgba(29, 139, 115, 0.16)",
          },
          op8: {
            light: "rgba(8, 95, 76, 0.08)",
            dark: "rgba(29, 139, 115, 0.08)",
          },
        },

        secondary: {
          dark: {
            light: "rgba(136, 58, 210, 1)",
            dark: "rgba(198, 139, 255, 1)",
          },
          base: {
            light: "rgba(168, 85, 247, 1)",
            dark: "rgba(168, 85, 247, 1)",
          },
          light: {
            light: "rgba(198, 139, 255, 1)",
            dark: "rgba(136, 58, 210, 1)",
          },
          op24: {
            light: "rgba(168, 85, 247, 0.24)",
            dark: "rgba(168, 85, 247, 0.24)",
          },
          op16: {
            light: "rgba(168, 85, 247, 0.16)",
            dark: "rgba(168, 85, 247, 0.16)",
          },
          op8: {
            light: "rgba(168, 85, 247, 0.08)",
            dark: "rgba(168, 85, 247, 0.08)",
          },
        },

        success: {
          dark: {
            light: "rgba(33, 154, 77, 1)",
            dark: "rgba(58, 217, 116, 1)",
          },
          base: {
            light: "rgba(33, 190, 91, 1)",
            dark: "rgba(33, 190, 91, 1)",
          },
          light: {
            light: "rgba(58, 217, 116, 1)",
            dark: "rgba(33, 154, 77, 1)",
          },
          op24: {
            light: "rgba(33, 190, 91, 0.24)",
            dark: "rgba(33, 190, 91, 0.24)",
          },
          op16: {
            light: "rgba(33, 190, 91, 0.16)",
            dark: "rgba(33, 190, 91, 0.16)",
          },
          op8: {
            light: "rgba(33, 190, 91, 0.08)",
            dark: "rgba(33, 190, 91, 0.08)",
          },
        },

        warning: {
          dark: {
            light: "rgba(195, 90, 18, 1)",
            dark: "rgba(255, 152, 81, 1)",
          },
          base: {
            light: "rgba(249, 115, 22, 1)",
            dark: "rgba(249, 115, 22, 1)",
          },
          light: {
            light: "rgba(255, 152, 81, 1)",
            dark: "rgba(195, 90, 18, 1)",
          },
          op24: {
            light: "rgba(249, 115, 22, 0.24)",
            dark: "rgba(249, 115, 22, 0.24)",
          },
          op16: {
            light: "rgba(249, 115, 22, 0.16)",
            dark: "rgba(249, 115, 22, 0.16)",
          },
          op8: {
            light: "rgba(249, 115, 22, 0.08)",
            dark: "rgba(249, 115, 22, 0.08)",
          },
        },

        error: {
          dark: {
            light: "rgba(197, 34, 42, 1)",
            dark: "rgba(253, 80, 88, 1)",
          },
          base: {
            light: "rgba(251, 44, 54, 1)",
            dark: "rgba(251, 44, 54, 1)",
          },
          light: {
            light: "rgba(253, 80, 88, 1)",
            dark: "rgba(197, 34, 42, 1)",
          },
          op24: {
            light: "rgba(251, 44, 54, 0.24)",
            dark: "rgba(251, 44, 54, 0.24)",
          },
          op16: {
            light: "rgba(251, 44, 54, 0.16)",
            dark: "rgba(251, 44, 54, 0.16)",
          },
          op8: {
            light: "rgba(251, 44, 54, 0.08)",
            dark: "rgba(251, 44, 54, 0.08)",
          },
        },

        informative: {
          dark: {
            light: "rgba(42, 99, 192, 1)",
            dark: "rgba(101, 158, 250, 1)",
          },
          base: {
            light: "rgba(59, 130, 246, 1)",
            dark: "rgba(59, 130, 246, 1)",
          },
          light: {
            light: "rgba(101, 158, 250, 1)",
            dark: "rgba(42, 99, 192, 1)",
          },
          op24: {
            light: "rgba(59, 130, 246, 0.24)",
            dark: "rgba(59, 130, 246, 0.24)",
          },
          op16: {
            light: "rgba(59, 130, 246, 0.16)",
            dark: "rgba(59, 130, 246, 0.16)",
          },
          op8: {
            light: "rgba(59, 130, 246, 0.08)",
            dark: "rgba(59, 130, 246, 0.08)",
          },
        },

        grayscale: {
          dark: {
            light: "rgba(81, 87, 100, 1)",
            dark: "rgba(154, 162, 178, 1)",
          },
          base: {
            light: "rgba(107, 114, 128, 1)",
            dark: "rgba(107, 114, 128, 1)",
          },
          light: {
            light: "rgba(154, 162, 178, 1)",
            dark: "rgba(81, 87, 100, 1)",
          },
          op24: {
            light: "rgba(107, 114, 128, 0.24)",
            dark: "rgba(107, 114, 128, 0.24)",
          },
          op16: {
            light: "rgba(107, 114, 128, 0.16)",
            dark: "rgba(107, 114, 128, 0.16)",
          },
          op8: {
            light: "rgba(107, 114, 128, 0.08)",
            dark: "rgba(107, 114, 128, 0.08)",
          },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
