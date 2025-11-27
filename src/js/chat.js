// Actualizar mensajes del chat
function updateChatMessages() {
  const messages = document.getElementById("messages");
  
  // Limpiar mensajes existentes (excepto el mensaje del asistente)
  const assistantMessage = messages.querySelector('.assistant-message');
  const dateSeparator = messages.querySelector('.date-separator');
  
  // Eliminar todos los mensajes excepto el del asistente y el separador de fecha
  while (messages.firstChild) {
    messages.removeChild(messages.firstChild);
  }
  
  // Volver a agregar el separador de fecha y el mensaje del asistente
  messages.appendChild(dateSeparator);
  messages.appendChild(assistantMessage);
  
  // Si el contacto activo es Ingrit Magdaleno, agregar mensajes específicos
  if (activeContactId === 1) {
    addMessage("Por favor, proporcione la siguiente información para continuar:", "bot");
    addMessage("- Número de transacción", "bot");
    addMessage("- Nombre del titular del servicio (en MAYÚSCULAS)", "bot");
    addMessage("- Comprobante de pago", "bot");
    addMessage("1234567890", "user");
  }
}

// Cerrar chat activo
function closeActiveChat() {
  // Encontrar el contacto activo y moverlo a "cerrados"
  const index = contactos.findIndex(contacto => contacto.id === activeContactId);
  if (index !== -1) {
    contactos[index].categoria = "cerrados";
    contactos[index].estado = "Cerrado";
  }
  
  // Actualizar la interfaz
  updateCounters();
  renderContacts();
  document.querySelector('.dropdown-menu').style.display = 'none';
  
  // Mostrar mensaje de confirmación
  addMessage("Chat cerrado correctamente. Se ha movido a la sección de cerrados.", "bot");
}

// Función para agregar mensajes al chat
function addMessage(text, type) {
  const messages = document.getElementById("messages");
  const msg = document.createElement("div");
  msg.classList.add("message", type);
  msg.textContent = text;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}
