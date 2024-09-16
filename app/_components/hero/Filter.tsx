"use client";

import { useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

interface FilterProps {
  filters: {
    min: string;
    max: string;
    category: string;
    sort: string;
  };
  onFilterChange: (name: string, value: string) => void;
}

const Filter = ({ filters, onFilterChange }: FilterProps) => {
  const searchParams = useSearchParams();

  const handleFilterChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <input
          type="text"
          name="min"
          placeholder="min price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          value={filters.min}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="max"
          placeholder="max price"
          className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400"
          value={filters.max}
          onChange={handleFilterChange}
        />
        <select
          name="category"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="">Category</option>
          <option value="outils">Outils</option>
          <option value="meubles">Meubles</option>
          <option value="jardin">Jardin</option>
          <option value="Electroménager">Électroménager</option>
          <option value="pour la maison">Pour la maison</option>
          <option value="jeux videos">Jeux vidéos</option>
          <option value="livre films et musique">
            Livre, films et musique
          </option>
          <option value="bijoux et accessoires">Bijoux et accessoires</option>
          <option value="sac et bagages">Sac et bagages</option>
          <option value="vetements et chaussures pour hommes">
            Vêtements et chaussures pour hommes
          </option>
          <option value="vetements et chaussures pour femmes">
            Vêtements et chaussures pour femmes
          </option>
          <option value="jouer et jeux">Jouets et jeux</option>
          <option value="puericulture et enfants">
            Puériculture et enfants
          </option>
          <option value="sante et beaute">Santé et beauté</option>
          <option value="telephones mobiles">Téléphones mobiles</option>
          <option value="electroniques et ordinateurs">
            Électroniques et ordinateurs
          </option>
          <option value="sports et activites exterieures">
            Sports et activités extérieures
          </option>
          <option value="instruments de musique">Instruments de musique</option>
          <option value="artisanat d'art">Artisanat d&apos;art</option>
          <option value="antiquites et objects de collection">
            Antiquités et objets de collection
          </option>
          <option value="pieces automobiles">Pièces automobiles</option>
          <option value="velos">Vélos</option>
          <option value="vide-grenier">Vide-grenier</option>
          <option value="divers">Divers</option>
        </select>
      </div>
      <div className="">
        <select
          name="sort"
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-white ring-1 ring-gray-400"
          value={filters.sort}
          onChange={handleFilterChange}
        >
          <option value="">Trier par</option>
          <option value="asc price">Prix (petit au grand)</option>
          <option value="desc price">Prix (grand au petit)</option>
          <option value="asc lastUpdated">Nouveau</option>
          <option value="desc lastUpdated">Ancien</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
