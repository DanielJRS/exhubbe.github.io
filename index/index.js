document.addEventListener('DOMContentLoaded', function() {
  const clanTag = '%232GGQL0L2G'; // Tag do clã com # codificado como %23
  
  fetch(`http://localhost:3000/api/clan/${clanTag}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na resposta da rede');
      }
      return response.json();
    })
    .then(data => {
      console.log('Dados do clã:', data);
      // Aqui você pode atualizar sua interface com os dados
      updateClanInfo(data);
    })
    .catch(error => {
      console.error('Erro ao buscar dados do clã:', error);
    });
});

// Função para atualizar a interface com os dados do clã
function updateClanInfo(clanData) {
  // Exemplo de como atualizar elementos da sua página
  if (clanData) {
    // Atualizar nome do clã
    const clanNameElement = document.querySelector('.main-banner-titulo');
    if (clanNameElement) {
      clanNameElement.textContent = clanData.name;
    }

    // Atualizar insígnia do clã
    const clanBadgeElement = document.querySelector('.header-barra-logo-img-1');
    if (clanBadgeElement && clanData.badgeUrls) {
      clanBadgeElement.src = clanData.badgeUrls.medium;
    }

    const bannerCla = window.document.querySelector('.main-container-intermediario-bloco-conteudo-bloco2-b1-img');
      bannerCla.src = clanData.badgeUrls.medium;

    const guerraClaV = window.document.querySelector('.main-container-intermediario-bloco-conteudo-bloco2-b2-vitoria');
    guerraClaV.textContent = clanData.warWins;

    const guerraClaE = window.document.querySelector('.main-container-intermediario-bloco-conteudo-bloco2-b2-empate');
    guerraClaE.textContent = clanData.warTies;

    const guerraClaD = window.document.querySelector('.main-container-intermediario-bloco-conteudo-bloco2-b2-derrota');
    guerraClaD.textContent = clanData.warLosses;
  }
}