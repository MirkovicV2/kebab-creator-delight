export interface VenueGalleryImage {
  src: string;
  alt: string;
  title: string;
  description: string;
  width: number;
  height: number;
}

const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const venueGalleryImages: VenueGalleryImage[] = [
  {
    src: withBase("/images/venue/venue-03.jpg"),
    alt: "Barra principal con zona de servicio",
    title: "Servicio a la vista",
    description: "La barra de servicio queda integrada en la sala para una atencion mas directa.",
    width: 2048,
    height: 1365,
  },
  {
    src: withBase("/images/venue/venue-05.jpg"),
    alt: "Barra con estanterias y tiradores",
    title: "Barra principal",
    description: "La zona de barra combina exposicion, servicio rapido y una imagen mas cuidada del local.",
    width: 2048,
    height: 1365,
  },
  {
    src: withBase("/images/venue/venue-06.jpg"),
    alt: "Comedor interior luminoso del local",
    title: "Sala luminosa",
    description: "Mesas preparadas para comer dentro con entrada de luz desde la fachada.",
    width: 2048,
    height: 1365,
  },
  {
    src: withBase("/images/venue/venue-08.jpg"),
    alt: "Vista general del comedor y la barra",
    title: "Vista general",
    description: "La sala principal conecta la zona de mesas con la barra en un solo recorrido visual.",
    width: 2048,
    height: 1365,
  },
  {
    src: withBase("/images/venue/venue-09.jpg"),
    alt: "Mesas del fondo con iluminacion mural",
    title: "Mesas del fondo",
    description: "Zona interior con iluminacion calida y varias mesas preparadas para grupos pequenos.",
    width: 2048,
    height: 1365,
  },
  {
    src: withBase("/images/venue/venue-10.jpg"),
    alt: "Sala interior con ventanal abierto",
    title: "Interior abierto",
    description: "Otra vista de la sala con el ventanal abierto y el comedor orientado hacia la calle.",
    width: 2048,
    height: 1365,
  },
];
