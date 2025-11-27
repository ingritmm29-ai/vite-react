// Mostrar modal de perfil
function showProfileModal() {
  // Buscar el contacto activo
  const contactData = contactos.find(contacto => contacto.id === activeContactId) || {};
  
  // Guardar datos actuales para posibles cambios
  currentProfileData = {...contactData};
  
  // Llenar el formulario con los datos del contacto
  document.getElementById('profile-name').value = contactData.nombre || '';
  document.getElementById('profile-phone').value = contactData.telefono || '';
  document.getElementById('profile-email').value = contactData.email || '';
  document.getElementById('profile-service').value = contactData.servicio || '';
  document.getElementById('profile-fibra').checked = contactData.fibra || false;
  document.getElementById('profile-microondas').checked = contactData.microondas || false;
  document.getElementById('profile-interes').value = contactData.interes || '';
  document.getElementById('profile-comentario').value = contactData.comentario || '';
  
  // Mostrar el modal
  document.getElementById('profile-modal').classList.add('active');
}

// Cerrar modal de perfil
function closeProfileModal() {
  document.getElementById('profile-modal').classList.remove('active');
}

// Guardar perfil
function saveProfile() {
  // Obtener valores del formulario
  const name = document.getElementById('profile-name').value;
  const phone = document.getElementById('profile-phone').value;
  const email = document.getElementById('profile-email').value;
  const service = document.getElementById('profile-service').value;
  const fibra = document.getElementById('profile-fibra').checked;
  const microondas = document.getElementById('profile-microondas').checked;
  const interes = document.getElementById('profile-interes').value;
  const comentario = document.getElementById('profile-comentario').value;
  
  // Validar teléfono (debe tener 10 dígitos)
  if (phone && phone.length !== 10) {
    alert("El número de teléfono debe tener exactamente 10 dígitos.");
    return;
  }
  
  // Actualizar datos del contacto
  const index = contactos.findIndex(contacto => contacto.id === activeContactId);
  if (index !== -1) {
    contactos[index].nombre = name;
    contactos[index].telefono = phone;
    contactos[index].email = email;
    contactos[index].servicio = service;
    contactos[index].fibra = fibra;
    contactos[index].microondas = microondas;
    contactos[index].interes = interes;
    contactos[index].comentario = comentario;
  }
  
  // Actualizar interfaz
  renderContacts();
  updateChatHeader(activeContactId);
  
  // Cerrar modal
  closeProfileModal();
  
  // Mostrar mensaje de confirmación
  addMessage("Perfil actualizado correctamente.", "bot");
}
