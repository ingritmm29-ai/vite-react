// Base de datos centralizada de contactos
const contactos = [
  { 
    id: 1, 
    nombre: "Ingrit Magdaleno", 
    hora: "10:45", 
    preview: "INGRIT MARLEN MAGDALENO ZAVA...", 
    estado: "Asesor 3", 
    categoria: "abiertos",
    fecha: "30 Nov, 2023", 
    telefono: "5512345678",
    email: "ingrit@example.com",
    servicio: "Internet Básico",
    fibra: true,
    microondas: false,
    interes: "Consulta sobre facturación",
    comentario: "Cliente interesado en promoción"
  },
  { 
    id: 2, 
    nombre: "Emilio Villa", 
    hora: "10:42", 
    preview: "¿Con qué método de pago desea ha...", 
    estado: "Sin asignar", 
    categoria: "abiertos",
    telefono: "5523456789",
    email: "emilio@example.com",
    servicio: "Internet Avanzado",
    fibra: false,
    microondas: true,
    interes: "Problema con conexión",
    comentario: "Cliente reporta intermitencia"
  },
  { 
    id: 3, 
    nombre: "Oscar Cruz", 
    hora: "10:40", 
    preview: "Pago realizado con éxito!", 
    estado: "Asesor 1", 
    categoria: "abiertos",
    telefono: "5534567890",
    email: "oscar@example.com",
    servicio: "Telefonía",
    fibra: true,
    microondas: true,
    interes: "Confirmación de pago",
    comentario: "Cliente solicita comprobante"
  },
  { 
    id: 4, 
    nombre: "Andrea Rojas", 
    hora: "10:38", 
    preview: "¿Desea recibir tu comprobante por c...", 
    estado: "Asesor 2", 
    categoria: "abiertos",
    telefono: "5545678901",
    email: "andrea@example.com",
    servicio: "Internet Básico",
    fibra: false,
    microondas: false,
    interes: "Solicitud de comprobante",
    comentario: "Cliente prefiere correo electrónico"
  },
  { 
    id: 5, 
    nombre: "Leobardo Castillo", 
    hora: "10:35", 
    preview: "Perfecto. Por favor ingresa tu número...", 
    estado: "Asesor 3", 
    categoria: "abiertos",
    telefono: "5556789012",
    email: "leobardo@example.com",
    servicio: "Paquete Completo",
    fibra: true,
    microondas: false,
    interes: "Contratación de servicio",
    comentario: "Cliente muy satisfecho con la atención"
  },
  { 
    id: 6, 
    nombre: "José León", 
    hora: "10:30", 
    preview: "Listo. Su pago por $450.00 MXN fue...", 
    estado: "Asesor 4", 
    categoria: "agenda",
    telefono: "5567890123",
    email: "jose@example.com",
    servicio: "Internet Básico",
    fibra: false,
    microondas: true,
    interes: "Confirmación de pago",
    comentario: "Cliente agendado para instalación"
  },
  { 
    id: 7, 
    nombre: "Antonio Sandoval", 
    hora: "10:25", 
    preview: "Gracias por tu pago. ¿Puedo ayudar...", 
    estado: "Asesor 5", 
    categoria: "pendientes",
    telefono: "5578901234",
    email: "antonio@example.com",
    servicio: "Telefonía",
    fibra: true,
    microondas: false,
    interes: "Consulta técnica",
    comentario: "Esperando respuesta del área técnica"
  },
  { 
    id: 8, 
    nombre: "Jésica Chavira", 
    hora: "10:20", 
    preview: "¿Con qué método de pago desea ha...", 
    estado: "Cerrado", 
    categoria: "cerrados",
    telefono: "5589012345",
    email: "jesica@example.com",
    servicio: "Internet Avanzado",
    fibra: false,
    microondas: true,
    interes: "Consulta de precios",
    comentario: "Cliente no interesado por el momento"
  },
  { 
    id: 9, 
    nombre: "Juan Hernández", 
    hora: "10:15", 
    preview: "SÍ.", 
    estado: "Cerrado", 
    categoria: "cerrados",
    telefono: "5590123456",
    email: "juan@example.com",
    servicio: "Paquete Completo",
    fibra: true,
    microondas: false,
    interes: "Solicitud de baja",
    comentario: "Cliente dio de baja el servicio"
  }
];

