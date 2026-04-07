# Jiangsu Amtaisen Biotechlonogy Co., Ltd. Website (Static)

This project is a static website ready for GitHub Pages deployment, suitable for company profile, product catalog, and industry news publishing.

## Company Information

- Registered Name (CN): Suzhou Angtaisen Biomedical Technology Co., Ltd.
- English Name: jiangsu amtaisen biotechlonogy co.,ltd.
- Email: info@amtaisen.com
- Address: Kunshan Industrial Park

## Project Structure

```text
.
├── index.html
├── styles.css
├── script.js
└── data
    ├── products.json
    └── news.json
```

## Local Preview

Use a local static server for preview (do not open `index.html` directly by double-clicking):

```bash
python3 -m http.server 8000
```

Open in your browser:

```text
http://localhost:8000
```

## GitHub Pages Deployment

1. Upload all files to the root of your GitHub repository.
2. Open repository `Settings` -> `Pages`.
3. Under `Build and deployment`, select:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main` (or your default branch)
   - `Folder`: `/ (root)`
4. Save and wait 1-3 minutes, then open the generated site URL.

## Content Update (No Code Changes)

### 1) Update Product Catalog

Edit `data/products.json`, record example:

```json
{
  "name": "Product Name",
  "category": "Category",
  "description": "Product Description",
  "form": "Form/Spec",
  "status": "Active"
}
```

### 2) Update Industry News

Edit `data/news.json`, record example:

```json
{
  "date": "2026-04-06",
  "title": "News Title",
  "summary": "News Summary"
}
```

> News is automatically sorted by `date` in descending order (latest first).

## Notes

- The website is fully static and ideal for GitHub Pages hosting.
- Product catalog and news modules are dynamically loaded from JSON for lightweight maintenance.
