import { useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { findEventById } from "../../utils/filter-events";

interface Heading {
  path: string;
  title: string;
  text?: string;
}

// Adres → başlık ve kısa açıklama
const headings: Heading[] = [
  { path: "/", title: "Kampüs Etkinlikleri", text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." },
  { path: "/events", title: "Tüm Etkinlikler", text: "Ekim ayında kampüste düzenlenen etkinlikler." },
  { path: "/admin", title: "Etkinlik Yönetimi" },
  { path: "/admin/new", title: "Etkinlik Ekle" },
  { path: "/login", title: "Giriş Yap" },
  { path: "/register", title: "Kayıt Ol" },
  { path: "/forgot-password", title: "Şifremi Unuttum" }
];

function Header() {
  const { pathname } = useLocation();
  const { events } = useEvents();

  // Detay ve güncelleme sayfasında başlık etkinliğin adı olur
  const match = matchPath("/events/:id", pathname) ?? matchPath("/admin/:id/edit", pathname);
  const event = match ? findEventById(events, match.params.id ?? "") : undefined;
  const heading = headings.find((h) => matchPath(h.path, pathname));

  const title = event ? event.title : heading ? heading.title : "Sayfa Bulunamadı";
  const text = event ? `${event.category} · ${event.location}` : heading?.text;

  useEffect(() => {
    const site = "Kampüs Etkinlikleri";
    document.title = title === site ? site : `${title} — ${site}`;
  }, [title]);

  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}

export default Header;
