package com.ssafy.docshund.domain.forums.service;

import java.util.List;

import com.ssafy.docshund.domain.forums.dto.CommentInfoDto;

public interface CommentService {

    List<CommentInfoDto> getCommentsByArticleId(Integer articleId);

    List<CommentInfoDto> getCommentsByUserId(Long userId);
}
