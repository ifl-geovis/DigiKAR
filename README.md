# DigiKAR Prototype

This is a [Next.js](https://nextjs.org/) interactive cartographic prototype, bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), for the DigiKAR project.

## Getting Started

### Requirements

- Docker
- Visual Studio Code
- an .env file containing the credentials to the PostgreSQL database (still needed for one query)

### Dev Container

The repositorie root contains a [_Dev Container_](https://code.visualstudio.com/docs/devcontainers/containers) for Visual Studio Code (see `./devcontainer/devcontainer.json`). It provides all dependencies needed for developing and building the site. The devcontainer requires Docker to be installed on your system.

Once you open the directory in Visual Studio Code, it gives you a hint that the project contains a Dev Container and asks you whether you want to reopen the folder in a container. Please confirm, if you want to avoid setting up the dependencies manually.

### Development

Steps to run the project locally for development:

1. Install the dependencies with `pnpm install`.
2. Create an `.env.local` file with the credentials to the PostgreSQL database.
3. Run the setup script with `pnpm setupdb`.
4. Run the development server with `pnpm dev`.

Find a more detailed description below.

First, install the projects dependencies with `pnpm install`. This project uses `pnpm` as package manager. It is installed in the devcontainer and should be used to install the dependencies.

Secondly, run the script to setup the `duckdb` database (this script pulls mobility data from the remote [IEG DHR digikar repository](https://github.com/ieg-dhr/DigiKAR) and loads excel files which are part of this very repo). The script is also run automatically each time the website is build in the production environment to ensure that the data is up-to-date.

```bash
pnpm setupdb
```

Thirdly, create an .env file (`.env.local`) which contains the credentials to the PostgreSQL database holding the right data. The file should look like this:

```
PGUSER=<insert-user-here>
PGHOST=<insert-host-here>
PGDATABASE=<insert-database-name-here>
PGPASSWORD=<insert-password-here>
PGPORT=<insert-port-here>
```

Fourthly, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

This Next.js project uses the [App Router](https://nextjs.org/docs/app) and [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Building and deployment

At the moment of writing every push to the remote `production` (a gitlab instance), triggers a rebuild of the production website. A second mirror of this repository, for long-time access, is the github repo [ifl-geovis/DigiKAR](https://github.com/ifl-geovis/DigiKAR).

This git repo uses `husky` to add pre-commit checks (`typeScript` and `eslint`) via git hooks: a commit fails if either of the checks fails. There are [ways to skip the husky git hooks](https://typicode.github.io/husky/how-to.html#skipping-git-hooks). However, it's not recommende to do so.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Use with Docker

Build the container and parse in the environment variables for `pg node` via the `--build arg` with:

```{bash}
docker build -t digikar --build-arg pguser=user --build-arg pghost=hostname --build-arg pgdatabase=databasename --build-arg pgpassword=password --build-arg pgport=port .
```

Run the container with environment variables for `pg node` (see build command), e.g. by re-using the variables of the `.env` file with:

```{bash}
docker run --rm -it -p 3000:3000 --env-file <path-to-env.file> --hostname localhost digikar
```

If you're on a M1/M2 mac add `--platform linux/amd64` to both commands.
