import "./taskItem.scss";

export default function TaskItem() {
  return (
    <li className="task_container">
      <input type="checkbox" className="task_checkbox" checked />
      <p className="task_description">Comprar pão</p>
      <input type="image" className="task_delete_button" src="trash.svg" />
    </li>
  );
}
