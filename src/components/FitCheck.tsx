import { Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "./Reveal";
import { DOWNLOAD_URL } from "@/lib/site";

/**
 * The honest disqualifier: three situations where ComplianceGuard is genuinely
 * the wrong tool, with better alternatives named. Following the pattern Linear
 * and PostHog use (disqualification is qualification), grounded in the README's
 * "Not a Good Fit If" list.
 */

const notForYou = [
  {
    title: "Cloud-only audits",
    body: "Your SOC 2 story is your AWS or GCP configuration, and nothing that runs on the machines your team actually uses.",
    fit: "Vanta or Drata cover cloud infrastructure evidence far better.",
    links: [
      { label: "Vanta", href: "https://www.vanta.com/" },
      { label: "Drata", href: "https://drata.com/" },
    ],
  },
  {
    title: "Linux endpoints",
    body: "ComplianceGuard scans Windows 10/11 and macOS 12+ today. Linux support is planned, but it is not here yet.",
    fit: "Track Linux support in the changelog, and come back when it lands.",
    links: [],
  },
  {
    title: "A one-login GRC suite",
    body: "You want policies, risk registers, training tracking, vendor intake, and evidence bundled into one hosted product with SSO.",
    fit: "A dedicated GRC platform is the right shape for that. ComplianceGuard is an evidence engine, and we would rather you bought the tool that covers the whole program.",
    links: [],
  },
];

const goodFit = [
  "You run Windows or macOS endpoints, Intel or Apple Silicon",
  "Your next audit is SOC 2, ISO 27001, or HIPAA",
  "You want evidence collected from the machine, not only cloud APIs",
  "You need it to work offline, air-gapped, or fully self-hosted",
];

export function FitCheck() {
  return (
    <section className="bg-snow py-24 md:py-32">
      <div className="container-cg grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <Reveal>
          <p className="eyebrow mb-4">An honest fit</p>
          <h2 className="display-2">Some teams shouldn&rsquo;t use us.</h2>
          <p className="mt-6 body-lg text-ink-2">
            Sending you to a better tool costs us a download and saves you a quarter. If any of
            these is your situation, the alternatives below are genuinely stronger for you.
          </p>

          <div className="mt-10">
            {notForYou.map((n, i) => (
              <div
                key={n.title}
                className="py-6 first:pt-0 border-b border-hairline last:border-0"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="font-mono text-[12px] text-ink-3 w-6 shrink-0"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[17px] font-semibold text-ink">{n.title}</h3>
                  <span className="mono-tag ml-auto">not us</span>
                </div>
                <p className="mt-2.5 text-[15px] text-ink-2 leading-[1.65]">{n.body}</p>
                <p className="mt-2 text-[14px] text-ink-2 leading-[1.6]">
                  <span className="text-ink-3">Better fit: </span>
                  {n.fit}
                  {n.links.length > 0 && (
                    <>
                      {" "}
                      {n.links.map((l, li) => (
                        <span key={l.label}>
                          {li > 0 && <span className="text-ink-3"> · </span>}
                          <a
                            href={l.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-link hover:underline"
                          >
                            {l.label}
                          </a>
                        </span>
                      ))}
                      .
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:sticky lg:top-24">
          <div className="card-fog rounded-[16px] p-8 md:p-10">
            <span className="mono-tag">a good fit if</span>
            <ul className="mt-6 space-y-4">
              {goodFit.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-ink-2 leading-[1.6]">
                  <Check
                    size={17}
                    strokeWidth={2.5}
                    aria-hidden
                    className="text-azure shrink-0 mt-1"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-7 border-t border-hairline">
              <p className="text-[14px] text-ink-3 leading-[1.6]">
                If that reads like your team, the free tier scores your first machine against 12
                core controls before you pay anything.
              </p>
              <Link to="/pricing" className="btn-ghost mt-5 w-full">
                See plans and pricing
              </Link>
              <a
                href={DOWNLOAD_URL}
                className="mt-2.5 block text-center text-[14px] text-link hover:underline"
              >
                Or download the app first
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
