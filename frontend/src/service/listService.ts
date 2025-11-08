import http from "./http";

export interface List {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  items: unknown[];
}

export async function getLists(): Promise<List[]> {
  const response = await http.get<List[]>("/lists");
  return response.data;
}

export async function createList(name: string, description: string) {
  const response = await http.post("/lists", {
    name,
    description,
  });

  return response.status;
}

export async function editList(
  id: number,
  newName: string,
  newDescription: string
) {
  const response = await http.patch("/lists", {
    id,
    newName,
    newDescription,
  });

  return response.status;
}

export async function deleteList(id: number) {
  const response = await http.delete(`/lists/${id}`);
  return response.status;
}
