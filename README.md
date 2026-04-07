# MealExplorer - CMLABS Frontend Part-time Test

Aplikasi web untuk menjelajahi resep makanan berdasarkan bahan (ingredients) menggunakan [TheMealDB API](https://www.themealdb.com/api.php).

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**

## Fitur

- **Halaman Ingredients** — Menampilkan daftar semua ingredients dengan fitur pencarian
- **Halaman Ingredients Detail** — Menampilkan daftar meal berdasarkan ingredient yang dipilih dengan fitur pencarian
- **Halaman Meal Detail** — Menampilkan detail lengkap meal: gambar, judul, kategori, area, daftar bahan & takaran, instruksi memasak, dan video YouTube embedded
- **Responsive Design** — Tampilan optimal di desktop, tablet, dan mobile

## Cara Menjalankan Project

### Prerequisites

- Node.js 18+
- npm

### Langkah-langkah

1. Clone repository

```bash
git https://github.com/annashrul/cmlabs-frontend-parttime-test.git
cd cmlabs-frontend-parttime-test
```

2. Install dependencies

```bash
npm install
```

3. Jalankan development server

```bash
npm run dev
```

4. Buka [http://localhost:3000](http://localhost:3000) di browser

### Build Production

```bash
npm run build
npm start
```

## Struktur Halaman

| Halaman | Route | Deskripsi |
|---------|-------|-----------|
| Ingredients | `/` | Daftar semua ingredients dengan search |
| Ingredients Detail | `/ingredients/[name]` | Daftar meal berdasarkan ingredient |
| Meal Detail | `/meals/[id]` | Detail lengkap sebuah meal |

## API Endpoints

| Endpoint | URL |
|----------|-----|
| List Ingredients | `www.themealdb.com/api/json/v1/1/list.php?i=list` |
| Filter by Ingredient | `www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}` |
| Detail Meal | `www.themealdb.com/api/json/v1/1/lookup.php?i={meal-id}` |


## URL WEB

- [MealExplorer](https://meal-explorer.vercel.app/)