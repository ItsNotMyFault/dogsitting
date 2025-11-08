import { reactive } from "vue";
import { MediaEntryRepositoryHttp } from "../../libs/http/MediaEntryRepositoryHttp";
import { $fetchClient } from "../../libs/http/adapters/NuxtAdapter";
import type { MediaEntryType } from "../../types/media/MediaEntryType";

interface MediaState {
  mediaItems: MediaEntryType[];
  isLoading: boolean;
  error: string | null;
}

const state: MediaState = reactive({
  mediaItems: [],
  isLoading: true,
  error: null
});

export function useMediaState() {
  return state;
}

export function useMediaOperations() {
  const mediaEntryRepositoryHttp = new MediaEntryRepositoryHttp($fetchClient);

  const fetchMediaData = async (fkId: number, activeProperty: string) => {
    state.isLoading = true;
    state.error = null;

    try {
      const results = await mediaEntryRepositoryHttp.fetchMedias(fkId, activeProperty);
      state.mediaItems = results.items;
    } catch (error) {
      state.error =
        error instanceof Error ? error.message : "An error occurred while fetching media";
      console.error("Error fetching media:", error);
    } finally {
      state.isLoading = false;
    }
  };

  const downloadFile = async (id: number, filename: string) => {
    try {
      // Use the HTTP client directly to get blob data
      const blob = await $fetchClient<Blob>(`/media/${id}`, {
        method: "GET",
        responseType: "blob"
      });

      // Ensure we have a valid blob
      if (!blob) throw new Error("Download failed - no data received");

      // Handle the frontend download logic
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      state.error =
        error instanceof Error ? error.message : "An error occurred while downloading file";
      console.error("Error downloading file:", error);
      throw error;
    }
  };

  const deleteFile = async (id: number, fkId: number, activeProperty: string) => {
    try {
      await mediaEntryRepositoryHttp.remove(id);
      await fetchMediaData(fkId, activeProperty);
    } catch (error) {
      state.error =
        error instanceof Error ? error.message : "An error occurred while deleting file";
      console.error("Error deleting file:", error);
      throw error;
    }
  };

  return {
    fetchMediaData,
    downloadFile,
    deleteFile
  };
}