// Datos de ejemplo para compañeros
const companeros = [
  { nombre: "Asesor 1", count: 1, filter: "asesor1" },
  { nombre: "Asesor 2", count: 1, filter: "asesor2" },
  { nombre: "Asesor 3", count: 2, filter: "asesor3" },
  { nombre: "Asesor 4", count: 0, filter: "asesor4" },
  { nombre: "Asesor 5", count: 1, filter: "asesor5" },
  { nombre: "FB Messenger Bot", count: 0, filter: "bot-messenger" },
  { nombre: "WhatsApp Bot", count: 0, filter: "bot-whatsapp" },
  { nombre: "Telegram Bot", count: 0, filter: "bot-telegram" }
];

// Filtrar contactos según el filtro y pestaña actual
function getCurrentContacts() {
  let filteredContacts = [...contactos];
  
  // Aplicar filtro por asesor
  if (currentFilter === 'asesor3') {
    filteredContacts = filteredContacts.filter(contacto => 
      contacto.estado === "Asesor 3"
    );
  } else if (currentFilter === 'asesor1') {
    filteredContacts = filteredContacts.filter(contacto => 
      contacto.estado === "Asesor 1"
    );
  } else if (currentFilter === 'asesor2') {
    filteredContacts = filteredContacts.filter(contacto => 
      contacto.estado === "Asesor 2"
    );
  } else if (currentFilter === 'asesor4') {
    filteredContacts = filteredContacts.filter(contacto => 
      contacto.estado === "Asesor 4"
    );
  } else if (currentFilter === 'asesor5') {
    filteredContacts = filteredContacts.filter(contacto => 
      contacto.estado === "Asesor 5"
    );
  } else if (currentFilter === 'sin-asignar') {
    filteredContacts = filteredContacts.filter(contacto => 
      contacto.estado === "Sin asignar"
    );
  } else if (currentFilter === 'todo') {
    // En "Todo" solo mostramos contactos activos con asesores (no cerrados, no agendados)
    filteredContacts = filteredContacts.filter(contacto => 
      contacto.estado.startsWith("Asesor") && 
      contacto.categoria !== "cerrados" && 
      contacto.categoria !== "agenda"
    );
  } else if (currentFilter.startsWith('bot')) {
    // Para bots, por ahora devolvemos array vacío
    filteredContacts = [];
  }
  
  // Aplicar filtro por pestaña (categoría)
  if (currentTab !== 'todo') {
    filteredContacts = filteredContacts.filter(contacto => 
      contacto.categoria === currentTab
    );
  }
  
  // Aplicar búsqueda
  if (searchQuery) {
    filteredContacts = filteredContacts.filter(contacto => 
      contacto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  return filteredContacts;
}

// Renderizar contactos según la pestaña activa
function renderContacts() {
  const contactList = document.getElementById('contact-list');
  const contacts = getCurrentContacts();
  
  if (contacts.length === 0) {
    contactList.innerHTML = `
      <div class="empty-state">
        <h3>¡Sin contactos!</h3>
        <p>Actualmente no hay contactos en esta sección.</p>
      </div>
    `;
    return;
  }
  
  // Ordenar contactos según el criterio seleccionado
  const sortedContacts = [...contacts].sort((a, b) => {
    if (sortOrder === 'newest') {
      return b.hora.localeCompare(a.hora);
    } else {
      return a.hora.localeCompare(b.hora);
    }
  });
  
  contactList.innerHTML = sortedContacts.map(contact => `
    <div class="contact-card ${contact.id === activeContactId ? 'active' : ''}" data-id="${contact.id}">
      <div class="contact-name">${contact.nombre}</div>
      <div class="contact-time">${contact.hora}</div>
      <div class="contact-preview">${contact.preview}</div>
      <div class="contact-status">
        <span class="status-badge">${contact.estado}</span>
      </div>
    </div>
  `).join('');
}
