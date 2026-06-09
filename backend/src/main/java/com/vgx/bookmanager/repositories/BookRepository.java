package com.vgx.bookmanager.repositories;

import com.vgx.bookmanager.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.vgx.bookmanager.entities.User;
import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

    Page<Book> findByUser(User user, Pageable pageable);

    Page<Book> findByUserAndTitleContainingIgnoreCase(User user, String title, Pageable pageable);

    Optional<Book> findByIdAndUser(Long id, User user);
}