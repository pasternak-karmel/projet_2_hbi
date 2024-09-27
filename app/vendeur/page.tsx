import { db } from "@/lib/db";

interface SearchPageProps {
  searchParams: {
    name?: string;
    userName?: string;
    categoryName?: string;
  };
}

const Vendeur = async ({ searchParams }: SearchPageProps) => {
  const { name, userName, categoryName } = searchParams;

  const articles = await db.article.findMany({
    where: {
      AND: [
        name ? { nom: { contains: name } } : {},
        userName ? { User: { name: { contains: userName } } } : {},
        categoryName ? { categories: { nom: { contains: categoryName } } } : {},
      ],
    },
    include: {
      User: true,
      categories: true,
    },
  });

  return (
    <div>
      <h1>Search Results</h1>
      {articles.length > 0 ? (
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              {article.nom} by {article.User.name} in {article.categories.nom}
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Vendeur;
