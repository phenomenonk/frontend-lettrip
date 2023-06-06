import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Article.css";
import {
  showArticle,
  deleteArticle,
  listArticle,
} from "../../Service/ArticleService";
import CommentCreate from "./Comment/CommentCreate";
import { ACCESS_TOKEN } from "../../Constant/backendAPI";

function ArticlePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const [post, setPost] = useState([]);
  const [pageForm, setPageForm] = useState({
    page: 0,
    size: 10,
    sort: "id,DESC",
  });

  useEffect(() => {
    //로그인 여부 확인하기
    const storedToken = localStorage.getItem(ACCESS_TOKEN);
    if (storedToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    //게시글 작성자와 로그인 사용자 동일 여부 확인하기
    const storedEmail = localStorage.getItem("email");
    if (post.writerEmail === storedEmail) {
      setIsEditable(true);
    } else {
      setIsEditable(false);
    }
  }, [post]);

  useEffect(() => {
    fetchArticle();
  }, []);

  const fetchArticle = () => {
    console.log(`현재 파라미터 = ${id}`);
    showArticle(id) // 해당 id에 해당하는 article 하나만 결과로 넘어옴
      .then((response) => {
        setPost(response);
        console.log();
      })
      .catch((e) => {
        console.log(e);
        window.alert("불러오기에 실패했습니다. 다시 시도해주시길 바랍니다.");
        navigate("/articles");
      });
  };
  //게시글 삭제
  const handleDelete = () => {
    if (window.confirm("게시글을 삭제하시겠습니까?")) {
      deleteArticle(id)
        .then(() => {
          window.alert("게시글이 삭제되었습니다.");
          navigate("/articles");
          fetchArticles();
        })
        .catch((e) => {
          console.log(e);
          window.alert(
            "게시글 삭제에 실패했습니다. 다시 시도해주시길 바랍니다."
          );
        });
    }
    const fetchArticles = () => {
      listArticle(pageForm)
        .then(() => {
          console.log();
        })
        .catch((e) => {
          console.log(e);
          window.alert("게시글 목록을 불러오는데 실패했습니다.");
        });
    };
  };
  //게시글 수정
  const handleModify = () => {
    navigate(`/articles/modify/${post.id}`);
  };

  // 한국 시차 설정하기
  const getKoreanDateTime = (dateString) => {
    const options = {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleString("ko-KR", options);
  };

  return (
    <div className='article-page-container'>
      {post && (
        <div key={post.id}>
          <h1 className='page-title'>{post.title}</h1>
          <h3 className='page-author'>
            <p>작성자 : {post.writerName}</p>
          </h3>
          <div className='page-views'>
            <p>조회수 : {post.hit}</p>
            <p>좋아요 수 : {post.likedCount}</p>
            <p>작성일자 : {getKoreanDateTime(post.createdDate)}</p>
            <p>수정일자 : {getKoreanDateTime(post.modifiedDate)}</p>
            {isEditable && (
              <p className='page-modify' onClick={() => handleModify(post.id)}>
                수정
              </p>
            )}
            {isEditable && (
              <p className='page-delete' onClick={() => handleDelete(post.id)}>
                삭제
              </p>
            )}
          </div>
          <p className='page-content'>{post.content}</p>
        </div>
      )}
      <CommentCreate postId={post.id} />
    </div>
  );
}

export default ArticlePage;
