// Elementos principais
const menuItems = document.querySelectorAll('.menu-item');
const pages = document.querySelectorAll('.page');
const userTitle = document.getElementById('userTitle');
const openLoginBtn = document.getElementById('openLoginBtn');
const userModal = document.getElementById('userModal');
const closeUserModal = document.getElementById('closeUserModal');
const authForm = document.getElementById('authForm');
const authEmail = document.getElementById('authEmail');
const authName = document.getElementById('authName');
const authPassword = document.getElementById('authPassword');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const authHint = document.getElementById('authHint');

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const conditionFilter = document.getElementById('conditionFilter');
const minPrice = document.getElementById('minPrice');
const maxPrice = document.getElementById('maxPrice');
const clearFilters = document.getElementById('clearFilters');

const lists = {
    promoList: document.getElementById('promoList'),
    trendingList: document.getElementById('trendingList'),
    recentList: document.getElementById('recentList'),
    catalogList: document.getElementById('catalogList'),
    newList: document.getElementById('newList'),
    usedList: document.getElementById('usedList'),
    allPromoList: document.getElementById('allPromoList'),
    myListings: document.getElementById('myListings'),
    favoritesList: document.getElementById('favoritesList'),
    cartList: document.getElementById('cartList'),
    messageList: document.getElementById('messageList'),
};

const bookModal = document.getElementById('bookModal');
const closeBookModal = document.getElementById('closeBookModal');
const modalBookDetail = document.querySelector('.modal-book-detail');
const listingModal = document.getElementById('listingModal');
const closeListingModal = document.getElementById('closeListingModal');
const openCreateListing = document.getElementById('openCreateListing');
const listingForm = document.getElementById('listingForm');

const cartTotalEl = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutModal = document.getElementById('closeCheckoutModal');
const checkoutSummary = document.getElementById('checkoutSummary');
const confirmCheckout = document.getElementById('confirmCheckout');

const msgStatus = document.getElementById('messageStatus');

const darkModeToggle = document.getElementById('darkModeToggle');

// Estado
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let messages = JSON.parse(localStorage.getItem('messages')) || [];

const books = JSON.parse(localStorage.getItem('books')) || [
    {
        id: generateId(),
        title: 'Cem Anos de Solidão',
        author: 'Gabriel García Márquez',
        category: 'Clássicos',
        description: 'O romance maravilhoso de Macondo reunindo gerações dos Buendía.',
        price: 89.90,
        condition: 'Usado',
        seller: 'Antiga Livraria',
        image: 'https://i.imgur.com/1aRkMUp.jpg',
        rating: 4.9,
        isPromo: true,
        createdAt: Date.now() - 86400000 * 3,
    },
    {
        id: generateId(),
        title: '1984',
        author: 'George Orwell',
        category: 'Ficção',
        description: 'Um clássico distópico sobre vigilância e totalitarismo.',
        price: 45.50,
        condition: 'Novo',
        seller: 'Sebastião Santos',
        image: 'https://i.imgur.com/L8W4P8A.jpg',
        rating: 4.7,
        isPromo: false,
        createdAt: Date.now() - 86400000 * 6,
    },
    {
        id: generateId(),
        title: 'Algoritmos em Python',
        author: 'Pedro Paulo',
        category: 'Tecnologia',
        description: 'Guia prático com exemplos e explicações passo a passo.',
        price: 109.0,
        condition: 'Novo',
        seller: 'Alice Martins',
        image: 'https://i.imgur.com/5W4fKQy.jpg',
        rating: 4.1,
        isPromo: true,
        createdAt: Date.now() - 86400000 * 1,
    },
    {
        id: generateId(),
        title: 'O Senhor dos Anéis',
        author: 'J.R.R. Tolkien',
        category: 'Fantasia',
        description: 'Epopéia fantástica em um mundo antigo, com viagem e batalhas.',
        price: 129.9,
        condition: 'Usado',
        seller: 'Livros do Porto',
        image: 'https://i.imgur.com/q8tqv8r.jpg',
        rating: 4.8,
        isPromo: false,
        createdAt: Date.now() - 86400000 * 10,
    },
    {
        id: generateId(),
        title: 'O Pequeno Príncipe',
        author: 'Antoine de Saint-Exupéry',
        category: 'Infantil',
        description: 'História poética e reflexiva sobre amizade e inocência.',
        price: 32.0,
        condition: 'Novo',
        seller: 'Clara Carvalho',
        image: 'https://i.imgur.com/5a2hKj3.jpg',
        rating: 4.6,
        isPromo: true,
        createdAt: Date.now() - 86400000 * 2,
    },
];

