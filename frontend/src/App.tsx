import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" }
];

const allCategories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];
const categories = [...new Set(events.map((e) => e.category))];

const upcoming = [...events]
  .sort((a, b) => a.date.localeCompare(b.date))
  .slice(0, 2);

const formatDate = (date: string) =>
  new Date(`${date}T00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const titles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: selected ? selected.title : "Etkinlik bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle"
  };
  const title = titles[page];

  useEffect(() => {
    document.title =
      title === "Kampüs Etkinlikleri" ? title : `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <p className="etiket">{event.category}</p>
        <p>
          Tarih: <time dateTime={`${event.date}T${event.time}`}>{formatDate(event.date)}, {event.time}</time>
        </p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{title}</h1>
        {page === "home" && (
          <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
        )}
        {page === "events" && <p>Ekim ayında kampüste düzenlenen etkinlikler.</p>}
        <nav className="menu">
          {menu.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi">{upcoming.map(renderCard)}</section>
            <p>
              <a
                href="#"
                className="buton"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör
              </a>
            </p>
          </>
        )}

        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <p id="sonuc">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>
            <section className="etkinlik-listesi">{filtered.map(renderCard)}</section>
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <p className="hata-kutusu">
              Etkinlik bulunamadı. Listeden bir etkinlik seçin.
            </p>
            <p>
              <a
                href="#"
                className="buton"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                ← Listeye dön
              </a>
            </p>
          </>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            {selected.image && (
              <figure>
                <img src={selected.image} alt={`${selected.title} afişi`} />
                <figcaption>{selected.title} afişi</figcaption>
              </figure>
            )}

            <section className="kunye">
              <h2>Etkinlik Künyesi</h2>
              <dl>
                <dt>Tarih</dt>
                <dd>
                  {formatDate(selected.date)}, {selected.time}
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>
            </section>

            <section className="aciklama">
              <h2>Açıklama</h2>
              <p>{selected.description}</p>
              <p className="butonlar">
                <a
                  href="#"
                  className="buton"
                  onClick={(e) => {
                    e.preventDefault();
                    go("events");
                  }}
                >
                  ← Listeye dön
                </a>
                <a
                  href="#"
                  className="buton"
                  onClick={(e) => {
                    e.preventDefault();
                    go("update", selected.id);
                  }}
                >
                  Bu etkinliği güncelle
                </a>
              </p>
            </section>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <p className="bilgi">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <p>
              <label htmlFor="title">Etkinlik Adı</label>
              <input id="title" name="title" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" />
            </p>
            <p>
              <label htmlFor="category">Kategori</label>
              <select id="category" name="category" defaultValue="">
                <option value="">Seçiniz</option>
                {allCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </p>
            <p>
              <label htmlFor="date">Tarih</label>
              <input type="date" id="date" name="date" />
            </p>
            <p>
              <label htmlFor="time">Saat</label>
              <input type="time" id="time" name="time" />
            </p>
            <p>
              <label htmlFor="location">Yer</label>
              <input id="location" name="location" maxLength={80} placeholder="Örn. A Blok Konferans Salonu" />
            </p>
            <p>
              <label htmlFor="capacity">Kontenjan</label>
              <input type="number" id="capacity" name="capacity" min={1} max={1000} />
            </p>
            <p>
              <label htmlFor="description">Açıklama</label>
              <textarea id="description" name="description" rows={5} />
            </p>
            <button type="submit">Kaydet</button>
          </form>
        )}
      </main>

      <footer>
        <p>İsmail Kervankıran · 2311012067 · 2026</p>
      </footer>
    </>
  );
}

export default App;
