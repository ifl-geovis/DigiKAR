# DigiKAR Prototype

This is a [Next.js](https://nextjs.org/) interactive cartographic prototype, bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), for the DigiKAR project.

## Development

Steps to run the project locally for development:

1. Install the dependencies with `pnpm install`.
2. Create an `.env.local` file with the credentials to the PostgreSQL database.
3. Run the setup script with `pnpm setupdb`.
4. Run the development server with `pnpm dev`.

Find a more detailed description below.

First, install the projects dependencies with `pnpm install`. This project uses `pnpm` as package manager. It is installed in the devcontainer and should be used to install the dependencies.

Secondly, run the script to setup the `duckdb` database (this script pulls mobility data from the remote [IEG DHR digikar repository](https://github.com/ieg-dhr/DigiKAR) and loads excel files which are part of this very repo). The script is also run automatically each time the website is build in the production environment to ensure that the data is up-to-date.

```bash
pnpm seedDatabase
```

Fourthly, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

This Next.js project uses the [App Router](https://nextjs.org/docs/app) and [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Building and deployment

At the moment of writing every push to the remote `production` (a gitlab instance), triggers a rebuild of the production website. A second mirror of this repository, for long-time access, is the github repo [ifl-geovis/DigiKAR](https://github.com/ifl-geovis/DigiKAR).

This git repo uses `husky` to add pre-commit checks (`typeScript` and `eslint`) via git hooks: a commit fails if either of the checks fails. There are [ways to skip the husky git hooks](https://typicode.github.io/husky/how-to.html#skipping-git-hooks). However, it's not recommende to do so.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Use with Docker

Build the container:

```{bash}
docker build -t digikar .
```

Run the container with:

```{bash}
docker run --rm -it -p 3000:3000 --hostname localhost digikar
```

If you're on a M1/M2 mac add `--platform linux/amd64` to both commands.
