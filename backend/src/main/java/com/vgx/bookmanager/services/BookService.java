package com.vgx.bookmanager.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.vgx.bookmanager.dtos.BookDTO;
import com.vgx.bookmanager.entities.Book;
import com.vgx.bookmanager.entities.User;
import com.vgx.bookmanager.repositories.BookRepository;
import com.vgx.bookmanager.repositories.UserRepository;
import com.vgx.bookmanager.exceptions.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@SuppressWarnings("null")
public class BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    private User getCurrentUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário autenticado não encontrado."));
    }

    public Page<Book> findAll(Pageable pageable) {
        User user = getCurrentUser();
        return bookRepository.findByUser(user, pageable);
    }

    public Page<Book> findByTitle(String title, Pageable pageable) {
        User user = getCurrentUser();
        if (title == null || title.isBlank()) {
            return bookRepository.findByUser(user, pageable);
        }
        return bookRepository.findByUserAndTitleContainingIgnoreCase(user, title, pageable);
    }

    public Book findById(Long id) {
        User user = getCurrentUser();
        return bookRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new ResourceNotFoundException("Livro não encontrado ou você não tem permissão para acessá-lo. ID: " + id));
    }

    public Book create(BookDTO bookDTO) {
        User user = getCurrentUser();
        Book book = new Book();
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setYear(bookDTO.getYear());
        book.setDescription(bookDTO.getDescription());
        book.setUser(user);
        return bookRepository.save(book);
    }

    public Book update(Long id, BookDTO bookDTO) {
        Book book = findById(id);
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setYear(bookDTO.getYear());
        book.setDescription(bookDTO.getDescription());
        return bookRepository.save(book);
    }

    public void delete(Long id) {
        Book book = findById(id);
        bookRepository.delete(book);
    }
}
