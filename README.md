# New Azania Market

**New Azania Market** is a modern e-commerce platform built with Next.js. It features a clean and intuitive design that showcases products fetched from a fake store API. This project demonstrates the power of server-side rendering, API integration, and reusable UI components.

## Features

- **Dynamic Product Listings**: Fetches and displays featured products from a public API.

- **Reusable Components**: Includes reusable components such as `ProductCard` and `Button`.

- **Server-Side Rendering (SSR)**: Uses `getFeaturedProducts` to fetch data at runtime for optimal performance.

- **Responsive Design**: Fully responsive layout using modern CSS utilities like Tailwind CSS.

- **Navigation**: Easy navigation with Next.js `Link`.

## Installation

## Prerequisites
- Node.js (version 16 or higher recommended)
- A package manager: `npm`, `yarn`, `pnpm`, or `bun`

- Clone the Repository

```bash
git clone https://github.com/Koketso-dax/new-azania-market.git
cd new-azania-market
```

#### How to run:

create `.env.local` file at the root and create a supabase account then generate an API key.

`NEXT_PUBLIC_SUPABASE_URL` = "Your_URL"
`NEXT_PUBLIC_SUPABASE_ANON_KEY` = "Your_API_Key"

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Or Preferably create a production build by running

```bash
npm run build
```

Then run the build on success with

```bash
npm start
```

## Key Components
- `Home` **Page**
**API Call:** Fetches featured products from `https://fakestoreapi.com/products?limit=3.`
Featured Products Section: Renders a grid of product cards.

- Navigation: Includes a button to view all products.

`ProductCard` ## Component

- Displays product details, including image, title, price, and category.

- Fully responsive layout.

## How It Works

1. **Server-Side Data Fetching:**

- The `getFeaturedProducts` function fetches data from the Fake Store API during the server-side rendering phase.
- Ensures SEO benefits and a better user experience.
2. **Reusable UI Components:**

- `Button`: A styled, reusable button component with variants.
- `ProductCard`: A self-contained component to display product information.
3. **Environment Variables:**

- Supabase integration is pre-configured but requires setup in `.env.local`.

## Technologies Used

- **Next.js:** Framework for React with server-side rendering.

- **React:** Component-based architecture.

- **TypeScript:** Strongly typed programming for enhanced reliability.

- **Tailwind CSS:** Utility-first CSS framework for styling.

## Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit: `git commit -m "Add some feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a Pull Request.

## License

## Contact
