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
      <main className="tasks_container">
        <p className="open_tasks_title">Suas tarefas de hoje</p>
        <ul className="open_tasks"></ul>
        <p className="completed_tasks_title">Tarefas finalizadas</p>
        <ul className="completed_tasks"></ul>
      </main>
      <button className="new_task_button">Adicionar nova tarefa</button>
    </div>
  );
}
