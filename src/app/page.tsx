import "./page.scss";

export default function Home() {
  return (
    <div className="page_container">
      <header className="header_container">
        <picture>
          <img src="logo.svg" alt="Logo da FocalPoint" />
        </picture>
        <h2 className="header_title">Bem-vindo de volta, Marcus</h2>
        <p className="header_date">Segunda, 01 de dezembro de 2025</p>
      </header>
    </div>
  );
}
