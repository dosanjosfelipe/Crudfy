import http from "./http";

export interface Items {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  listId: number;
}

export async function getItems(listId: number): Promise<Items[]> {
  const response = await http.get<Items[]>("/items", {
    params: {
      listId: listId,
    },
  });

  return response.data;
}

export async function createItems(
  name: string,
  description: string,
  listId: number
) {
  const response = await http.post("/items", {
    name,
    description,
    listId,
  });

  return response.status;
}

export async function editItems(
  id: number,
  newName: string,
  newDescription: string
) {
  const response = await http.patch("/items", {
    id,
    newName,
    newDescription,
  });

  return response.status;
}

export async function deleteItems(id: number) {
  const response = await http.delete(`/items/${id}`);
  return response.status;
}
