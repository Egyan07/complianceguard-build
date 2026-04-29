const techs = [
  "FastAPI",
  "React",
  "TypeScript",
  "SQLite",
  "PostgreSQL",
  "Electron",
  "Docker",
  "Ed25519",
];

export function TechCredibilityBar() {
  return (
    <section className="bg-white border-y border-border py-8">
      <div className="container-cg text-center">
        <p
          className="text-[14px]"
          style={{ color: "#9CA3AF", letterSpacing: "0.05em" }}
        >
          Built on open standards trusted by security teams
          <span className="mx-3">·</span>
          {techs.map((t, i) => (
            <span key={t}>
              {t}
              {i < techs.length - 1 && <span className="mx-3">·</span>}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
