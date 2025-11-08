import { reactive } from "vue";
import { CommentRepositoryHttp } from "../../libs/http/CommentRepositoryHttp";
import { $fetchClient } from "../../libs/http/adapters/NuxtAdapter";
import type { CommentType } from "../../types/comment/CommentType";

interface CommentState {
  commentItems: CommentType[];
  isLoading: boolean;
  error: string | null;
}

const state: CommentState = reactive({
  commentItems: [],
  isLoading: true,
  error: null
});

export function useCommentState() {
  return state;
}

export function useCommentOperations() {
  const commentRepositoryHttp = new CommentRepositoryHttp($fetchClient);

  const fetchCommentData = async (
    fkId: number,
    activeProperty: string,
    showLoading: boolean = true
  ) => {
    if (showLoading) {
      state.isLoading = true;
    }
    state.error = null;

    try {
      // Fetch the comment data
      const results = await commentRepositoryHttp.fetchComments(fkId, activeProperty);
      state.commentItems = results.items;
    } catch (error) {
      state.error =
        error instanceof Error ? error.message : "An error occurred while fetching comments";
      console.error("Error fetching comments:", error);
    } finally {
      if (showLoading) {
        state.isLoading = false;
      }
    }
  };

  const createComment = async (fkId: number, activeProperty: string, content: string) => {
    try {
      await commentRepositoryHttp.create({
        targetType: activeProperty,
        targetId: fkId,
        content
      });

      // Refresh the comment list after creation (without showing loading state)
      await fetchCommentData(fkId, activeProperty, false);
    } catch (error) {
      state.error =
        error instanceof Error ? error.message : "An error occurred while creating comment";
      console.error("Error creating comment:", error);
      throw error;
    }
  };

  const updateComment = async (
    commentId: number,
    content: string,
    fkId: number,
    activeProperty: string
  ) => {
    try {
      // Update the comment using the base repository update method
      await commentRepositoryHttp.update(commentId, {
        content: content,
        isEdited: true,
        targetType: activeProperty,
        targetId: fkId
      } as Partial<CommentType>);

      // Refresh the comment list after update (without showing loading state)
      await fetchCommentData(fkId, activeProperty, false);
    } catch (error) {
      state.error =
        error instanceof Error ? error.message : "An error occurred while updating comment";
      console.error("Error updating comment:", error);
      throw error;
    }
  };

  const deleteComment = async (commentEntryId: number, fkId: number, activeProperty: string) => {
    try {
      await commentRepositoryHttp.remove(commentEntryId);

      // Refresh the comment list after deletion (without showing loading state)
      await fetchCommentData(fkId, activeProperty, false);
    } catch (error) {
      state.error =
        error instanceof Error ? error.message : "An error occurred while deleting comment";
      console.error("Error deleting comment:", error);
      throw error;
    }
  };

  return {
    fetchCommentData,
    createComment,
    updateComment,
    deleteComment
  };
}
