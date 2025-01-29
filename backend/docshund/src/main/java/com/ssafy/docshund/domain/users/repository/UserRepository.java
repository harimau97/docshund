package com.ssafy.docshund.domain.users.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ssafy.docshund.domain.users.entity.Provider;
import com.ssafy.docshund.domain.users.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByProviderAndPersonalId(Provider provider, String personalId);

	Optional<User> findByPersonalId(String personalId);
}
