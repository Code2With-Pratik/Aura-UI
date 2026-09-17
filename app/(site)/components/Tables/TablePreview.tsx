"use client";

import { useState, type ReactNode } from "react";
import {
  Check,
  ChevronDown,
  MoreHorizontal,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";

type TableVariant =
  "members" | "projects" | "billing" | "inventory" | "tasks" | "analytics";
const people = [
  ["Priya Shah", "Design", "#b8ff57"],
  ["Mateo Diaz", "Engineering", "#57c8ff"],
  ["Lena Ortiz", "Marketing", "#ff57b8"],
];

function Avatar({ name, color }: { name: string; color: string }) {
  return (
    <span
      className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-[9px] font-bold text-black"
      style={{ backgroundColor: color }}
    >
      {name
        .split(" ")
        .map((part) => part[0])
        .join("")}
    </span>
  );
}
function Status({
  children,
  color = "var(--color-accent-primary)",
  options,
}: {
  children: ReactNode;
  color?: string;
  options?: string[];
}) {
  const initial = String(children);
  const [value, setValue] = useState(initial);
  const [open, setOpen] = useState(false);
  const choices = Array.from(
    new Set(options ?? [initial, "Active", "Review", "Paused", "Archived"]),
  );

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label={`Change status from ${value}`}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[9px] font-semibold transition-opacity hover:opacity-80"
        style={{
          color,
          backgroundColor: `color-mix(in srgb, ${color} 14%, transparent)`,
        }}
      >
        <i
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: color }}
        />
        {value}
        <ChevronDown className="h-2.5 w-2.5" />
      </button>
      {open && (
        <span className="aura-glass absolute bottom-7 left-0 z-50 w-28 overflow-hidden rounded-lg p-1 shadow-xl">
          {choices.map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => {
                setValue(choice);
                setOpen(false);
              }}
              className={`block w-full rounded-md px-2 py-1.5 text-left text-[10px] hover:bg-fg/10 ${choice === value ? "text-accent-primary" : "text-fg-muted"}`}
            >
              {choice}
            </button>
          ))}
        </span>
      )}
    </span>
  );
}
function TableShell({
  title,
  meta,
  children,
  action,
}: {
  title: string;
  meta: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="w-full min-w-0 overflow-hidden rounded-xl border border-border-default bg-[color-mix(in_srgb,var(--color-fg)_2%,transparent)]">
      <header className="flex items-center justify-between gap-3 border-b border-border-default px-4 py-3">
        <div>
          <h3 className="text-[13px] font-semibold text-fg">{title}</h3>
          <p className="mt-0.5 text-[10px] text-fg-muted">{meta}</p>
        </div>
        {action}
      </header>
      <div data-lenis-prevent className="min-w-0 overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
function Head({ children }: { children?: ReactNode }) {
  return (
    <th className="whitespace-nowrap px-3 py-2 text-left align-middle text-[9px] font-semibold uppercase tracking-[0.14em] text-fg-muted">
      {children}
    </th>
  );
}
function Cell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <td
      className={`whitespace-nowrap border-t border-border-default px-3 py-2.5 align-middle text-[11px] text-fg/75 ${className}`}
    >
      {children}
    </td>
  );
}
function RowActions({
  onSave,
  onDelete,
  saved = false,
}: {
  onSave: () => void;
  onDelete: () => void;
  saved?: boolean;
}) {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex">
      <button
        type="button"
        aria-label="More actions"
        onClick={() => setOpen((value) => !value)}
        className="grid h-6 w-6 place-items-center rounded-md text-fg-muted hover:bg-fg/10 hover:text-fg"
      >
        <MoreHorizontal className="h-3.5 w-3.5" />
      </button>
      {open && (
        <span className="aura-glass absolute bottom-7 right-0 z-50 w-28 overflow-hidden rounded-lg p-1 shadow-xl">
          <button
            type="button"
            onClick={() => {
              onSave();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[10px] text-fg-muted hover:bg-fg/10 hover:text-fg"
          >
            <Save className="h-3 w-3" /> {saved ? "Saved" : "Save row"}
          </button>
          <button
            type="button"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[10px] text-[#ff6b7a] hover:bg-[#ff6b7a]/10"
          >
            <Trash2 className="h-3 w-3" /> Delete row
          </button>
        </span>
      )}
    </span>
  );
}

export default function TablePreview({ variant }: { variant: TableVariant }) {
  const [checked, setChecked] = useState<number[]>([0]);
  const [saved, setSaved] = useState(false);
  const [deletedRows, setDeletedRows] = useState<number[]>([]);
  const [savedRows, setSavedRows] = useState<number[]>([]);
  const saveRow = (id: number) =>
    setSavedRows((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  const deleteRow = (id: number) =>
    setDeletedRows((current) => [...current, id]);
  const toggle = (id: number) =>
    setChecked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  if (variant === "projects")
    return (
      <TableShell
        title="Projects"
        meta="8 active projects"
        action={
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md bg-accent-primary px-2 py-1.5 text-[9px] font-semibold text-black"
          >
            <Plus className="h-3 w-3" /> New
          </button>
        }
      >
        <table className="w-full min-w-[520px] text-left">
          <thead>
            <tr>
              <Head>#</Head>
              <Head>Project</Head>
              <Head>Owner</Head>
              <Head>Progress</Head>
              <Head>Status</Head>
              <Head />
            </tr>
          </thead>
          <tbody>
            {[
              ["Aura redesign", "Priya Shah", "82%", "Active"],
              ["Mobile launch", "Mateo Diaz", "64%", "Review"],
              ["Brand system", "Lena Ortiz", "41%", "Active"],
            ].map(([project, owner, progress, status], index) =>
              deletedRows.includes(index) ? null : (
                <tr key={project}>
                  <Cell className="font-mono text-fg-muted">{index + 1}</Cell>
                  <Cell className="font-medium text-fg">{project}</Cell>
                  <Cell>{owner}</Cell>
                  <Cell>
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-20 rounded-full bg-fg/10">
                        <span
                          className="block h-full rounded-full bg-accent-primary"
                          style={{ width: progress }}
                        />
                      </span>
                      {progress}
                    </div>
                  </Cell>
                  <Cell>
                    <Status
                      options={["Active", "Review", "Paused", "Archived"]}
                      color={
                        status === "Review"
                          ? "#ffb547"
                          : "var(--color-accent-primary)"
                      }
                    >
                      {status}
                    </Status>
                  </Cell>
                  <Cell>
                    <RowActions
                      saved={savedRows.includes(index)}
                      onSave={() => saveRow(index)}
                      onDelete={() => deleteRow(index)}
                    />
                  </Cell>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </TableShell>
    );
  if (variant === "billing")
    return (
      <TableShell
        title="Invoices"
        meta="Paid and upcoming billing"
        action={
          <button
            type="button"
            onClick={() => setSaved((value) => !value)}
            className="inline-flex items-center gap-1 rounded-md border border-border-default px-2 py-1.5 text-[9px] text-fg-muted hover:text-fg"
          >
            <Save className="h-3 w-3" />
            {saved ? "Saved" : "Save view"}
          </button>
        }
      >
        <table className="w-full min-w-[500px] text-left">
          <thead>
            <tr>
              <Head>#</Head>
              <Head>Invoice</Head>
              <Head>Date</Head>
              <Head>Amount</Head>
              <Head>Status</Head>
              <Head />
            </tr>
          </thead>
          <tbody>
            {[
              ["INV-1042", "Sep 17, 2026", "$2,480", "Paid"],
              ["INV-1041", "Aug 17, 2026", "$1,920", "Paid"],
              ["INV-1040", "Jul 17, 2026", "$2,120", "Pending"],
            ].map(([invoice, date, amount, status], index) =>
              deletedRows.includes(index) ? null : (
                <tr key={invoice}>
                  <Cell className="font-mono text-fg-muted">{index + 1}</Cell>
                  <Cell className="font-mono text-fg">{invoice}</Cell>
                  <Cell>{date}</Cell>
                  <Cell className="font-mono text-fg">{amount}</Cell>
                  <Cell>
                    <Status
                      options={["Paid", "Pending", "Overdue", "Refunded"]}
                      color={
                        status === "Pending"
                          ? "#ffb547"
                          : "var(--color-accent-primary)"
                      }
                    >
                      {status}
                    </Status>
                  </Cell>
                  <Cell>
                    <span className="inline-flex items-center gap-2">
                      <button
                        type="button"
                        className="text-[10px] text-accent-secondary hover:underline"
                      >
                        Download
                      </button>
                      <RowActions
                        saved={savedRows.includes(index)}
                        onSave={() => saveRow(index)}
                        onDelete={() => deleteRow(index)}
                      />
                    </span>
                  </Cell>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </TableShell>
    );
  if (variant === "inventory")
    return (
      <TableShell
        title="Inventory"
        meta="142 items across 4 locations"
        action={
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md border border-border-default px-2 py-1.5 text-[9px] text-fg-muted hover:text-fg"
          >
            <Upload className="h-3 w-3" /> Upload
          </button>
        }
      >
        <table className="w-full min-w-[520px] text-left">
          <thead>
            <tr>
              <Head>#</Head>
              <Head>Item</Head>
              <Head>SKU</Head>
              <Head>Stock</Head>
              <Head>Warehouse</Head>
              <Head />
            </tr>
          </thead>
          <tbody>
            {[
              ["Desk lamp", "LMP-204", "82", "Berlin"],
              ["Canvas tote", "BAG-118", "12", "Austin"],
              ["Notebook set", "NTB-052", "0", "Tokyo"],
            ].map(([item, sku, stock, warehouse], index) =>
              deletedRows.includes(index) ? null : (
                <tr key={sku}>
                  <Cell className="font-mono text-fg-muted">{index + 1}</Cell>
                  <Cell className="font-medium text-fg">{item}</Cell>
                  <Cell className="font-mono">{sku}</Cell>
                  <Cell>
                    <span
                      className={
                        stock === "0"
                          ? "text-[#ff6b7a]"
                          : stock === "12"
                            ? "text-[#ffb547]"
                            : "text-accent-primary"
                      }
                    >
                      {stock} units
                    </span>
                  </Cell>
                  <Cell>{warehouse}</Cell>
                  <Cell>
                    <RowActions
                      saved={savedRows.includes(index)}
                      onSave={() => saveRow(index)}
                      onDelete={() => deleteRow(index)}
                    />
                  </Cell>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </TableShell>
    );
  if (variant === "tasks")
    return (
      <TableShell
        title="Tasks"
        meta={`${checked.length} selected · 24 total`}
        action={
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md bg-accent-primary px-2 py-1.5 text-[9px] font-semibold text-black"
          >
            <Plus className="h-3 w-3" /> Add task
          </button>
        }
      >
        <table className="w-full min-w-[500px] text-left">
          <thead>
            <tr>
              <Head>#</Head>
              <Head />
              <Head>Task</Head>
              <Head>Assignee</Head>
              <Head>Priority</Head>
              <Head />
            </tr>
          </thead>
          <tbody>
            {[
              "Polish onboarding flow",
              "Review release notes",
              "Ship analytics update",
            ].map((task, index) =>
              deletedRows.includes(index) ? null : (
                <tr key={task}>
                  <Cell className="font-mono text-fg-muted">{index + 1}</Cell>
                  <Cell>
                    <button
                      type="button"
                      onClick={() => toggle(index)}
                      className={`grid h-4 w-4 place-items-center rounded border ${checked.includes(index) ? "border-accent-primary bg-accent-primary text-black" : "border-border-hover text-transparent"}`}
                    >
                      <Check className="h-3 w-3" />
                    </button>
                  </Cell>
                  <Cell
                    className={
                      checked.includes(index)
                        ? "text-fg-muted line-through"
                        : "font-medium text-fg"
                    }
                  >
                    {task}
                  </Cell>
                  <Cell>
                    <span className="inline-flex items-center gap-2">
                      <Avatar
                        name={people[index][0]}
                        color={people[index][2]}
                      />
                      {people[index][0]}
                    </span>
                  </Cell>
                  <Cell>
                    <Status
                      options={["Low", "Medium", "High", "Blocked"]}
                      color={index === 1 ? "#ff57b8" : "#57c8ff"}
                    >
                      {index === 1 ? "High" : "Medium"}
                    </Status>
                  </Cell>
                  <Cell>
                    <RowActions
                      saved={savedRows.includes(index)}
                      onSave={() => saveRow(index)}
                      onDelete={() => deleteRow(index)}
                    />
                  </Cell>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </TableShell>
    );
  if (variant === "analytics")
    return (
      <TableShell
        title="Analytics"
        meta="Weekly performance overview"
        action={
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md border border-border-default px-2 py-1.5 text-[9px] text-fg-muted hover:text-fg"
          >
            Last 7 days <ChevronDown className="h-3 w-3" />
          </button>
        }
      >
        <table className="w-full min-w-[500px] text-left">
          <thead>
            <tr>
              <Head>#</Head>
              <Head>Metric</Head>
              <Head>Current</Head>
              <Head>Change</Head>
              <Head>Owner</Head>
              <Head />
            </tr>
          </thead>
          <tbody>
            {[
              ["Conversion rate", "8.42%", "+2.1%", "Growth"],
              ["Active users", "24,892", "+14.8%", "Product"],
              ["Avg. session", "04:32", "-0.6%", "Research"],
            ].map(([metric, current, change, owner], index) =>
              deletedRows.includes(index) ? null : (
                <tr key={metric}>
                  <Cell className="font-mono text-fg-muted">{index + 1}</Cell>
                  <Cell className="font-medium text-fg">{metric}</Cell>
                  <Cell className="font-mono text-fg">{current}</Cell>
                  <Cell
                    className={
                      change.startsWith("+")
                        ? "text-accent-primary"
                        : "text-[#ffb547]"
                    }
                  >
                    {change}
                  </Cell>
                  <Cell>{owner}</Cell>
                  <Cell>
                    <RowActions
                      saved={savedRows.includes(index)}
                      onSave={() => saveRow(index)}
                      onDelete={() => deleteRow(index)}
                    />
                  </Cell>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </TableShell>
    );
  return (
    <TableShell
      title="Team members"
      meta="12 members · 4 online"
      action={
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-md border border-border-default px-2 py-1.5 text-[9px] text-fg-muted hover:text-fg"
        >
          <Plus className="h-3 w-3" /> Invite
        </button>
      }
    >
      <table className="w-full min-w-[500px] text-left">
        <thead>
          <tr>
            <Head>#</Head>
            <Head />
            <Head>Member</Head>
            <Head>Role</Head>
            <Head>Status</Head>
            <Head />
          </tr>
        </thead>
        <tbody>
          {people.map(([name, role, color], index) =>
            deletedRows.includes(index) ? null : (
              <tr key={name}>
                <Cell className="font-mono text-fg-muted">{index + 1}</Cell>
                <Cell>
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className={`grid h-4 w-4 place-items-center rounded border ${checked.includes(index) ? "border-accent-primary bg-accent-primary text-black" : "border-border-hover text-transparent"}`}
                  >
                    <Check className="h-3 w-3" />
                  </button>
                </Cell>
                <Cell>
                  <span className="inline-flex items-center gap-2 font-medium text-fg">
                    <Avatar name={name} color={color} />
                    {name}
                  </span>
                </Cell>
                <Cell>{role}</Cell>
                <Cell>
                  <Status options={["Online", "Away", "Offline", "Invited"]}>
                    {index === 2 ? "Away" : "Online"}
                  </Status>
                </Cell>
                <Cell>
                  <RowActions
                    saved={savedRows.includes(index)}
                    onSave={() => saveRow(index)}
                    onDelete={() => deleteRow(index)}
                  />
                </Cell>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </TableShell>
  );
}
