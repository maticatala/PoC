const d = document,
  $form = d.querySelector(".form-control"),
  $tasks = d.querySelector(".list-group"),
  $removes = d.querySelectorAll('a');


const getTaks = async () => {

  try {
    let res = await fetch("http://localhost:3000/tasks"),
      json = await res.json();
    
    if (!res.ok) throw { status: res.status, statusText: res.statusText };
    
    json.forEach(el => {
      const $li = d.createElement("li");
      $li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'border-start-0', 'border-top-0', 'border-end-0', 'border-bottom', 'rounded-0', 'mb-2')
      $li.innerHTML = `
        <div class="d-flex align-items-center">
          <input class="form-check-input me-2" type="checkbox" value="" aria-label="..." />
          ${el.title}
        </div>
        <a href="#!" data-mdb-toggle="tooltip" title="Remove item">
          <i class="fas fa-times text-primary" data-icon-type="remove"></i>
        </a>
      `
      $tasks.appendChild($li);
    });

  } catch (error) {
    console.log(error);
  }
}

const addTask = async (title) => {
  data = { title }

  try {
    let res = await fetch(`http://localhost:3000/tasks`, data = {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    location.reload();
  } catch (error) {
    console.log(error);
  }
}

const deleteTask = async (id) => {

  try {
    let res = await fetch(`http://localhost:3000/tasks?id=${id}`, data = {
      method: 'DELETE'
    })

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    location.reload();    
  } catch (error) {
    console.log(error);
  }

}

d.addEventListener("DOMContentLoaded", getTaks());

d.addEventListener("change", e => {
  if (e.target === $form) {
    addTask(e.target.value);
  }
});

d.addEventListener("click", e => {
  if (e.target.getAttribute('data-icon-type')) {
    // Encuentra el elemento li padre del enlace clicado
    const $li = e.target.closest('li');
    
    // Encuentra la lista ul padre del elemento li
    const $ul = $li.closest('ul');

    // Obtiene la posición del elemento li dentro de la lista ul
    const position = Array.from($ul.children).indexOf($li);
    
    console.log("La posición del elemento en la lista es: " + position);

    deleteTask(position + 1);
  }
})

