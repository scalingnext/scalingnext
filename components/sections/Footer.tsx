import { Youtube, Twitter, Instagram } from "lucide-react";

// Anchors are root-relative (`/#id`) rather than bare (`#id`) because this
// footer renders on /about too, where those sections do not exist. A bare hash
// would silently do nothing there.
const linkCols = [
  {
    title: "Community",
    links: [
      { label: "Community", href: "/#community" },
      { label: "Webinars", href: "/#webinars" },
      { label: "Resources", href: "/#resources" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Others",
    links: [
      { label: "FAQs", href: "/#faqs" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#F1F1F1] pt-16 pb-8 px-6 border-t border-light-subtle font-sans text-light-primary">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto text-left items-start pb-12 border-b border-gray-300/50">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="ScalingNext Logo"
              className="w-8 h-8 rounded-lg object-contain"
            />
            <h3 className="text-2xl font-extrabold tracking-tight">
              ScalingNext
            </h3>
          </div>
          <p className="text-sm text-light-muted max-w-xs">
            A free community for staying ahead in AI.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="YouTube"
              className="h-11 w-11 md:h-9 md:w-9 rounded-full border border-light-subtle bg-white flex items-center justify-center hover:text-brand-orange transition-colors"
            >
              <Youtube size={16} />
            </a>
            <a
              href="https://x.com/scalingnext"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className="h-11 w-11 md:h-9 md:w-9 rounded-full border border-light-subtle bg-white flex items-center justify-center hover:text-brand-orange transition-colors"
            >
              <Twitter size={16} />
            </a>
            <a
              href="https://www.instagram.com/scalingnext"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="h-11 w-11 md:h-9 md:w-9 rounded-full border border-light-subtle bg-white flex items-center justify-center hover:text-brand-orange transition-colors"
            >
              <Instagram size={16} />
            </a>
          </div>
        </div>

        {linkCols.map((col) => (
          <div key={col.title} className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-light-primary">
              {col.title}
            </h4>
            <ul className="space-y-2 text-sm text-light-muted">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="inline-flex items-center min-h-[40px] md:min-h-0 hover:text-brand-orange transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-light-primary">
              Get in touch
            </h4>
          </div>
          <div>
            <p className="text-sm text-light-muted">
              Questions, ideas, or feedback? Reach out through the contact
              section above.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-light-muted gap-4">
        <p>ScalingNext — a free AI community</p>
        <p>© 2026 ScalingNext. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
