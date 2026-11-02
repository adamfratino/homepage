import { LINEAR_GRAPHQL_URL } from "@/constants/linear";

type LinearDocument = {
  id: string;
  title: string;
  updatedAt: string;
  content: string;
};

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

const DOCUMENT_QUERY = `query($id: String!) { document(id: $id) { id title updatedAt content } }`;

export async function getLinearDocument(id: string): Promise<LinearDocument> {
  const apiKey = process.env.LINEAR_API_KEY;
  if (!apiKey) throw new Error("LINEAR_API_KEY is not set");

  const response = await fetch(LINEAR_GRAPHQL_URL, {
    method: "POST",
    headers: { Authorization: apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({ query: DOCUMENT_QUERY, variables: { id } }),
  });
  if (!response.ok) throw new Error(`Linear responded ${response.status}`);

  const json = (await response.json()) as GraphQLResponse<{ document: LinearDocument }>;
  if (json.errors?.length) throw new Error(json.errors.map((e) => e.message).join("; "));
  if (!json.data?.document) throw new Error(`Linear document ${id} not found`);

  return json.data.document;
}
