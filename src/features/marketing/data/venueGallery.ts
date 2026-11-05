const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const venueGalleryImages = [
  {
    src: withBase("/images/venue/venue-03.webp"),
    alt: "Barra principal con zona de servicio",
    title: "Servicio a la vista",
    description: "La barra de servicio queda integrada en la sala para una atencion mas directa.",
  },
  {
    src: withBase("/images/venue/venue-05.webp"),
    alt: "Barra con estanterias y tiradores",
    title: "Barra principal",
    description: "La zona de barra combina exposicion, servicio rapido y una imagen mas cuidada del local.",
  },
  {
    src: withBase("/images/venue/venue-06.webp"),
    alt: "Comedor interior luminoso del local",
    title: "Sala luminosa",
    description: "Mesas preparadas para comer dentro con entrada de luz desde la fachada.",
  },
  {
    src: withBase("/images/venue/venue-08.webp"),
    alt: "Vista general del comedor y la barra",
    title: "Vista general",
    description: "La sala principal conecta la zona de mesas con la barra en un solo recorrido visual.",
  },
  {
    src: withBase("/images/venue/venue-09.webp"),
    alt: "Mesas del fondo con iluminacion mural",
    title: "Mesas del fondo",
    description: "Zona interior con iluminacion calida y varias mesas preparadas para grupos pequenos.",
  },
  {
    src: withBase("/images/venue/venue-10.webp"),
    alt: "Sala interior con ventanal abierto",
    title: "Interior abierto",
    description: "Otra vista de la sala con el ventanal abierto y el comedor orientado hacia la calle.",
  },
].map((image) => ({ ...image, width: 1600, height: 1066 }));