const listingFormInputs = {
    listingTitle: document.getElementById('listingTitle'),
    listingAuthor: document.getElementById('listingAuthor'),
    listingCategory: document.getElementById('listingCategory'),
    listingDescription: document.getElementById('listingDescription'),
    listingCondition: document.getElementById('listingCondition'),
    listingPrice: document.getElementById('listingPrice'),
    listingImage: document.getElementById('listingImage'),
};

const state = { authMode: 'login', activePage: 'homePage' };

// Armazenar local
function saveAppState() {
    localStorage.setItem('books', JSON.stringify(books));
    localStorage.setItem('favorites', JSON.stringify(favorites));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('messages', JSON.stringify(messages));
}

function generateId() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function updateUserUI() {
    if (currentUser) {
        userTitle.textContent = `Olá, ${currentUser.name}`;
        openLoginBtn.textContent = 'Sair';
    } else {
        userTitle.textContent = 'Visitante';
        openLoginBtn.textContent = 'Login / Cadastro';
    }
}

function changePage(page) {
    pages.forEach(p => p.classList.toggle('active', p.id === page));
    menuItems.forEach(item => item.classList.toggle('active', item.dataset.page === page));
    state.activePage = page;
}

function getFilteredBooks(list = books) {
    const search = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const condition = conditionFilter.value;
    const min = parseFloat(minPrice.value) || 0;
    const max = parseFloat(maxPrice.value) || Number.MAX_VALUE;

    return list.filter(book => {
        const matchesSearch = !search || `${book.title} ${book.author}`.toLowerCase().includes(search);
        const matchesCategory = category === 'all' || book.category === category;
        const matchesCondition = condition === 'all' || book.condition === condition;
        const matchesPrice = book.price >= min && book.price <= max;
        return matchesSearch && matchesCategory && matchesCondition && matchesPrice;
    });
}

function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    let stars = '★'.repeat(fullStars);
    if (halfStar) stars += '½';
    stars = stars.padEnd(5, '☆');
    return stars;
}

function createBookCard(book) {
    const li = document.createElement('li');
    li.className = 'book-card';
    li.innerHTML = `
        <img src="${book.image}" alt="Capa de ${book.title}" onerror="this.src='https://i.imgur.com/1Qx0vVP.png'" />
        <div class="book-info">
            <h4>${book.title}</h4>
            <span class="meta">${book.author} • ${book.category} • ${book.condition}</span>
            <span class="meta">Vendedor: ${book.seller}</span>
            <span class="price">R$ ${book.price.toFixed(2)}</span>
            <span class="rating">${createStarRating(book.rating)} (${book.rating.toFixed(1)})</span>
            <p>${book.description.substring(0, 90)}...</p>
            <div class="book-actions">
                <button class="btn details-btn" data-id="${book.id}">Detalhes</button>
                <button class="small-btn add-fav" data-id="${book.id}">${favorites.includes(book.id) ? '♥ Remover' : '♡ Favoritar'}</button>
                <button class="small-btn add-cart" data-id="${book.id}">🛒 Carrinho</button>
            </div>
        </div>
    `;
    return li;
}

function renderBookList(keys, list) {
    const container = lists[keys];
    container.innerHTML = '';
    if (list.length === 0) {
        container.innerHTML = '<li>Nenhum item encontrado.</li>';
        return;
    }
    list.forEach(book => container.appendChild(createBookCard(book)));
}

function renderAll() {
    const now = Date.now();
    const promoBooks = books.filter(b => b.isPromo);
    const trendingBooks = [...books].sort((a,b)=>b.rating-a.rating).slice(0, 6);
    const recentBooks = [...books].sort((a,b)=>b.createdAt-b.createdAt).slice(0, 6); // bug fix: sort should be b.createdAt - a.createdAt
    const recent = [...books].sort((a,b)=>b.createdAt - a.createdAt).slice(0, 6);
    renderBookList('promoList', promoBooks.slice(0, 6));
    renderBookList('trendingList', trendingBooks);
    renderBookList('recentList', recent);
    renderBookList('allPromoList', promoBooks);
    renderBookList('newList', books.filter(b => b.condition === 'Novo'));
    renderBookList('usedList', books.filter(b => b.condition === 'Usado'));

    const filtered = getFilteredBooks();
    renderBookList('catalogList', filtered);

    renderBookList('myListings', currentUser ? books.filter(b => b.seller === currentUser.name) : []);
    renderBookList('favoritesList', books.filter(b => favorites.includes(b.id)));
    renderCart();
    renderMessages();
    renderCategoryOptions();
}

