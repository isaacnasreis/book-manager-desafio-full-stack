package com.vgx.bookmanager.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vgx.bookmanager.dtos.BookDTO;
import com.vgx.bookmanager.entities.Book;

@Service
public class BookService {

    public Page<Book> findAll(Pageable pageable) {
        return null;
    }

    public Page<Book> findByTitle(String title, Pageable pageable) {
        return null;
    }

    public Book create(BookDTO bookDTO) {
        return null;
    }

    public Book findById(Long id) {
        return null;
    }

    public Book update(Long id, BookDTO bookDTO) {
        return null;
    }

    public void delete(Long id) {
    }
}
