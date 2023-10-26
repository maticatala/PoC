// Seleccionamos los elementos del DOM usando TypeScript
const d: Document = document;
const $form: HTMLInputElement | null = d.querySelector(".form-control");
const $tasks: HTMLUListElement | null = d.querySelector(".list-group");
const $removes: NodeListOf<HTMLAnchorElement> = d.querySelectorAll('a');

// Definimos la estructura de un objeto de tarea
interface Task {
  title: string;
}

// Función para obtener tareas desde el servidor
const getTasks = async () => {
  try {
    const res = await fetch("http://localhost:3000/tasks");
    const json: Task[] = await res.json();

    if (!res.ok) {
      throw { status: res.status, statusText: res.statusText };
    }

    json.forEach((el: Task) => {
      const $li: HTMLLIElement = d.createElement("li");
      $li.classList.add(
        'list-group-item',
        'd-flex',
        'justify-content-between',
        'align-items-center',
        'border-start-0',
        'border-top-0',
        'border-end-0',
        'border-bottom',
        'rounded-0',
        'mb-2'
      );
      $li.innerHTML = `
        <div class="d-flex align-items-center">
          <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
          ${el.title}
        </div>
        <a href="#!" data-mdb-toggle="tooltip" title="Remove item">
          <i class="fas fa-times text-primary" data-icon-type="remove"></i>
        </a>
      `;
      if ($tasks) {
        $tasks.appendChild($li);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// Función para agregar una tarea al servidor
const addTask = async (title: string) => {
  const data: Task = { title };

  try {
    const res = await fetch(`http://localhost:3000/tasks`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw { status: res.status, statusText: res.statusText };
    }

    location.reload();
  } catch (error) {
    console.log(error);
  }
};

// Función para eliminar una tarea en el servidor
const deleteTask = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3000/tasks?id=${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw { status: res.status, statusText: res.statusText };
    }

    location.reload();
  } catch (error) {
    console.log(error);
  }
};

d.addEventListener("DOMContentLoaded", getTasks);

d.addEventListener("change", (e: Event) => {
  if ($form && e.target === $form) {
    addTask($form.value);
  }
});

d.addEventListener("click", (e: Event) => {
  const target = e.target as HTMLElement;
  if (target.getAttribute('data-icon-type')) {
    // Encuentra el elemento li padre del enlace clicado
    const $li: HTMLLIElement | null = target.closest('li');

    if ($li) {
      // Encuentra la lista ul padre del elemento li
      const $ul: HTMLUListElement | null = $li.closest('ul');

      if ($ul) {
        // Obtiene la posición del elemento li dentro de la lista ul
        const position = Array.from($ul.children).indexOf($li);

        console.log("La posición del elemento en la lista es: " + position);

        deleteTask(position + 1);
      }
    }
  }
});
