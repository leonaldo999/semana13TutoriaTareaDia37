const API_URL = 'http://localhost:3000/usuarios';

document.addEventListener('DOMContentLoaded', () => {
  obtenerUsuarios();

  const form = document.getElementById('usuarioForm');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;

    await crearUsuario({ nombre, email });
    form.reset();
    obtenerUsuarios();
  });
});

async function obtenerUsuarios() {
  try {
    const response = await fetch(API_URL);
    const usuarios = await response.json();
    const usuariosList = document.getElementById('usuariosList');
    usuariosList.innerHTML = '';
    usuarios.forEach(usuario => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.textContent = `${usuario.nombre} (${usuario.email})`;
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'btn btn-danger btn-sm';
      deleteBtn.textContent = 'Eliminar';
      deleteBtn.onclick = () => eliminarUsuario(usuario.id);
      li.appendChild(deleteBtn);
      usuariosList.appendChild(li);
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
  }
}

async function crearUsuario(usuario) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(usuario),
    });

    if (!response.ok) {
      throw new Error('Error al crear el usuario');
    }
  } catch (error) {
    console.error(error);
  }
}

async function eliminarUsuario(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar el usuario');
    }

    obtenerUsuarios(); // Actualizar la lista después de eliminar
  } catch (error) {
    console.error(error);
  }
}