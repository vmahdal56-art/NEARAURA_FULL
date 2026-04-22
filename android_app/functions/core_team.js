// NearAura Core Team Initials
const CORE_TEAM = ["JV", "JM", "PM", "LA", "LH", "YM", "VM"];

exports.isCoreTeam = (initials) => {
    return CORE_TEAM.includes(initials?.toUpperCase());
};
