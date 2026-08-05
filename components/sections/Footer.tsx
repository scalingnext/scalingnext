import { Youtube, Linkedin, Instagram } from "lucide-react";

const linkCols = [
  {
    title: "Links",
    links: ["Curriculum", "Pricing", "Testimonials", "FAQs", "Contact us"],
  },
  {
    title: "Others",
    links: ["Terms Of Service", "Privacy Policy", "Refund Policy"],
  },
];

export function Footer() {
  return (
    <footer className="bg-[#F1F1F1] pt-16 pb-8 px-6 border-t border-light-subtle font-sans text-light-primary">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto text-left items-start pb-12 border-b border-gray-300/50">
        <div className="space-y-4">
          <h3 className="text-2xl font-extrabold tracking-tight">
            GROWTH ROCKET AI
          </h3>
          <p className="text-sm text-light-muted max-w-xs">
            Master AI content creation and build your AI business.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="YouTube"
              className="h-11 w-11 md:h-9 md:w-9 rounded-full border border-light-subtle bg-white flex items-center justify-center hover:text-brand-orange"
            >
              <Youtube size={16} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="h-11 w-11 md:h-9 md:w-9 rounded-full border border-light-subtle bg-white flex items-center justify-center hover:text-brand-orange"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="h-11 w-11 md:h-9 md:w-9 rounded-full border border-light-subtle bg-white flex items-center justify-center hover:text-brand-orange"
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
                <li key={l}>
                  <a href="#" className="inline-flex items-center min-h-[40px] md:min-h-0 hover:text-brand-orange transition-colors">
                    {l}
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
            <p className="text-sm font-bold text-light-primary">
              team@ayushmanpandita.com
            </p>
            <p className="text-xs text-light-muted">For all your questions</p>
          </div>
          <div>
            <p className="text-sm font-bold text-light-primary">
              +91 97605 98284
            </p>
            <p className="text-xs text-light-muted">Call or Whatsapp</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-light-muted gap-4">
        <p>Legal Name - Ayushman Pandita</p>
        <p>© 2026 Mindly. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
