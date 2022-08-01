const { getPreferences } = require("../helpers/preferences.helpers");

const preferences = async (req, res) => {
  const pref = await getPreferences();
  res.json({
    preferences: pref
  });
};

module.exports = {
  preferences
};