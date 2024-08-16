export interface CategoriesProps {
  id: any;
  name: string;
  image: string;
}

export interface ProduitProps {
  id: any;
  nom: string;
  description?: string;
  usage: boolean;
  prix: number;
  image: string;
  categories: string;
}

export const categoriesItems: CategoriesProps[] = [
  {
    id: 1,
    name: "iphone",
    image: "/iphone.png",
  },
  {
    id: 2,
    name: "Montre",
    image: "/montre.png",
  },
  {
    id: "objfv68",
    name: "Sac",
    image: "/sac.png",
  },
];

export const produitItems: ProduitProps[] = [
  {
    id: 1,
    nom: "iphone",
    image: "/iphone.png",
    description: "iPhone",
    usage: true,
    prix: 0,
    categories: "habit",
  },
  {
    id: 2,
    nom: "Montre",
    image: "/montre.png",
    description: "iPhone",
    usage: false,
    prix: 0,
    categories: "habit",
  },
  {
    id: "objfv68",
    nom: "Sac",
    image: "/sac.png",
    description: "iPhone",
    usage: false,
    prix: 0,
    categories: "habit",
  },
  {
    id: 3,
    nom: "Montre",
    image: "/montre.png",
    description: "iPhone",
    usage: true,
    prix: 0,
    categories: "habit",
  },
  {
    id: "rerf",
    nom: "Sac",
    image: "/sac.png",
    description: "iPhone",
    usage: false,
    prix: 0,
    categories: "habit",
  },
  {
    id: "zrfze",
    nom: "Sac",
    image: "/sac.png",
    description: "iPhone",
    usage: true,
    prix: 0,
    categories: "habit",
  },
  {
    id: "ryh",
    nom: "Sac",
    image: "/sac.png",
    description: "iPhone",
    usage: false,
    prix: 0,
    categories: "habit",
  },
  {
    id: "ryhdetgz",
    nom: "Sac",
    image: "/image.jpeg",
    description: "iPhone",
    usage: false,
    prix: 0,
    categories: "habit",
  },
  {
    id: "uoilk",
    nom: "Sac",
    image: "/sac.png",
    description: "iPhone",
    usage: true,
    prix: 0,
    categories: "habit",
  },
  {
    id: "asqeft",
    nom: "Sac",
    image: "/image.jpeg",
    description: "iPhone",
    usage: false,
    prix: 0,
    categories: "habit",
  },
  {
    id: "ttge",
    nom: "Sac",
    image: "/sac2.png",
    description: "Mon sac est encore neuf et encore disponible en emballage ",
    usage: false,
    prix: 0,
    categories: "habit",
  },
  {
    id: "osfjkqw",
    nom: "Sac",
    image: "/sac1.png",
    description: "iPhone",
    usage: false,
    prix: 0,
    categories: "habit",
  },
];

export const berengerproduit: ProduitProps[] = [
  {
    id: 1,
    nom: "iphone",
    image: "/iphone.png",
    description: "iPhone",
    usage: true,
    prix: 0,
    categories: "habit",
  },
  {
    id: 2,
    nom: "Montre",
    image: "/montre.png",
    description: "iPhone",
    usage: false,
    prix: 0,
    categories: "habit",
  },
  {
    id: "objfv68",
    nom: "Sac",
    image: "/sac.png",
    description: "iPhone",
    usage: false,
    prix: 0,
    categories: "habit",
  },
  {
    id: 3,
    nom: "Montre",
    image: "/montre.png",
    description: "iPhone",
    usage: true,
    prix: 0,
    categories: "habit",
  }];
