import api from '../lib/axios';

export interface Item {
  id: number;
  name: string;
  price: string;
  img: string;
}

export interface CreateItemData {
  name: string;
  price: string;
  img: string;
}

// GET /items/ - returns array of all items
export const fetchItems = async (): Promise<Item[]> => {
  try {
    const response = await api.get('/items/');
    return response.data;
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
};

// POST /items/ - creates a new item
export const createItem = async (itemData: CreateItemData): Promise<Item> => {
  try {
    const response = await api.post('/items/', itemData);
    return response.data;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
};

// GET /items/:id - returns item with given id
export const fetchItemById = async (id: number): Promise<Item> => {
  try {
    const response = await api.get(`/items/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Item not found');
    }
    console.error(`Error fetching item ${id}:`, error);
    throw error;
  }
};

// DELETE /items/:id - removes item with given id
export const deleteItem = async (id: number): Promise<void> => {
  try {
    await api.delete(`/items/${id}`);
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error('Item not found');
    }
    console.error(`Error deleting item ${id}:`, error);
    throw error;
  }
};
