# DigiKAR Prototype

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Use with Docker

Build the container and parse in the environment variables for `pg node` via the `--build arg` with:

```{bash}
docker build -t digikar --build-arg pguser=user --build-arg pghost=hostname --build-arg pgdatabase=databasename --build-arg pgpassword=password --build-arg pgport=port .
```

Run the container with environment variables for `pg node` (see build command), e.g. by using a `.env` file with:

```{bash}
docker run --rm -it -p 3000:3000 --env-file .path.to.env.file --hostname localhost digikar
```

If you're on a M1/M2 mac add `--platform linux/amd64` to both commands.
