import { createClient, type QueryParams } from "next-sanity";

export const client = createClient({
  projectId: "tta7nwhf",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
}) {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === 'development' ? 10 : 10,
                            //Remember to change back to 30 : 3600,
      tags,
    },
  });
}

