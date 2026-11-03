import { NavLink } from "react-router-dom";

const menu = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/events", label: "Etkinlikler" },
  { to: "/admin", label: "Yönetim" },
  { to: "/login", label: "Giriş" }
];

function Navigation() {
  return (
    <nav className="menu">
      <ul>
        {menu.map((item) => (
          <li key={item.to}>
            {/* end: "/" sadece ana sayfada aktif olsun */}
            <NavLink to={item.to} end={item.to === "/"}>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
