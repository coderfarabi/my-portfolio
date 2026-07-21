import { GraphQLClient, gql } from "graphql-request";
import { env } from "@/config/env";
import { cache } from "react";

const GITHUB_GRAPHQL_URL = "https://api.github.com/graphql";

const createGitHubClient = () =>
  new GraphQLClient(GITHUB_GRAPHQL_URL, {
    headers: {
      Authorization: `Bearer ${env.GITHUB_PAT}`,
      "Content-Type": "application/json",
    },
  });

export const getGitHubClient = cache(createGitHubClient);

// GraphQL Fragment for common repository fields
export const REPOSITORY_FRAGMENT = gql`
  fragment RepositoryFields on Repository {
    name
    description
    url
    homepageUrl
    stargazerCount
    forkCount
    primaryLanguage {
      name
      color
    }
    repositoryTopics(first: 10) {
      nodes {
        topic {
          name
        }
      }
    }
    licenseInfo {
      name
      key
      spdxId
    }
    createdAt
    updatedAt
    defaultBranchRef {
      name
    }
    openGraphImageUrl
  }
`;

// Query for Pinned Repositories
export const PINNED_REPOS_QUERY = gql`
  query GetPinnedRepos($username: String!, $first: Int!) {
    user(login: $username) {
      pinnedItems(first: $first, types: [REPOSITORY]) {
        nodes {
          ... on Repository {
            ...RepositoryFields
          }
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

// Query for a single Repository's statistics
export const REPO_DETAILS_QUERY = gql`
  query GetRepoDetails($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      ...RepositoryFields
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

// Data Types mapping the GraphQL Response
export interface GitHubRepositoryResponse {
  name: string;
  description: string | null;
  url: string;
  homepageUrl: string | null;
  stargazerCount: number;
  forkCount: number;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
  licenseInfo: {
    name: string;
    key: string;
    spdxId: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
  defaultBranchRef: {
    name: string;
  } | null;
  openGraphImageUrl: string;
}

export interface PinnedReposQueryResult {
  user: {
    pinnedItems: {
      nodes: GitHubRepositoryResponse[];
    };
  } | null;
}

export interface RepoDetailsQueryResult {
  repository: GitHubRepositoryResponse | null;
}
