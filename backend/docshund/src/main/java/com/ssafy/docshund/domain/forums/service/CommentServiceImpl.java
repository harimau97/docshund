package com.ssafy.docshund.domain.forums.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ssafy.docshund.domain.forums.dto.CommentInfoDto;
import com.ssafy.docshund.domain.forums.entity.Comment;
import com.ssafy.docshund.domain.forums.repository.CommentRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;

    @Override
    public List<CommentInfoDto> getCommentsByArticleId(Integer articleId) {

        List<Comment> comments = commentRepository.findAllByArticleId(articleId);

        return comments.stream()
                .map(CommentInfoDto::from)
                .flatMap(Optional::stream)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommentInfoDto> getCommentsByUserId(Long userId) {

        List<Comment> comments = commentRepository.findAllByUserId(userId);

        return comments.stream()
                .map(CommentInfoDto::from)
                .flatMap(Optional::stream)
                .collect(Collectors.toList());
    }
}
