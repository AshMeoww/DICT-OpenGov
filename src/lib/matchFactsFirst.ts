import factsData from "/src/app/api/data/factsfirstData.json";
import stringSimilarity from "string-similarity";


export function findSimilarFacts(claim: string) {
    const results = [];
  
    for (const fact of factsData) {
      const similarity = stringSimilarity.compareTwoStrings(
        claim.toLowerCase(),
        fact.title.toLowerCase()
      );
      if (similarity > 0.3) {
        results.push(fact);
      }
    }
  
    return results;
  }