function renderCategoryOptions() {
    const categories = Array.from(new Set(books.map(b => b.category)));
    categoryFilter.innerHTML = '<option value="all">Categoria: Todos</option>' + categories.map(c => `<option value="${c}">${c}</option>`).join('');
}

function renderCart() {
    lists.cartList.innerHTML = '';
    if (cart.length === 0) {
        lists.cartList.innerHTML = '<li>Seu carrinho está vazio.</li>';
        cartTotalEl.textContent = '0.00';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const book = books.find(b => b.id === item.bookId);
        if (!book) return;
        const li = document.createElement('li');
        li.className = 'cart-item';
        const sub = book.price * item.qty;
        total += sub;
        li.innerHTML = `
            <strong>${book.title}</strong>
            <span>${book.author}</span>
            <span>R$ ${book.price.toFixed(2)} x ${item.qty} = R$ ${sub.toFixed(2)}</span>
            <div class="book-actions">
                <button class="small-btn" data-id="${book.id}" data-action="remove">-</button>
                <button class="small-btn" data-id="${book.id}" data-action="add">+</button>
                <button class="small-btn" data-id="${book.id}" data-action="delete">Remover</button>
            </div>
        `;
        lists.cartList.appendChild(li);
    });
    cartTotalEl.textContent = total.toFixed(2);
}

function renderMessages() {
    lists.messageList.innerHTML = '';
    if (!currentUser) {
        msgStatus.textContent = 'Faça login para enviar e receber mensagens.';
        return;
    }
    const userMessages = messages.filter(m => m.to === currentUser.email || m.from === currentUser.email);
    msgStatus.textContent = userMessages.length ? 'Suas mensagens registradas:' : 'Sem mensagens ainda. Interaja na página de detalhes do livro para enviar mensagens ao vendedor.';

    if (userMessages.length === 0) {
        lists.messageList.innerHTML = '<li>Nenhuma mensagem.</li>';
        return;
    }

    userMessages.forEach(msg => {
        const li = document.createElement('li');
        li.className = 'message-item';
        li.innerHTML = `<strong>${msg.from === currentUser.email ? 'Você' : msg.from} → ${msg.to}</strong><span>${msg.text}</span><small>${new Date(msg.date).toLocaleString()}</small>`;
        lists.messageList.appendChild(li);
    });
}

function openBookModal(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;
    modalBookDetail.innerHTML = `
        <div style="display:flex;gap:1rem;flex-wrap:wrap;">
            <img src="${book.image}" alt="${book.title}" style="width:180px;height:auto;border-radius:8px;border:1px solid #d1bfa8;" onerror="this.src='https://i.imgur.com/1Qx0vVP.png'" />
            <div>
                <h3>${book.title}</h3>
                <p><em>${book.author}</em></p>
                <p>${book.category} • ${book.condition}</p>
                <p>${createStarRating(book.rating)} (${book.rating.toFixed(1)})</p>
                <p>${book.description}</p>
                <p><strong>Vendedor:</strong> ${book.seller}</p>
                <p class="price">R$ ${book.price.toFixed(2)}</p>
                <div style="display:flex;gap:.6rem;flex-wrap:wrap;margin-top:.8rem;">
                    <button class="btn" id="modalCartBtn" data-id="${book.id}">Adicionar ao carrinho</button>
                    <button class="small-btn" id="modalFavBtn" data-id="${book.id}">${favorites.includes(book.id)?'♥ Remover':'♡ Favoritar'}</button>
                </div>
                <div style="margin-top:1rem;">
                    <textarea id="messageToSeller" placeholder="Mensagem ao vendedor" style="width:100%;padding:.6rem;border-radius:8px;border:1px solid #d7bda4;"></textarea>
                    <button class="small-btn" id="sendMessageBtn" data-seller="${book.seller}">Enviar mensagem</button>
                </div>
            </div>
        </div>
    `;
    bookModal.classList.add('open');

    document.getElementById('modalCartBtn').addEventListener('click', () => { addToCart(book.id); });
    document.getElementById('modalFavBtn').addEventListener('click', () => { toggleFavorite(book.id); });
    document.getElementById('sendMessageBtn').addEventListener('click', () => {
        const text = document.getElementById('messageToSeller').value.trim();
        if (!currentUser) {
            alert('Faça login para enviar mensagem.');
            return;
        }
        if (!text) { alert('Digite uma mensagem.'); return; }
        messages.push({ from: currentUser.email, to: book.seller, text, date: Date.now() });
        saveAppState();
        renderMessages();
        alert('Mensagem enviada ao vendedor.');
        document.getElementById('messageToSeller').value='';
    });
}

