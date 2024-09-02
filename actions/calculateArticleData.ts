export const calculateArticleData = (article: any) => {
  let articleCalcule: any = {};

  if (article.quantite < 5) {
    articleCalcule.status = "Faible_Stock";
  }

  return articleCalcule;
};
