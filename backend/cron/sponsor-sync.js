const axios = require('axios');
const { runSponsorUpdate } = require('../jobs/sponsor-fetch');

const syncSponsors = async () => {
  try {
    console.log('Starting scheduled sponsor sync...');
    await runSponsorUpdate();
    console.log('Scheduled sponsor sync completed successfully');
  } catch (error) {
    console.error('Scheduled sponsor sync failed:', error);
  }
};

// If this file is run directly (not imported), execute the sync
if (require.main === module) {
  syncSponsors();
}

module.exports = syncSponsors; 