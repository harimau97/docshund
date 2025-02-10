package com.ssafy.docshund.domain.users.service;

import static com.ssafy.docshund.domain.users.exception.auth.AuthExceptionCode.INVALID_MEMBER_ROLE;
import static com.ssafy.docshund.domain.users.exception.auth.AuthExceptionCode.NOT_AUTHORIZATION_USER;
import static com.ssafy.docshund.domain.users.exception.user.UserExceptionCode.USER_INFO_NOT_FOUND;
import static com.ssafy.docshund.domain.users.exception.user.UserExceptionCode.USER_NOT_FOUND;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ssafy.docshund.domain.users.dto.memo.MemoRequestDto;
import com.ssafy.docshund.domain.users.dto.memo.MemoResponseDto;
import com.ssafy.docshund.domain.users.dto.page.UserAndInfoDto;
import com.ssafy.docshund.domain.users.dto.page.UserProfileDto;
import com.ssafy.docshund.domain.users.dto.page.UserSearchCondition;
import com.ssafy.docshund.domain.users.dto.profile.ProfileRequestDto;
import com.ssafy.docshund.domain.users.dto.profile.UserStatusRequestDto;
import com.ssafy.docshund.domain.users.entity.Memo;
import com.ssafy.docshund.domain.users.entity.User;
import com.ssafy.docshund.domain.users.entity.UserInfo;
import com.ssafy.docshund.domain.users.exception.auth.AuthException;
import com.ssafy.docshund.domain.users.exception.user.UserException;
import com.ssafy.docshund.domain.users.repository.MemoRepository;
import com.ssafy.docshund.domain.users.repository.UserInfoRepository;
import com.ssafy.docshund.domain.users.repository.UserRepository;
import com.ssafy.docshund.global.aws.s3.S3FileUploadService;
import com.ssafy.docshund.global.util.user.UserUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final UserInfoRepository userInfoRepository;
	private final MemoRepository memoRepository;
	private final UserUtil userUtil;
	private final S3FileUploadService fileUploadService;
	private final S3FileUploadService s3FileUploadService;

	@Override
	@Transactional(readOnly = true)
	public Page<UserAndInfoDto> searchUsers(UserSearchCondition condition, Pageable pageable) {
		return userRepository.searchUsers(condition, pageable);
	}

	@Override
	@Transactional(readOnly = true)
	public UserProfileDto getUserProfile(Long userId) {
		UserProfileDto profileUser = userRepository.getProfileUser(userId);
		if (profileUser == null) {
			return null;
		}

		User user = userUtil.getUser();
		if (user == null || !userUtil.isMine(userId, user)) {
			profileUser.setEmail(null);
			profileUser.setIsDarkmode(null);
		}

		return profileUser;
	}

	@Override
	@Transactional
	public void modifyUserProfile(User user, ProfileRequestDto profileRequestDto, MultipartFile file) {
		if (file != null) {
			String profile = s3FileUploadService.uploadFile(file, "profile");
			user.modifyProfileUrl(profile);
		}
		UserInfo userInfo = userInfoRepository.findByUser(user)
			.orElseThrow(() -> new UserException(USER_INFO_NOT_FOUND));
		user.modifyNickname(profileRequestDto.getNickname());
		userInfo.modifyInfo(profileRequestDto);
	}

	@Transactional(readOnly = true)
	public String duplicateNickname(String nickname) {
		return userRepository.existsByNickname(nickname) ? "사용할 수 없는 닉네임입니다." : "사용 가능한 닉네임입니다.";
	}

	@Transactional
	public void modifyUserStatus(Long userId, UserStatusRequestDto userStatusRequestDto) {
		User user = userUtil.getUser();
		if (!userUtil.isAdmin(user)) {
			throw new AuthException(INVALID_MEMBER_ROLE);
		}

		User findUser = userRepository.findById(userId)
			.orElseThrow(() -> new UserException(USER_NOT_FOUND));

		findUser.modifyStatus(userStatusRequestDto.getStatus());
	}

	// 유저가 null 이거나 요청한 유저가 본인이 아닐 때의 예외 처리 + 유저 반환
	private User checkUser(Long userId) {
		User user = userUtil.getUser();
		if (user == null) {
			throw new UserException(USER_NOT_FOUND);
		}
		if (!user.getUserId().equals(userId)) {
			throw new AuthException(NOT_AUTHORIZATION_USER);
		}
		return user;
	}

	// 메모 생성
	@Override
	@Transactional
	public void createMemo(Long userId, MemoRequestDto memoRequestDto) {
		User user = checkUser(userId);

		// 메모 제목, 콘텐츠 비어있을 때 예외 처리
		if (memoRequestDto.getTitle().isEmpty() || memoRequestDto.getContent().isEmpty()) {
			throw new IllegalArgumentException("TITLE OR CONTENT IS EMPTY");
		}

		memoRepository.save(
			new Memo(user, memoRequestDto.getTitle(), memoRequestDto.getContent()));
	}

	// 메모 조회 (일괄)
	@Override
	public List<MemoResponseDto> getMemos(Long userId) {
		User user = checkUser(userId);

		List<Memo> memos = memoRepository.findByUserUserId(userId);

		return memos.stream()
			.map(MemoResponseDto::fromEntity)
			.toList();
	}

	// 메모 조회 (단일)
	@Override
	public MemoResponseDto getMemo(Long userId, Integer memoId) {
		User user = checkUser(userId);

		Memo memo = memoRepository.findByMemoIdAndUserUserId(memoId, userId)
			.orElseThrow(() -> new NoSuchElementException("해당 메모를 찾을 수 없습니다."));

		return MemoResponseDto.fromEntity(memo);
	}

	// 메모 수정
	@Override
	@Transactional
	public void modifyMemo(Long userId, Integer memoId, MemoRequestDto memoRequestDto) {
		User user = checkUser(userId);

		Memo memo = memoRepository.findByMemoIdAndUserUserId(memoId, userId)
			.orElseThrow(() -> new NoSuchElementException("해당 메모를 찾을 수 없습니다."));

		// 제목과 내용이 비어있는 경우 예외 발생
		if (memoRequestDto.getTitle().isEmpty() || memoRequestDto.getContent().isEmpty()) {
			throw new IllegalArgumentException("TITLE OR CONTENT IS EMPTY");
		}

		memo.modifyMemo(memoRequestDto.getTitle(), memoRequestDto.getContent());
		memoRepository.save(memo);
	}

	// 메모 삭제
	@Override
	@Transactional
	public void deleteMemo(Long userId, Integer memoId) {
		User user = checkUser(userId);

		Memo memo = memoRepository.findByMemoIdAndUserUserId(memoId, userId)
			.orElseThrow(() -> new NoSuchElementException("해당 메모를 찾을 수 없습니다."));

		memoRepository.delete(memo);
	}
}
