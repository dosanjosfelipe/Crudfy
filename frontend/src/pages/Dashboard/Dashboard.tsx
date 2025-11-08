import "./Dashboard.scss";
import type { List } from "../../service/listService";
import type { Items } from "../../service/itemsService";
import {
  getLists,
  createList,
  editList,
  deleteList,
} from "../../service/listService";
import {
  getItems,
  createItems,
  editItems,
  deleteItems,
} from "../../service/itemsService";

import { useEffect, useState } from "react";

function Dashboard() {
  const [lists, setLists] = useState<List[]>([]);
  const [items, setItems] = useState<Items[]>([]);
  // Estados para CRIAR LISTA
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // Estados para EDITAR LISTA
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Estados para ITENS (Criação e Edição)
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");

  const [selectedList, setSelectedList] = useState<List | null>(null);
  const [selectedItem, setSelectedItem] = useState<Items | null>(null);

  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreatingItem, setIsCreatingItem] = useState(false);
  const [isEditingItem, setIsEditingItem] = useState(false);

  function dateFormatter(dataISO: string) {
    const partes = dataISO.split("T")[0].split("-");

    if (partes.length < 3) return dataISO;

    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    return `${dia}/${mes}/${ano}`;
  }

  // --- Funções de Listas ---

  // Carregar listas quando carregar o DOM
  useEffect(() => {
    async function fetchLists() {
      try {
        const data = await getLists();
        setLists(data);
      } catch (error) {
        alert("Erro ao buscar listas: " + error);
      }
    }
    fetchLists();
  }, []);

  // Enviar Listas criadas
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const status = await createList(name, description);
      if (status === 201) {
        const updatedLists = await getLists();
        setLists(updatedLists);
      }
      setName("");
      setDescription("");
      setIsCreating(false);
    } catch (error) {
      alert("Erro ao criar lista: " + error);
    }
  };

  // Enviar edição da Lista
  const handleSubmitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedList) {
      alert("Nenhuma lista selecionada para edição.");
      return;
    }

    try {
      const listId = selectedList.id;
      const status = await editList(listId, newName, newDescription);

      if (status === 200) {
        const updatedLists = await getLists();
        setLists(updatedLists);
        setSelectedList({
          ...selectedList,
          name: newName,
          description: newDescription,
        });
      }
      setNewName("");
      setNewDescription("");
      setIsEditing(false);
    } catch (error) {
      alert("Erro ao editar lista: " + error);
    }
  };

  const handleDelete = async () => {
    if (!selectedList) {
      alert("Nenhuma lista selecionada para deletar");
      return;
    }

    try {
      const listId = selectedList.id;
      const status = await deleteList(listId);

      if (status === 204) {
        const updatedLists = await getLists();
        setLists(updatedLists);
        setSelectedList(null);
        setItems([]);
      }
    } catch (error) {
      alert("Erro ao deletar lista " + error);
    }
  };

  const handleShowList = (list: List) => {
    setSelectedList(list);
    setSelectedItem(null);
    setNewName(list.name);
    setNewDescription(list.description);
    setIsEditing(true);
    setIsCreating(false);
    setIsCreatingItem(false);
    setIsEditingItem(false);
  };

  const handleToggleCreate = () => {
    setIsCreating(!isCreating);
    setSelectedList(null);
    setIsEditing(false);
    setIsCreatingItem(false);
    setIsEditingItem(false);
  };

  // --- Funções de Itens ---

  // Carregar itens quando a lista selecionada mudar
  useEffect(() => {
    async function fetchItems(listId: number) {
      try {
        const data = await getItems(listId);
        setItems(data);
      } catch (error) {
        alert("Erro ao buscar itens: " + error);
      }
    }

    if (selectedList) {
      fetchItems(selectedList.id);
    } else {
      setItems([]);
    }
  }, [selectedList]);

  const handleSubmitItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedList) {
      alert("Nenhuma lista selecionada para adicionar o item.");
      return;
    }

    try {
      const status = await createItems(
        itemName,
        itemDescription,
        selectedList.id
      );

      if (status === 201) {
        const updatedItems = await getItems(selectedList.id);
        setItems(updatedItems);
      }
      setItemName("");
      setItemDescription("");
      setIsCreatingItem(false);
    } catch (error) {
      alert("Erro ao criar item: " + error);
    }
  };

  const handleSubmitEditItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedItem) {
      alert("Nenhum item selecionado para edição.");
      return;
    }

    if (!selectedList) {
      alert("Nenhuma lista selecionada.");
      return;
    }

    try {
      const itemId = selectedItem.id;
      const status = await editItems(itemId, newItemName, newItemDescription);

      if (status === 200) {
        const updatedItems = await getItems(selectedList.id);
        setItems(updatedItems);
        setSelectedItem({
          ...selectedItem,
          name: newItemName,
          description: newItemDescription,
        });
      }
      setNewItemName("");
      setNewItemDescription("");
      setIsEditingItem(false);
    } catch (error) {
      alert("Erro ao editar item: " + error);
    }
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) {
      alert("Nenhum item selecionado para deletar.");
      return;
    }

    if (!selectedList) {
      alert("Nenhuma lista selecionada.");
      return;
    }

    try {
      const itemId = selectedItem.id;
      const status = await deleteItems(itemId);

      if (status === 204) {
        const updatedItems = await getItems(selectedList.id);
        setItems(updatedItems);
        setSelectedItem(null);
      }
    } catch (error) {
      alert("Erro ao deletar item: " + error);
    }
  };

  const handleShowItem = (item: Items) => {
    setSelectedItem(item);
    setNewItemName(item.name);
    setNewItemDescription(item.description);
    setIsEditingItem(true);
    setIsCreatingItem(false);
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleToggleCreateItem = () => {
    if (!selectedList) {
      alert("Selecione uma lista primeiro.");
      return;
    }
    setIsCreatingItem(!isCreatingItem);
    setSelectedItem(null);
    setIsEditingItem(false);
    setIsEditing(false);
    setIsCreating(false);
  };

  // --- Renderização ---

  return (
    <main className="dashboard">
      <div className="left-side">
        <div className="box">
          <h2>Criar e Editar Listas</h2>
          {isCreating && (
            <form onSubmit={handleSubmit} className="createForm">
              <input
                type="text"
                placeholder="Nome da Lista"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
              />
              <textarea
                placeholder="Descrição da Lista"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
              ></textarea>
              <input type="submit" value="Criar Lista" id="createList" />
            </form>
          )}

          {isEditing && selectedList && (
            <form onSubmit={handleSubmitEdit} className="editForm">
              <input
                type="text"
                placeholder="Novo Nome da Lista"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                id="name"
              />
              <textarea
                placeholder="Nova Descrição da Lista"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                id="description"
              ></textarea>
              <input type="submit" value="Editar Lista" id="editList" />
            </form>
          )}

          {/* Formulários de Itens */}
          <h2>Criar e Editar Itens</h2>
          {isCreatingItem && selectedList && (
            <form onSubmit={handleSubmitItem} className="createFormItem">
              <input
                type="text"
                placeholder="Nome do Item"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                id="itemName"
              />
              <textarea
                placeholder="Descrição do Item"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                id="itemDescription"
              ></textarea>
              <input type="submit" value="Criar Item" id="createItem" />
            </form>
          )}

          {isEditingItem && selectedItem && (
            <form onSubmit={handleSubmitEditItem} className="editFormItem">
              <input
                type="text"
                placeholder="Novo Nome do Item"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                id="newItemName"
              />
              <textarea
                placeholder="Nova Descrição do Item"
                value={newItemDescription}
                onChange={(e) => setNewItemDescription(e.target.value)}
                id="newItemDescription"
              ></textarea>
              <input type="submit" value="Editar Item" id="editItem" />
            </form>
          )}

          {!isCreating && !isEditing && !isCreatingItem && !isEditingItem && (
            <p className="empty-state">
              Clique em "+ Criar Nova Lista" ou em uma lista/item para começar.
            </p>
          )}
        </div>
      </div>

      <div className="middle-side">
        <div className="box">
          <div className="list-side">
            <h2>Listas</h2>
            {lists.length === 0 ? (
              <div className="noLists">
                <button id="newList" onClick={handleToggleCreate}>
                  {isCreating ? "Cancelar Criação" : "+ Criar Nova Lista"}
                </button>
                <p className="empty-state">Nenhuma lista encontrada</p>
              </div>
            ) : (
              <ul>
                <button id="newList" onClick={handleToggleCreate}>
                  {isCreating ? "Cancelar Criação" : "+ Criar Nova Lista"}
                </button>
                {lists.map((list) => (
                  <li
                    key={list.id}
                    className={selectedList?.id === list.id ? "selected" : ""}
                  >
                    <button id="showList" onClick={() => handleShowList(list)}>
                      {list.name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="item-side">
            <h2>Itens</h2>
            {selectedList ? (
              <>
                <button id="newItem" onClick={handleToggleCreateItem}>
                  {isCreatingItem ? "Cancelar Criação" : "+ Criar Novo Item"}
                </button>
                {items.length === 0 ? (
                  <p className="empty-state">
                    Nenhum item encontrado para esta lista.
                  </p>
                ) : (
                  <ul>
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className={
                          selectedItem?.id === item.id ? "selected" : ""
                        }
                      >
                        <button
                          id="showItem"
                          onClick={() => handleShowItem(item)}
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <p className="empty-state">
                Selecione uma lista para ver seus itens.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="right-side">
        <div className="box">
          <h2>Visualizar e Organizar</h2>

          {/* Visualização de Lista */}
          {selectedList && !selectedItem && (
            <div className="details">
              <div className="detail-row">
                <span className="label">Nome</span>
                <span className="value">{selectedList.name}</span>
              </div>

              <div className="detail-row">
                <span className="label">Descrição</span>
                <span className="value">{selectedList.description}</span>
              </div>

              <div className="detail-row-dates">
                <div className="column">
                  <span className="label">Criado em</span>
                  <span className="value">
                    {dateFormatter(selectedList.created_at)}
                  </span>
                </div>
                <div className="column">
                  <span className="label">Última atualização</span>
                  <span className="value">
                    {dateFormatter(selectedList.updated_at)}
                  </span>
                </div>
              </div>
              <button className="delete-button" onClick={() => handleDelete()}>
                Deletar Lista
              </button>
            </div>
          )}

          {/* Visualização de Item */}
          {selectedItem && (
            <div className="details">
              <div className="detail-row">
                <span className="label">Nome</span>
                <span className="value">{selectedItem.name}</span>
              </div>

              <div className="detail-row">
                <span className="label">Descrição</span>
                <span className="value">{selectedItem.description}</span>
              </div>

              <div className="detail-row-dates">
                <div className="column">
                  <span className="label">Criado em</span>
                  <span className="value">
                    {dateFormatter(selectedItem.created_at)}
                  </span>
                </div>
                <div className="column">
                  <span className="label">Última atualização</span>
                  <span className="value">
                    {dateFormatter(selectedItem.updated_at)}
                  </span>
                </div>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDeleteItem()}
              >
                Deletar Item
              </button>
            </div>
          )}

          {!selectedList && !selectedItem && (
            <p className="empty-state">Nenhuma lista ou item selecionado</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
