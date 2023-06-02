import { API_BASE_URL } from "../Constant/backendAPI";
import { request } from "./APIService";

export function CreateArticle(articleForm) {
  return request({
    url: API_BASE_URL + "/api/articles/create",
    method: "POST",
    body: JSON.stringify(articleForm),
  });
} //게시글 작성 등록 요청

export function ModifyArticle(articleForm, id) {
  return request({
    url: API_BASE_URL + "/api/articles/modify",
    method: "PUT",
    body: JSON.stringify(articleForm, id),
  });
} //게시글 수정 요청

export function DeleteArticle(articleId) {
  return request({
    url: API_BASE_URL + "/api/articles/delete/" + articleId,
    method: "DELETE",
  });
} //게시글 삭제 요청

export function ListArticle(pageForm) {
  return request({
    url:
      API_BASE_URL +
      "/api/articles" +
      `?page=${pageForm.page}&size=${pageForm.size}&sort=${pageForm.sort}`,
    method: "GET",
  });
} //게시글 목록 불러오기 요청

export function ShowArticle(articleId) {
  return request({
    url: API_BASE_URL + "/api/articles/" + articleId,
    method: "GET",
  });
} //게시글 불러오기 요청

export function CreateComment(commentForm) {
  return request({
    url: API_BASE_URL + "/api/comment/create",
    method: "POST",
    body: JSON.stringify(commentForm),
  });
} //댓글 작성 등록 요청

export function ModifyComment(commentForm, commentId) {
  return request({
    url: API_BASE_URL + "/api/comment/modify",
    method: "PUT",
    body: JSON.stringify(commentForm, commentId),
  });
} //댓글 수정하기 위해서 원 댓글 불러오기, 수정 요청

export function DeleteComment(commentId) {
  return request({
    url: API_BASE_URL + "/api/comment/delete/" + commentId,
    method: "DELETE",
  });
} //댓글 삭제 요청

export function CommentData(pageForm) {
  return request({
    url:
      API_BASE_URL +
      "/api/comment/" +
      `${pageForm.article_id}` +
      `?page=${pageForm.page}&size=${pageForm.size}&sort=${pageForm.sort}`,
    method: "GET",
  });
} //댓글 정보 불러오기 요청

export function CreateReplyComment(replycommentForm) {
  return request({
    url: API_BASE_URL + "/api/comment/create/",
    method: "POST",
    body: JSON.stringify(replycommentForm),
  });
} //대댓글 작성 등록 요청

export function ModifyReplyComment(replycommentForm) {
  return request({
    url: API_BASE_URL + "/api/comment/modify",
    method: "PUT",
    body: JSON.stringify(replycommentForm),
  });
} //대댓글 수정하기 위해서 원 댓글 불러오기, 수정 요청

export function DeleteReplyComment(commentId) {
  return request({
    url: API_BASE_URL + "/api/comment/delete" + commentId,
    method: "DELETE",
  });
} //대댓글 삭제 요청

export function ReplyCommentData(pageForm) {
  return request({
    url:
      API_BASE_URL +
      "/api/comment/" +
      `${pageForm.article_id}/` +
      `${pageForm.parent_id}` +
      `?page=${pageForm.page}&size=${pageForm.size}&sort=${pageForm.sort}`,
    method: "GET",
  });
} //대댓글 정보 불러오기 요청

class AuthService {}
export default new AuthService();
