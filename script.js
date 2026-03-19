const form = document.getElementById("form");
const tabla = document.getElementById("tabla-pelis");
const filtroGenero = document.getElementById("filtro-genero");
const buscador = document.getElementById("buscar");
const errorMessages = document.getElementById("errorMessages");

let peliculas = [
  {
    titulo: "Titanic",
    anio: "1997",
    descripcion:
      "La trama sigue a Rose, una joven de clase alta, y Jack, un artista pobre, quienes se enamoran a bordo del barco durante su viaje inaugural, enfrentando diferencias sociales y la inminente tragedia tras chocar con un iceberg",
    imagen: "https://cdng.europosters.eu/pod_public/1300/266355.jpg",
    genero: "romantica",
  },
  {
    titulo: "It",
    anio: "1990",
    descripcion:
      "En el pueblo de Derry, un grupo de siete niños marginados enfrenta a una entidad sobrenatural que cambia de forma, generalmente un payaso llamado Pennywise, que asesina niños. Tras un primer enfrentamiento, regresan 30 años después para combatir al monstruo nuevamente.",
    imagen: "https://static.posters.cz/image/750/56481.jpg",
    genero: "terror",
  },
  {
    titulo: "Blade Runner",
    anio: "1982",
    descripcion:
      "La película sigue a Rick Deckard, un policía retirado obligado a volver al servicio para cazar a un grupo de replicantes, androides peligrosamente avanzados que buscan extender sus vidas.",
    imagen: "https://pics.filmaffinity.com/blade_runner-351607743-mmed.jpg",
    genero: "accion",
  },
  {
    titulo: "Agárralo como puedas",
    anio: "1982",
    descripcion:
      "El torpe teniente Frank Drebin, intenta resolver casos criminales provocando desastres constantes, bromas visuales y juegos de palabras. ",
    imagen:
      "https://es.web.img3.acsta.net/c_310_420/pictures/210/018/21001827_2013042620124249.jpg",
    genero: "comedia",
  },
  {
    titulo: "Antes de ti",
    anio: "2016",
    descripcion:
      "Louisa una chica inestable y creativa, vive sin rumbo y va de un trabajo a otro para ayudar a su familia a llegar a fin de mes. Sin embargo, un nuevo trabajo pondrá a prueba su habitual alegría. ",
    imagen:
      "https://es.web.img2.acsta.net/c_310_420/pictures/16/02/04/15/49/599815.jpg",
    genero: "romantica",
  },
  {
    titulo: "Weapons",
    anio: "2025",
    descripcion:
      "Cuando todos los niños de una clase se desvanecen misteriosamente, la misma noche y exactamente a la misma hora, toda una comunidad se pregunta quién o qué ha provocado esta desaparición.",
    imagen: "https://m.media-amazon.com/images/I/8115MZpSAZL._AC_SY500_.jpg",
    genero: "terror",
  },
];

//Validación formulario:

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const titulo = event.target.titulo.value;
  const anio = event.target.anio.value;
  const descripcion = event.target.descripcion.value;
  const imagen = event.target.urlFoto.value;
  const genero = event.target.genero.value;

  let mensajesError = "";

  const tituloRegex = /^.{2,100}$/;
  if (!tituloRegex.test(titulo)) {
    mensajesError += "Introduce un título con al menos 2 caracteres\n";
  }

  const anioNumero = Number(anio);
  const anioActual = new Date().getFullYear();

  if (!/^\d+$/.test(anio) || anioNumero < 1800 || anioNumero > anioActual) {
    mensajesError += "Introduce un año válido entre 1800 y el actual\n";
  }

  const descripcionRegex = /^.{5,400}$/;
  if (!descripcionRegex.test(descripcion)) {
    mensajesError += "Introduce una descripción de entre 5 y 400 caracteres\n";
  }

  const imgRegex = /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i;
  if (!imgRegex.test(imagen)) {
    mensajesError += "Introduce una URL válida de imagen\n";
  }

  if (genero === "") {
    mensajesError += "Selecciona un género\n";
  }

  if (mensajesError) {
    errorMessages.innerHTML = `<pre class="errorMessage">${mensajesError}</pre>`;
    return;
  }

  const pelicula = {
    titulo,
    anio,
    descripcion,
    imagen,
    genero,
  };
  peliculas.push(pelicula);
  errorMessages.innerHTML = `<p>Película añadida</p>`;
  mostrarPelicula(peliculas);
  form.reset();
});

//Mostrar pelicula:

function mostrarPelicula(lista) {
  tabla.innerHTML = "";

  lista.forEach((pelicula, index) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
            <td>${pelicula.titulo}</td>
            <td>${pelicula.anio}</td>
            <td>${pelicula.descripcion}</td>
            <td><img src="${pelicula.imagen}" alt="Imagen de película"></td>
            <td>${pelicula.genero}</td>
            <td class="acciones">
            <button type="button" class="btn-editar">Editar</button>
            <button type="button" class="btn-eliminar">Eliminar</button>
            </td>
        `;
    //Boton Eliminar
    const botonEliminar = fila.querySelector(".btn-eliminar");

    botonEliminar.addEventListener("click", () => {
      peliculas.splice(index, 1);
      filtrarPeliculas();
    });
    //Boton Editar tabla
    fila.querySelector(".btn-editar").addEventListener("click", () => {
      fila.innerHTML = `
                <td><input type="text" value="${pelicula.titulo}" class="edit-titulo"></td>
                <td><input type="number" value="${pelicula.anio}" class="edit-anio"></td>
                <td><textarea class="edit-descripcion">${pelicula.descripcion}</textarea></td>
                <td><input type="text" value="${pelicula.imagen}" class="edit-imagen"></td>
                <td>
                    <select class="edit-genero">
                        <option value="accion" ${pelicula.genero === "accion" ? "selected" : ""}>Acción</option>
                        <option value="terror" ${pelicula.genero === "terror" ? "selected" : ""}>Terror</option>
                        <option value="comedia" ${pelicula.genero === "comedia" ? "selected" : ""}>Comedia</option>
                        <option value="romantica" ${pelicula.genero === "romantica" ? "selected" : ""}>Romántica</option>
                    </select>
                </td>
                <td>
                    <button class="btn-guardar">Guardar</button>
                </td>
            `;
      //Guardar edicion

      fila.querySelector(".btn-guardar").addEventListener("click", () => {
        peliculas[index] = {
          titulo: fila.querySelector(".edit-titulo").value,
          anio: fila.querySelector(".edit-anio").value,
          descripcion: fila.querySelector(".edit-descripcion").value,
          imagen: fila.querySelector(".edit-imagen").value,
          genero: fila.querySelector(".edit-genero").value,
        };

        mostrarPelicula(peliculas);
      });
    });

    tabla.appendChild(fila);
  });
}

//filtrar peliculas:

function filtrarPeliculas() {
  const generoselect = filtroGenero.value;
  const textoBuscador = buscador.value;

  let pelisFiltradas = peliculas;
  if (generoselect !== "todasPelis") {
    pelisFiltradas = pelisFiltradas.filter((pelicula) => {
      return pelicula.genero === generoselect; //devuelve genero de pelicula igual al genero select
    });
  }
  if (textoBuscador !== "") {
    pelisFiltradas = pelisFiltradas.filter((pelicula) => {
      return pelicula.titulo.toLowerCase().includes(textoBuscador.toLowerCase());
    });
  }
  mostrarPelicula(pelisFiltradas);
}

filtroGenero.addEventListener("change", filtrarPeliculas);
buscador.addEventListener("input", filtrarPeliculas);

mostrarPelicula(peliculas);
