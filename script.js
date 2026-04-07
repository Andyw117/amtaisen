const productGrid = document.querySelector("#productGrid");
const newsList = document.querySelector("#newsList");
const productSearch = document.querySelector("#productSearch");
const productCategory = document.querySelector("#productCategory");
const currentYear = document.querySelector("#currentYear");

let products = [];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderProductCategoryOptions(items) {
  const categories = [...new Set(items.map((item) => item.category))].sort((a, b) => a.localeCompare(b));
  const options = ['<option value="all">All Categories</option>'].concat(
    categories.map((category) => `<option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`)
  );
  productCategory.innerHTML = options.join("");
}

function renderProducts(items) {
  if (!items.length) {
    productGrid.innerHTML = '<p class="empty">No matching products found. Please adjust the filters.</p>';
    return;
  }

  productGrid.innerHTML = items
    .map(
      (item) => `
      <article class="product-card">
        <span class="badge">${escapeHtml(item.category)}</span>
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <p class="meta">Form/Spec: ${escapeHtml(item.form || "TBD")}</p>
        <p class="meta">Status: ${escapeHtml(item.status || "Active")}</p>
      </article>
    `
    )
    .join("");
}

function filterAndRenderProducts() {
  const keyword = (productSearch.value || "").trim().toLowerCase();
  const category = productCategory.value;

  const filtered = products.filter((item) => {
    const inCategory = category === "all" || item.category === category;
    const inKeyword =
      !keyword ||
      item.name.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword);
    return inCategory && inKeyword;
  });

  renderProducts(filtered);
}

function renderNews(items) {
  if (!items.length) {
    newsList.innerHTML = '<p class="empty">No news available.</p>';
    return;
  }

  newsList.innerHTML = items
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .map(
      (item) => `
      <article class="news-card">
        <p class="news-date">${escapeHtml(item.date)}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.summary)}</p>
      </article>
    `
    )
    .join("");
}

async function loadData() {
  try {
    const [productRes, newsRes] = await Promise.all([fetch("data/products.json"), fetch("data/news.json")]);
    if (!productRes.ok || !newsRes.ok) {
      throw new Error("Failed to load data files");
    }

    products = await productRes.json();
    const newsItems = await newsRes.json();

    renderProductCategoryOptions(products);
    filterAndRenderProducts();
    renderNews(newsItems);
  } catch (error) {
    productGrid.innerHTML = '<p class="empty">Failed to load product data. Please check data/products.json.</p>';
    newsList.innerHTML = '<p class="empty">Failed to load news data. Please check data/news.json.</p>';
    console.error(error);
  }
}

function bindEvents() {
  productSearch.addEventListener("input", filterAndRenderProducts);
  productCategory.addEventListener("change", filterAndRenderProducts);
}

function init() {
  currentYear.textContent = String(new Date().getFullYear());
  bindEvents();
  loadData();
}

init();
