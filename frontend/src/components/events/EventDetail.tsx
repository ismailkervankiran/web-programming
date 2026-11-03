import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  return (
    <article className="detay">
      {event.image && (
        <figure>
          <img src={event.image} alt={`${event.title} afişi`} />
          <figcaption>{event.title} afişi</figcaption>
        </figure>
      )}

      <section className="kunye">
        <h2>Etkinlik Künyesi</h2>
        <dl>
          <dt>Tarih</dt>
          <dd>
            {formatDate(event.date)}, {event.time}
          </dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </section>

      <section className="aciklama">
        <h2>Açıklama</h2>
        <p>{event.description}</p>
        <p className="butonlar">
          <Link to="/events" className="buton">
            ← Listeye dön
          </Link>
          <Link to={`/admin/${event.id}/edit`} className="buton">
            Bu etkinliği güncelle
          </Link>
        </p>
      </section>
    </article>
  );
}

export default EventDetail;
