let allCards = [];

async function loadCards() {
  try {
    const response = await fetch('./data/cards.json');
    if (!response.ok) {
      throw new Error('Failed to load cards.json');
    }

    const cards = await response.json();
    allCards = cards;
    renderCards(cards);
  } catch (error) {
    console.error(error);
    document.getElementById('cards').innerHTML =
      '<p class="empty-state">Failed to load cards.</p>';
  }
}

function renderCards(cards) {
  const cardsContainer = document.getElementById('cards');
  const emptyState = document.getElementById('emptyState');

  if (!cards.length) {
    cardsContainer.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  cardsContainer.innerHTML = cards.map(card => `
    <article class="card">
      <img src="${card.image}" alt="${card.name}" />
      <div class="card-content">
        <div class="card-id">${card.id}</div>
        <h3>${card.name}</h3>
        <div class="card-category">${card.category}</div>
        <p>${card.description}</p>
        <div class="card-actions">
          <span>${card.priceRange}</span>
          <a href="${card.whatsappLink}" target="_blank" rel="noopener noreferrer">Enquire</a>
        </div>
      </div>
    </article>
  `).join('');
}

function setupSearch() {
  const searchInput = document.getElementById('searchInput');

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.trim().toLowerCase();

    const filtered = allCards.filter(card =>
      card.name.toLowerCase().includes(term) ||
      card.category.toLowerCase().includes(term) ||
      card.id.toLowerCase().includes(term)
    );

    renderCards(filtered);
  });
}

loadCards();
setupSearch();