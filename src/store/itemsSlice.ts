import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as itemsService from '../services/itemsService';

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

interface ItemsState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async () => {
    const response = await itemsService.fetchItems();
    return response;
  }
);

export const createItem = createAsyncThunk(
  'items/createItem',
  async (itemData: CreateItemData) => {
    const response = await itemsService.createItem(itemData);
    return response;
  }
);

export const deleteItemById = createAsyncThunk(
  'items/deleteItem',
  async (id: number) => {
    await itemsService.deleteItem(id);
    return id;
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch items
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch items';
      })
      // Create item
      .addCase(createItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create item';
      })
      // Delete item
      .addCase(deleteItemById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete item';
      });
  },
});

export const { clearError } = itemsSlice.actions;
export default itemsSlice.reducer;
