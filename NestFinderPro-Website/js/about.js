// NestFinder Pro — About Us page

document.addEventListener('DOMContentLoaded', () => {
  const teamGrid = document.getElementById('teamGrid');
  if (teamGrid) {
    teamGrid.innerHTML = AGENTS.map((agent) => `
      <a href="agent-profile.html?id=${agent.id}" class="team-card">
        <img src="${agent.photo}" alt="${agent.name}">
        <h3>${agent.name}</h3>
        <span class="team-title">${agent.title}</span>
      </a>
    `).join('');
  }
});