function closeModal(modal) { modal.classList.remove('open'); }

function toggleFavorite(bookId) {
    if (!currentUser) { alert('Faça login para favoritar livros.'); return; }
    if (favorites.includes(bookId)) {
        favorites = favorites.filter(id => id !== bookId);
    } else {
        favorites.push(bookId);
    }
    saveAppState();
    renderAll();
}

function addToCart(bookId) {
    if (!currentUser) { alert('Faça login para adicionar ao carrinho.'); return; }
    const item = cart.find(i => i.bookId === bookId);
    if (item) {
        item.qty += 1;
    } else {
        cart.push({ bookId, qty: 1 });
    }
    saveAppState();
    renderCart();
    alert('Livro adicionado ao carrinho.');
}

function adjustCart(bookId, action) {
    const item = cart.find(i => i.bookId === bookId);
    if (!item) return;
    if (action === 'add') item.qty += 1;
    if (action === 'remove') item.qty = Math.max(1, item.qty - 1);
    if (action === 'delete') cart = cart.filter(i => i.bookId !== bookId);
    saveAppState();
    renderCart();
}

function checkout() {
    if (!currentUser) { alert('Faça login para finalizar a compra.'); return; }
    if (cart.length === 0) { alert('Carrinho vazio.'); return; }

    const total = cart.reduce((acc, item) => {
        const b = books.find(book => book.id === item.bookId);
        return b ? acc + b.price * item.qty : acc;
    }, 0);
    checkoutSummary.textContent = `Você está prestes a comprar ${cart.length} itens por R$ ${total.toFixed(2)}. Confirma?`;
    checkoutModal.classList.add('open');
}

function confirmCheckoutAction() {
    cart.forEach(item => {
        const index = books.findIndex(b => b.id === item.bookId);
        if (index !== -1) books.splice(index, 1);
    });
    cart = [];
    saveAppState();
    renderAll();
    closeModal(checkoutModal);
    alert('Compra concluída!');
}

// Autenticação
function setAuthMode(mode) {
    state.authMode = mode;
    if (mode === 'login') {
        switchToLogin.classList.add('hidden');
        switchToRegister.classList.remove('hidden');
        authHint.textContent = 'Digite e-mail e senha para entrar.';
        authName.parentElement.classList.add('hidden');
    } else {
        switchToRegister.classList.add('hidden');
        switchToLogin.classList.remove('hidden');
        authHint.textContent = 'Preencha os dados para criar sua conta.';
        authName.parentElement.classList.remove('hidden');
    }
}

function loginUser(event) {
    event.preventDefault();
    const email = authEmail.value.trim().toLowerCase();
    const name = authName.value.trim();
    const password = authPassword.value.trim();

    if (!email || !password || (state.authMode === 'register' && !name)) { alert('Preencha todos os campos.'); return; }

    if (state.authMode === 'login') {
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) { alert('Usuário ou senha inválidos.'); return; }
        currentUser = { email: user.email, name: user.name };
        userModal.classList.remove('open');
        renderAll();
        updateUserUI();
        saveAppState();
        alert('Login realizado com sucesso.');
    } else {
        if (users.some(u => u.email === email)) { alert('Email já cadastrado.'); return; }
        users.push({ email, name, password });
        currentUser = { email, name };
        userModal.classList.remove('open');
        renderAll();
        updateUserUI();
        saveAppState();
        alert('Cadastro realizado com sucesso.');
    }

    authForm.reset();
}

function logout() {
    currentUser = null;
    favorites = [];
    cart = [];
    saveAppState();
    updateUserUI();
    renderAll();
}

