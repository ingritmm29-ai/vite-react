// Variables de estado global
let currentTab = 'abiertos';
let sortOrder = 'newest';
let activeContactId = 1;
let currentFilter = 'asesor3';
let searchQuery = '';
let currentProfileData = {};

// Inicializar la aplicación
function init() {
  updateCounters();
  renderContacts();
  setupEventListeners();
  updateConversationDate();
}

// Actualizar contadores
function updateCounters() {
  // Contador para "Tú" (Asesor 3)
  const myCount = contactos.filter(contacto => 
    contacto.estado === "Asesor 3" && contacto.categoria !== "cerrados"
  ).length;
  document.getElementById('my-count').textContent = myCount;

  // Contador para "Sin asignar"
  const unassignedCount = contactos.filter(contacto => 
    contacto.estado === "Sin asignar" && contacto.categoria !== "cerrados"
  ).length;
  document.getElementById('unassigned-count').textContent = unassignedCount;

  // Contador para "Todo" - solo contactos activos con asesores (no cerrados, no agendados, no bots)
  const allCount = contactos.filter(contacto => 
    contacto.estado.startsWith("Asesor") && 
    contacto.categoria !== "cerrados" && 
    contacto.categoria !== "agenda"
  ).length;
  document.getElementById('all-count').textContent = allCount;
}

// Configurar event listeners
function setupEventListeners() {
  // Tabs de contactos
  document.querySelectorAll('.contact-tab').forEach(tab => {
    tab.addEventListener('click', function() {
      document.querySelectorAll('.contact-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      currentTab = this.getAttribute('data-tab');
      renderContacts();
    });
  });

  // Filtros de bandeja
  document.querySelectorAll('.stat-item').forEach(item => {
    item.addEventListener('click', function() {
      document.querySelectorAll('.stat-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      currentFilter = this.getAttribute('data-filter');
      updateContactsTitle();
      renderContacts();
    });
  });

  // Filtros de compañeros
  document.querySelectorAll('.companero-item').forEach(item => {
    item.addEventListener('click', function() {
      currentFilter = this.getAttribute('data-filter');
      updateContactsTitle();
      renderContacts();
    });
  });

  // Ordenamiento
  document.getElementById('sort-option').addEventListener('click', function() {
    sortOrder = sortOrder === 'newest' ? 'oldest' : 'newest';
    this.querySelector('span:first-child').textContent = sortOrder === 'newest' ? 'Más nuevos' : 'Más antiguos';
    renderContacts();
  });

  // Búsqueda de compañeros
  document.getElementById('search-companeros').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const companerosList = document.getElementById('companeros-list');
    
    const filteredCompaneros = companeros.filter(companero => 
      companero.nombre.toLowerCase().includes(searchTerm)
    );
    
    companerosList.innerHTML = filteredCompaneros.map(companero => `
      <div class="companero-item" data-filter="${companero.filter}">
        <span class="companero-name">${companero.nombre}</span>
        <span class="companero-count">${companero.count}</span>
      </div>
    `).join('');
    
    // Reasignar event listeners después de actualizar la lista
    document.querySelectorAll('.companero-item').forEach(item => {
      item.addEventListener('click', function() {
        currentFilter = this.getAttribute('data-filter');
        updateContactsTitle();
        renderContacts();
      });
    });
  });

  // Búsqueda de clientes
  document.getElementById('search-clients').addEventListener('input', function(e) {
    searchQuery = e.target.value;
    renderContacts();
  });

  // Selección de contacto
  document.getElementById('contact-list').addEventListener('click', function(e) {
    const contactCard = e.target.closest('.contact-card');
    if (contactCard) {
      const contactId = parseInt(contactCard.getAttribute('data-id'));
      activeContactId = contactId;
      renderContacts();
      updateChatHeader(contactId);
      updateConversationDate();
      updateChatMessages();
    }
  });

  // Menú desplegable
  document.querySelector('.menu-button').addEventListener('click', function(e) {
    e.stopPropagation();
    const menu = document.querySelector('.dropdown-menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function() {
    document.querySelector('.dropdown-menu').style.display = 'none';
  });

  // Prevenir que el clic en el menú lo cierre
  document.querySelector('.dropdown-menu').addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // Ver perfil
  document.getElementById('view-profile').addEventListener('click', function(e) {
    e.preventDefault();
    showProfileModal();
  });

  // Cerrar chat
  document.getElementById('close-chat').addEventListener('click', function(e) {
    e.preventDefault();
    closeActiveChat();
  });

  // Modal de perfil
  document.getElementById('close-profile').addEventListener('click', function() {
    closeProfileModal();
  });

  document.getElementById('cancel-profile').addEventListener('click', function() {
    closeProfileModal();
  });

  document.getElementById('save-profile').addEventListener('click', function() {
    saveProfile();
  });

  // Cerrar modal al hacer clic fuera
  document.getElementById('profile-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeProfileModal();
    }
  });

  // Envío de mensajes
  document.getElementById('message-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('message-input');
    const text = input.value.trim();
    if (text) {
      addMessage(text, "user");
      input.value = "";
      
      // Procesar opciones del menú
      if (text === '1') {
        setTimeout(() => {
          addMessage("Has seleccionado: Reportar mi servicio. Por favor, describe el problema que estás experimentando.", "bot");
        }, 1000);
      } else if (text === '2') {
        setTimeout(() => {
          addMessage("Has seleccionado: Registrar pago. Por favor, proporciona el número de transacción.", "bot");
        }, 1000);
      } else if (text === '3') {
        setTimeout(() => {
          addMessage("Has seleccionado: Contratar servicio de internet. Te conectaremos con un asesor especializado.", "bot");
        }, 1000);
      } else {
        setTimeout(() => {
          addMessage("Mensaje recibido. ¿En qué más puedo ayudarte?", "bot");
        }, 1000);
      }
    }
  });
}

// Actualizar título del panel de contactos
function updateContactsTitle() {
  let title = "Asesor 3"; // Valor por defecto
  
  if (currentFilter === 'asesor3') {
    title = "Asesor 3";
  } else if (currentFilter === 'asesor1') {
    title = "Asesor 1";
  } else if (currentFilter === 'asesor2') {
    title = "Asesor 2";
  } else if (currentFilter === 'asesor4') {
    title = "Asesor 4";
  } else if (currentFilter === 'asesor5') {
    title = "Asesor 5";
  } else if (currentFilter === 'sin-asignar') {
    title = "Sin asignar";
  } else if (currentFilter === 'todo') {
    title = "Todo";
  } else if (currentFilter === 'bot-messenger') {
    title = "FB Messenger Bot";
  } else if (currentFilter === 'bot-whatsapp') {
    title = "WhatsApp Bot";
  } else if (currentFilter === 'bot-telegram') {
    title = "Telegram Bot";
  }
  
  document.getElementById('contacts-title').textContent = title;
}

// Actualizar encabezado del chat
function updateChatHeader(contactId) {
  const contacto = contactos.find(c => c.id === contactId);
  const contactName = contacto ? contacto.nombre : "Ingrit Magdaleno";
  
  document.getElementById('chat-contact-name').textContent = contactName;
}

// Actualizar fecha de conversación
function updateConversationDate() {
  const contacto = contactos.find(c => c.id === activeContactId);
  const fecha = contacto && contacto.fecha ? contacto.fecha : "30 Nov, 2023";
  
  document.getElementById('conversation-date').textContent = fecha;
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', init);
