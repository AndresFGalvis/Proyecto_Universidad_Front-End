$(document).ready(function() {
    // 1. Base de datos integrada con categorías para el filtrado
    const data = [
        { 
            "id": 1, 
            "nombre": "Desarrollo Web Pro", 
            "categoria": "programacion", 
            "descripcion": "Domina HTML5, CSS3 y JavaScript desde cero hasta nivel profesional.", 
            "imagen": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500" 
        },
        { 
            "id": 2, 
            "nombre": "Estrategias de IA", 
            "categoria": "ia", 
            "descripcion": "Aprende a implementar Inteligencia Artificial en tus negocios para el éxito.", 
            "imagen": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500" 
        },
        { 
            "id": 3, 
            "nombre": "Maestría en Python", 
            "categoria": "programacion", 
            "descripcion": "De cero a experto en Python para ciencia de datos y automatización.", 
            "imagen": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500" 
        }
    ];

    // 2. Función Maestra para mostrar cursos (Servicios)
    function mostrarCatalogo(lista) {
        const container = $('#contenedor-catalogo');
        if (container.length === 0) return;
        container.empty();
// Inyectar párrafo de bienvenida dinámicamente
if ($('#contenedor-catalogo').length && !$('#bienvenida-texto').length) {
    $('#contenedor-catalogo').before(`
        <div id="bienvenida-texto" class="container text-center mb-5 p-4 rounded-4" style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); color: white; border: 1px solid rgba(255,255,255,0.2);">
            <h2 class="fw-bold mb-3" style="color: #60a5fa;">EduCatalog: Domina las tecnologías del futuro hoy.</h2>
            <p class="lead mb-4">Especialízate en Desarrollo Web, Python e IA con metodologías ágiles y proyectos reales. En EduCatalog, transformamos la teoría del <strong>Politécnico Grancolombiano</strong> en habilidades técnicas competitivas para el mercado actual.</p>
            <p class="fst-italic">No esperes a graduarte para trabajar en lo que te apasiona. Empieza ahora, domina el lenguaje de la tecnología y construye el perfil profesional que las empresas están buscando.</p>
        </div>
    `);
}
        lista.forEach(item => {
            container.append(`
                <div class="col-md-4 mb-4">
                    <div class="card h-100 border-0 shadow-sm">
                        <img src="${item.imagen}" class="card-img-top" style="height: 200px; object-fit: cover;">
                        <div class="card-body d-flex flex-column p-4">
                            <span class="badge bg-light text-primary mb-2 align-self-start border border-primary">
                                ${item.categoria.toUpperCase()}
                            </span>
                            <h5 class="card-title fw-bold mb-3">${item.nombre}</h5>
                            <button class="btn btn-primary mt-auto" onclick="verDetalle(${item.id})">Inscribirme ahora</button>
                        </div>
                    </div>
                </div>
            `);
        });
        // Animación suave de aparición
        $('.card').hide().fadeIn(500);
    }

    // Inicialización del catálogo
    mostrarCatalogo(data);

    // 3. Lógica de Filtros (jQuery)
    $('.btn-filtro').click(function() {
        const cat = $(this).attr('data-filter');
        const filtrados = (cat === 'todos') ? data : data.filter(c => c.categoria === cat);
        mostrarCatalogo(filtrados);
    });

    // 4. Lógica de Detalle Dinámico (Pestaña detalle.html)
    if ($('#detalle-curso').length) {
        const id = localStorage.getItem("idSeleccionado");
        const curso = data.find(c => c.id == id);
        if(curso) {
            $('#detalle-curso').html(`
                <div class="card p-0 overflow-hidden shadow-lg border-0">
                    <img src="${curso.imagen}" class="img-fluid w-100" style="max-height: 400px; object-fit: cover;">
                    <div class="p-5">
                        <h1 class="display-5 fw-bold mb-4">${curso.nombre}</h1>
                        <p class="fs-5 text-muted mb-5">${curso.descripcion}</p>
                        <button class="btn btn-primary btn-lg px-5" onclick="guardarFavorito(${curso.id})">⭐ Guardar Favorito</button>
                    </div>
                </div>
            `);
        } else {
            $('#detalle-curso').html('<div class="alert alert-danger">No se encontró información del curso.</div>');
        }
    }

    // 5. Renderizar Favoritos (Pestaña favoritos.html)
    if ($('#contenedor-favoritos').length) {
        const favsGuardados = JSON.parse(localStorage.getItem("misFavoritos")) || [];
        const filtrados = data.filter(curso => favsGuardados.includes(curso.id));
        
        if (filtrados.length === 0) {
            $('#contenedor-favoritos').html('<div class="alert alert-info w-100 text-center">Aún no tienes cursos favoritos.</div>');
        } else {
            filtrados.forEach(f => {
                $('#contenedor-favoritos').append(`
                    <div class="col-md-4 mb-4">
                        <div class="card h-100 shadow-sm border-warning">
                            <div class="card-body">
                                <span class="badge bg-warning text-dark mb-2">${f.categoria.toUpperCase()}</span>
                                <h5 class="card-title fw-bold">${f.nombre}</h5>
                                <button class="btn btn-sm btn-outline-primary mt-3" onclick="verDetalle(${f.id})">Ver detalles de nuevo</button>
                            </div>
                        </div>
                    </div>
                `);
            });
        }
    }
});

// --- FUNCIONES GLOBALES (Deben estar fuera del ready) ---

function verDetalle(id) {
    localStorage.setItem("idSeleccionado", id);
    window.location.href = "detalle.html";
}

function guardarFavorito(id) {
    let favoritos = JSON.parse(localStorage.getItem("misFavoritos")) || [];
    if (!favoritos.includes(id)) {
        favoritos.push(id);
        localStorage.setItem("misFavoritos", JSON.stringify(favoritos));
        alert("¡Añadido a tus cursos favoritos! ⭐");
    } else {
        alert("Este curso ya está en tu lista de favoritos.");
    }
}

function validarContacto() {
    const nombre = $('#nombre').val().trim();
    const correo = $('#correo').val().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nombre === "" || correo === "") {
        alert("Por favor, completa todos los campos obligatorios.");
        return false;
    }

    if (!emailRegex.test(correo)) {
        alert("El formato del correo electrónico no es válido.");
        return false;
    }

    alert("✅ ¡Gracias " + nombre + "! Tu mensaje ha sido enviado correctamente.");
    return true;
}