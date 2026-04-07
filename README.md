# MealExplorer

Aplikasi web untuk menjelajahi resep makanan dari seluruh dunia menggunakan [TheMealDB API](https://www.themealdb.com/api.php). Dibuat sebagai submission **CMLABS Frontend Part-time Test**.

## Tech Stack

| Technology | Version |
|---|---|
| Next.js | 16 (App Router) |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | v4 |
| Lucide React | Icons |
| NProgress | Loading bar |

## Fitur Utama

### Halaman
- **Home** — Landing page dengan hero section, statistik, dan popular categories
- **Foods** — Daftar meal berdasarkan kategori dengan sidebar filter
- **Ingredients** — Daftar 500+ ingredients dengan filter A-Z dan pencarian
- **Ingredients Detail** — Daftar meal berdasarkan ingredient yang dipilih
- **Local Culinary** — Daftar cuisine dari berbagai negara dengan filter region
- **Local Culinary Detail** — Daftar meal berdasarkan negara/area
- **Meal Detail** — Detail lengkap meal: gambar, kategori, area, tags, bahan & takaran, instruksi, dan video YouTube

### UI/UX
- **Responsive Design** — Optimized untuk mobile, tablet, dan desktop
- **Mobile Bottom Bar** — Navigasi fixed di bawah layar untuk mobile
- **Bottom Sheet Filter** — Modal filter dari bawah untuk mobile
- **Sticky Filter Bar** — Search + filter tetap terlihat saat scroll di semua device
- **Grid/List Toggle** — Pilih tampilan grid atau list, tersimpan di URL (`?view=list`)
- **Skeleton Shimmer Loading** — Loading placeholder dengan shimmer effect (kiri ke kanan)
- **Infinite Scroll** — Load data otomatis saat scroll, dengan skeleton filler di sisa kolom
- **Back to Top** — Tombol kembali ke atas saat scroll
- **NProgress Bar** — Loading bar di top saat navigasi antar halaman
- **Dynamic Page Titles** — Judul browser tab berubah sesuai halaman
- **Custom Scrollbar** — Scrollbar tipis dan konsisten di seluruh halaman
- **Empty State** — Ilustrasi dengan tombol reset saat pencarian tidak ditemukan

### Teknis
- **In-Memory API Cache** — Data di-cache di memory, hilang saat refresh
- **URL Query Params** — Search (`?search=`), filter A-Z (`?letter=`), dan view mode (`?view=`) tersimpan di URL
- **Debounced Search** — Pencarian dengan debounce 300ms + sync ke URL
- **Context State Management** — ViewMode dan HeaderSearch via React Context
- **Custom Hooks** — 15+ hooks untuk separation of concerns
- **Error Handling** — API calls dengan try/catch + fallback values
- **Accessibility** — aria-label, aria-pressed, aria-current, role dialog/group

## Cara Menjalankan

### Prerequisites

- Node.js 18+
- npm

### Development

```bash
git clone https://github.com/annashrul/cmlabs-frontend-parttime-test.git
cd cmlabs-frontend-parttime-test
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

## Struktur Folder

```
src/
├── app/                          # Pages (Next.js App Router)
│   ├── page.tsx                  # Home
│   ├── foods/
│   │   ├── page.tsx              # Redirect ke kategori pertama
│   │   └── [category]/page.tsx   # Meals by category
│   ├── ingredients/
│   │   ├── page.tsx              # Daftar ingredients
│   │   └── [name]/page.tsx       # Meals by ingredient
│   ├── local-culinary/
│   │   ├── page.tsx              # Daftar cuisines
│   │   └── [area]/page.tsx       # Meals by area
│   └── meals/[id]/page.tsx       # Meal detail
├── components/
│   ├── cards/                    # Card components (MealCard, IngredientCard, dll)
│   ├── layout/                   # Layout (Header, Footer, BottomBar, PageContainer)
│   └── ui/                       # UI primitives (SearchInput, Skeleton, EmptyState, dll)
├── context/                      # React Context (ViewMode, HeaderSearch)
├── data/                         # Static data (navigation, area flags)
├── hooks/                        # Custom hooks (15+ hooks)
└── lib/                          # API layer, types, constants, utilities
```

## Struktur Halaman

| Halaman | Route | Deskripsi |
|---|---|---|
| Home | `/` | Landing page + statistik + popular categories |
| Foods | `/foods/[category]` | Meals berdasarkan kategori |
| Ingredients | `/ingredients` | Daftar ingredients dengan filter A-Z |
| Ingredients Detail | `/ingredients/[name]` | Meals berdasarkan ingredient |
| Local Culinary | `/local-culinary` | Daftar cuisine dunia dengan filter region |
| Local Culinary Detail | `/local-culinary/[area]` | Meals berdasarkan negara |
| Meal Detail | `/meals/[id]` | Detail meal lengkap + video |

## API Endpoints

| Endpoint | URL | Status |
|---|---|---|
| List Ingredients | `themealdb.com/api/json/v1/1/list.php?i=list` | Required |
| Filter by Ingredient | `themealdb.com/api/json/v1/1/filter.php?i={name}` | Required |
| Categories | `themealdb.com/api/json/v1/1/categories.php` | Required |
| Filter by Category | `themealdb.com/api/json/v1/1/filter.php?c={category}` | Required |
| List Areas | `themealdb.com/api/json/v1/1/list.php?a=list` | Required |
| Filter by Area | `themealdb.com/api/json/v1/1/filter.php?a={area}` | Required |
| Meal Detail | `themealdb.com/api/json/v1/1/lookup.php?i={id}` | Optional |

## Demo

https://cmlabs-frontend-parttime.vercel.app/
