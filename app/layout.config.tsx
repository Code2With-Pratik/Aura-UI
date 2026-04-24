import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <span className="flex items-center gap-2 font-semibold tracking-tight">
        <span
          className="inline-block h-5 w-5 rounded-md"
          style={{
            background:
              "radial-gradient(circle at 50% 40%, #b8ff57 0%, rgba(184,255,87,0.2) 60%, transparent 100%), #0f0f0f",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)",
          }}
        />
        Aura UI
      </span>
    ),
  },
  links: [
    { text: "Components", url: "/components" },
    { text: "Fonts", url: "/fonts" },
    { text: "Icons", url: "/icons" },
    { text: "GitHub", url: "https://github.com/Code2With-Pratik/Aura-UI", external: true },
  ],
};
