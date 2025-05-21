// This file would contain functions to fetch and process data from open government sources
// For the hackathon prototype, we're using simulated data

type DataSource = {
  name: string;
  url: string;
  description: string;
};

// List of open government data sources that could be used for fact-checking
export const dataSources: DataSource[] = [
  {
    name: 'Philippine Open Data Portal',
    url: 'https://data.gov.ph',
    description: 'Official open data portal of the Philippine government with datasets from various agencies.'
  },
  {
    name: 'FOI Philippines Portal',
    url: 'https://www.foi.gov.ph',
    description: 'Freedom of Information portal providing access to government records and documents.'
  },
  {
    name: 'PSA (Philippine Statistics Authority)',
    url: 'https://psa.gov.ph',
    description: 'Official statistics on population, economy, and other national data.'
  },
  {
    name: 'DBM Transparency Portal',
    url: 'https://dbm.gov.ph/transparency',
    description: 'Budget allocation and spending information from the Department of Budget and Management.'
  },
  {
    name: 'FactsFirstPH Archive',
    url: 'https://www.rappler.com/facts-first',
    description: 'Archive of fact-checked claims and reports from the FactsFirstPH initiative.'
  },
  {
    name: 'CICC Scam Alerts',
    url: 'https://www.cicc.gov.ph',
    description: 'Cybercrime alerts and warnings from the Cybercrime Investigation and Coordinating Center.'
  },
  {
    name: 'OpenSTAT (by PSA)',
    url: 'https://openstat.psa.gov.ph',
    description: 'Statistical datasets in downloadable formats from the Philippine Statistics Authority.'
  }
];

// Function to find relevant data sources for a given claim
export function findRelevantSources(claim: string): DataSource[] {
  const lowerClaim = claim.toLowerCase();
  
  return dataSources.filter(source => {
    // Simple keyword matching for demo purposes
    // In a real implementation, this would use more sophisticated NLP techniques
    if (lowerClaim.includes('budget') && source.name.includes('DBM')) {
      return true;
    }
    if (lowerClaim.includes('population') && source.name.includes('PSA')) {
      return true;
    }
    if (lowerClaim.includes('scam') && source.name.includes('CICC')) {
      return true;
    }
    if (lowerClaim.includes('fact') && source.name.includes('FactsFirst')) {
      return true;
    }
    
    // Default fallback - include the general data portal
    return source.name.includes('Open Data Portal');
  });
}