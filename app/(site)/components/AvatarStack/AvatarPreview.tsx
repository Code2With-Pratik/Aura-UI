"use client";

import type { ReactNode } from "react";

type Variant = "photo" | "square" | "single" | "alphabet" | "status" | "mixed";

const people = [
  { name: "Guillermo Rauch", image: "/Image.jpg" },
  { name: "Ava Patel", image: "/AssassinsCreedCover.jpg" },
  { name: "Lena Ortiz", image: "/CardCoverImage.jpg" },
  { name: "David Kim", image: "/AssassinsCreed.png" },
];

function Avatar({
  children,
  name,
  shape = "circle",
  color = "#b8ff57",
  status,
}: {
  children?: ReactNode;
  name: string;
  shape?: "circle" | "square";
  color?: string;
  status?: string;
}) {
  return (
    <span className="group/avatar relative -ml-3 first:ml-0 inline-flex transition-transform duration-300 ease-out hover:z-[20] hover:-translate-y-2 focus-within:z-[20] focus-within:-translate-y-2">
      <button
        type="button"
        aria-label={`View ${name}`}
        style={{ backgroundColor: color }}
        className={`relative grid h-12 w-12 place-items-center overflow-hidden border-2 border-[var(--color-fg)] text-[13px] font-medium text-white outline-none transition-shadow duration-300 group-hover/avatar:shadow-[0_10px_20px_rgba(0,0,0,.35)] focus-visible:ring-2 focus-visible:ring-accent-primary ${shape === "circle" ? "rounded-full" : "rounded-xl"}`}
      >
        {children}
      </button>
      {status && (
        <span
          aria-label={status === "#ffb547" ? "Away" : "Online"}
          className="pointer-events-none absolute bottom-0 right-0 z-[100] h-3.5 w-3.5 rounded-full border-2 border-[var(--color-fg)] shadow-[0_0_0_1px_rgba(255,255,255,.14),0_2px_8px_rgba(0,0,0,.5)]"
          style={{ backgroundColor: status }}
        />
      )}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-[9999] -translate-x-1/2 translate-y-1 scale-95 whitespace-nowrap rounded-lg bg-[#111] px-3 py-2 text-[11px] font-medium text-white opacity-0 shadow-[0_14px_30px_rgba(0,0,0,.35)] ring-1 ring-white/10 transition-[opacity,transform] duration-300 group-hover/avatar:translate-y-0 group-hover/avatar:scale-100 group-hover/avatar:opacity-100 group-focus-within/avatar:translate-y-0 group-focus-within/avatar:scale-100 group-focus-within/avatar:opacity-100"
      >
        {name}
        <i className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#111]" />
      </span>
    </span>
  );
}

function Stack({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center justify-center px-8 py-12">
      {children}
    </div>
  );
}

export default function AvatarPreview({ variant }: { variant: Variant }) {
  if (variant === "single")
    return (
      <Stack>
        <Avatar name="Guillermo Rauch">
          <img
            src="/Image.jpg"
            alt="Guillermo Rauch"
            className="h-full w-full object-cover"
          />
        </Avatar>
      </Stack>
    );
  if (variant === "square")
    return (
      <Stack>
        {people.slice(0, 4).map((person) => (
          <Avatar key={person.name} name={person.name} shape="square">
            <img
              src={person.image}
              alt=""
              className="h-full w-full object-cover"
            />
          </Avatar>
        ))}
      </Stack>
    );
  if (variant === "alphabet")
    return (
      <Stack>
        {["GR", "AP", "LO", "DK", "+4"].map((initial, index) => (
          <Avatar
            key={initial}
            name={index === 4 ? "4 more members" : people[index].name}
            color={
              ["#57c8ff", "#ff57b8", "#b8ff57", "#ffb547", "#292929"][index]
            }
          >
            <span style={{ color: index === 4 ? "#fff" : "#000" }}>
              {initial}
            </span>
          </Avatar>
        ))}
      </Stack>
    );
  if (variant === "status")
    return (
      <Stack>
        {people.slice(0, 4).map((person, index) => (
          <Avatar
            key={person.name}
            name={`${person.name} · ${index === 2 ? "Away" : "Online"}`}
            status={index === 2 ? "#ffb547" : "#b8ff57"}
          >
            <img
              src={person.image}
              alt=""
              className="h-full w-full object-cover"
            />
          </Avatar>
        ))}
      </Stack>
    );
  if (variant === "mixed")
    return (
      <Stack>
        <Avatar name="Guillermo Rauch">
          <img src="/Image.jpg" alt="" className="h-full w-full object-cover" />
        </Avatar>
        <Avatar name="Ava Patel" shape="square">
          <span className="text-black" style={{ color: "#000" }}>
            AP
          </span>
        </Avatar>
        <Avatar name="Lena Ortiz" color="#ff57b8">
          <span style={{ color: "#000" }}>LO</span>
        </Avatar>
        <Avatar name="4 more members" color="#292929">
          <span>+4</span>
        </Avatar>
      </Stack>
    );
  return (
    <Stack>
      {people.map((person) => (
        <Avatar key={person.name} name={person.name}>
          <img
            src={person.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </Avatar>
      ))}
      <Avatar name="4 more members" color="#292929">
        <span>+4</span>
      </Avatar>
    </Stack>
  );
}
