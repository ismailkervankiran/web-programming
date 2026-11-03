import { useEffect } from "react";
import { matchPath, useLocation } from "react-router-dom";

// Adres → başlık ve kısa açıklama
interface Heading {
  path: string;
  title: string;
  text?: string;
}

const headings: Heading[] = [
  { path: "/", title: "Kampüs Etkinlikleri", text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." },
  { path: "/events", title: "Tüm Etkinlikler", text: "Ekim ayında kampüste düzenlenen etkinlikler." },
  { path: "/events/:id", title: "Etkinlik Detayı" },
  { path: "/login", title: "Giriş Yap" },
  { path: "/register", title: "Kayıt Ol" },
  { path: "/forgot-password", title: "Şifremi Unuttum" },
  { path: "/admin", title: "Etkinlik Yönetimi" },
  { path: "/admin/new", title: "Etkinlik Ekle" },
  { path: "/admin/:id/edit", title: "Etkinlik Güncelle" }
];

function Header() {
  const { pathname } = useLocation();
  const heading = headings.find((h) => matchPath(h.path, pathname)) ?? { path: "*", title: "Sayfa Bulunamadı" };

  useEffect(() => {
    document.title = pathname === "/" ? heading.title : `${heading.title} — Kampüs Etkinlikleri`;
  }, [pathname, heading.title]);

  return (
    <header className="site-baslik">
      <h1>{heading.title}</h1>
      {heading.text && <p>{heading.text}</p>}
    </header>
  );
}

export default Header;
