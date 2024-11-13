# DigiKAR Prototype

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Requirements

- Docker
- Visual Studio Code
- an .env file containing the credentials to the PostgreSQL database (still needed for one query)

### Dev Container

The repositorie root contains a [_Dev Container_](https://code.visualstudio.com/docs/devcontainers/containers) for Visual Studio Code (see `./devcontainer/devcontainer.json`). It provides the dependencies needed while developing and for building the site. The devcontainer requires docker to be installed on your system.

Once you open the directory in Visual Studio Code, it gives you a hint that the project contains a Dev Container and asks you whether you want to reopen the folder in a container. Please confirm, if you want to avoid setting up the dependencies manually.

### Development

First, run the scripts to setup the `duckdb` database (this script pulls data from the digikar-ieg repository and loads excel files which are part of this repo).

```bash
pnpm setupdb
```

Secondly, create an .env file (`.env.local`) which contains the credentials to the PostgreSQL database holding the right data. The file should look like this:

```
PGUSER=<insert-user-here>
PGHOST=<insert-host-here>
PGDATABASE=<insert-database-name-here>
PGPASSWORD=<insert-password-here>
PGPORT=<insert-port-here>
```

Thirdly, run development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Building and deployment

At the moment of writing every push to the remote `production` (a gitlab instance), triggers a rebuild of the production website.

This git repo uses `husky` to add checks (`typeScript` and `eslint`) via git hooks: a commit fails if either of the checks fails. There are [ways to skip the husky git hooks](https://typicode.github.io/husky/how-to.html#skipping-git-hooks). However, it's not recommende to do so.

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
