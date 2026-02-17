# Web project
Proyecto LLM 1º DAW clon de una pagina web
web a copiar: [sephora](https://www.sephora.com/)

## Deadlines:

- Semana del 16 de feb entrega del prototipo HTML

## Organisation:

### 1. The Project Manager & Layout Lead (The "Skeleton" Architect)

This person is responsible for the overall structure and the elements that appear on every page.

    The Navbar & Footer: These are complex on Sephora (mega-menus, search bars, account icons). They must look the same across all pages.

    Responsive Design: Ensuring the site works on mobile (Sephora’s mobile view is very different from desktop).

    Project Organization: Setting up the shared CSS variables (colors, fonts like 'Montserrat') so everyone’s work looks consistent.

    Task: Create a base.css and a template that others can use.

### 2. The Homepage & Visuals Specialist (The "Landing" Expert)

The Sephora homepage is heavy on carousels, banners, and marketing grids.

    Banners & Carousels: Building the sliding image banners (hero section) and the "New Arrivals" scrollable lists.

    Grid Layouts: Using CSS Grid or Flexbox to replicate the "Shop by Category" sections.

    Hover Effects: Adding the smooth transitions when a user hovers over a brand or category.

    Task: Build the index.html and ensure the high-end "luxury" feel of the brand is captured.

### 3. The Product Catalog Manager (The "Data" Expert)

This person handles how products are displayed and filtered.

    Product Cards: Creating a reusable "card" component (image, price, star rating, "Add to Basket" button).

    Category Pages: Building the layout where 20+ products are shown at once.

    Search/Filters: Using basic JavaScript to "filter" products (e.g., show only "Skincare" or "Makeup").

    Task: Create a small JSON file or array of product data and use JS to inject it into the page.

### 4. The Interactive & Cart Specialist (The "Logic" Expert)

This person handles the "E-commerce" functionality using JavaScript.

    Product Detail Page: Creating the page that opens when you click a product (zoom on image, shade selector).

    The Shopping Basket: Creating the logic to "Add to Cart" and show the total price.

    Local Storage: Using localStorage so that even if the student refreshes the page, the items stay in the cart.

    Task: Manage the "State" of the application—knowing what the user has selected.