function publishListing(event) {
    event.preventDefault();
    if (!currentUser) { alert('Faça login para publicar anúncios.'); return; }

    const title = listingFormInputs.listingTitle.value.trim();
    const author = listingFormInputs.listingAuthor.value.trim();
    const category = listingFormInputs.listingCategory.value;
    const description = listingFormInputs.listingDescription.value.trim();
    const condition = listingFormInputs.listingCondition.value;
    const price = parseFloat(listingFormInputs.listingPrice.value);
    const image = listingFormInputs.listingImage.value.trim();

    if (!title || !author || !description || Number.isNaN(price) || price <= 0 || !image) {
        alert('Preencha todos os campos corretamente.');
        return;
    }

    books.push({ id: generateId(), title, author, category, description, price, condition, seller: currentUser.name, image, rating: 4.0, isPromo: false, createdAt: Date.now() });
    listingForm.reset();
    listingModal.classList.remove('open');
    saveAppState();
    renderAll();
    alert('Livro cadastrado com sucesso.');
}

// Eventos
menuItems.forEach(item => item.addEventListener('click', () => changePage(item.dataset.page)));
openLoginBtn.addEventListener('click', () => {
    if (!currentUser) {
        userModal.classList.add('open');
        setAuthMode('login');
    } else {
        if (confirm('Deseja sair?')) logout();
    }
});
closeUserModal.addEventListener('click', () => closeModal(userModal));
closeBookModal.addEventListener('click', () => closeModal(bookModal));
openCreateListing.addEventListener('click', () => {
    if (!currentUser) { alert('Faça login para anunciar livros.'); return; }
    listingModal.classList.add('open');
});
closeListingModal.addEventListener('click', () => closeModal(listingModal));
closeCheckoutModal.addEventListener('click', () => closeModal(checkoutModal));
checkoutBtn.addEventListener('click', checkout);
confirmCheckout.addEventListener('click', confirmCheckoutAction);
authForm.addEventListener('submit', loginUser);
switchToRegister.addEventListener('click', () => setAuthMode('register'));
switchToLogin.addEventListener('click', () => setAuthMode('login'));
listingForm.addEventListener('submit', publishListing);

searchBtn.addEventListener('click', renderAll);
searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); renderAll(); } });
categoryFilter.addEventListener('change', renderAll);
conditionFilter.addEventListener('change', renderAll);
minPrice.addEventListener('input', renderAll);
maxPrice.addEventListener('input', renderAll);
clearFilters.addEventListener('click', () => {
    categoryFilter.value = 'all';
    conditionFilter.value = 'all';
    minPrice.value = '';
    maxPrice.value = '';
    searchInput.value = '';
    renderAll();
});

darkModeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.documentElement.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Escuro';
});

// Delegação de eventos para botões dinâmicos
[lists.catalogList, lists.promoList, lists.trendingList, lists.recentList, lists.newList, lists.usedList, lists.allPromoList, lists.myListings, lists.favoritesList].forEach(list => {
    list.addEventListener('click', (e) => {
        const bookId = e.target.dataset.id;
        if (!bookId) return;
        if (e.target.classList.contains('details-btn')) openBookModal(bookId);
        if (e.target.classList.contains('add-fav')) toggleFavorite(bookId);
        if (e.target.classList.contains('add-cart')) addToCart(bookId);
    });
});

lists.cartList.addEventListener('click', (e) => {
    const bookId = e.target.dataset.id;
    const action = e.target.dataset.action;
    if (!bookId || !action) return;
    adjustCart(bookId, action);
});

// Iniciar app
updateUserUI();
renderAll();
setAuthMode('login');

// Fix: Correção de ordenação de recentes (antiga linha com erro)
function renderAll() {
    const promoBooks = books.filter(b => b.isPromo);
    const trendingBooks = [...books].sort((a, b) => b.rating - a.rating).slice(0, 6);
    const recentBooks = [...books].sort((a, b) => b.createdAt - a.createdAt).slice(0, 6);

    renderBookList('promoList', promoBooks.slice(0, 6));
    renderBookList('trendingList', trendingBooks);
    renderBookList('recentList', recentBooks);
    renderBookList('allPromoList', promoBooks);
    renderBookList('newList', books.filter(b => b.condition === 'Novo'));
    renderBookList('usedList', books.filter(b => b.condition === 'Usado'));

    const filtered = getFilteredBooks();
    renderBookList('catalogList', filtered);

    renderBookList('myListings', currentUser ? books.filter(b => b.seller === currentUser.name) : []);
    renderBookList('favoritesList', books.filter(b => favorites.includes(b.id)));
    renderCart();
    renderMessages();
    renderCategoryOptions();

    saveAppState();
}

