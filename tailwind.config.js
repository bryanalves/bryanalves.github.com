/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{njk,md}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-space-grotesk)", ...fontFamily.sans],
      },
      colors: {
        primary: colors.pink,
        gray: colors.gray,
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme("colors.primary.500"),
              "&:hover": {
                color: `${theme("colors.primary.600")}`,
              },
              code: { color: theme("colors.primary.400") },
            },
            "h1,h2": {
              fontWeight: "700",
              letterSpacing: theme("letterSpacing.tight"),
            },
            h3: {
              fontWeight: "600",
            },
            code: {
              color: theme("colors.indigo.500"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
