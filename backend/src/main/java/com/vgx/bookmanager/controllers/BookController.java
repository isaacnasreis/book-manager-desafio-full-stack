package com.vgx.bookmanager.controllers;

import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import com.vgx.bookmanager.entities.Book;
import com.vgx.bookmanager.services.BookService;
import com.vgx.bookmanager.dtos.BookDTO;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@SecurityRequirement(name = "Bearer Authentication")
public class BookController {

    private final BookService bookService;

    @GetMapping("/books")
    public ResponseEntity<?> listBooks(
            @RequestParam(required = false) String title,
            Pageable pageable) {
        if (title != null && !title.isBlank()) {
            return ResponseEntity.ok(bookService.findByTitle(title, pageable));
        }
        return ResponseEntity.ok(bookService.findAll(pageable));
    }

    @PostMapping("/books/create")
    public ResponseEntity<?> createBook(@Valid @RequestBody BookDTO bookDTO) {
        Book createdBook = bookService.create(bookDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<?> getBook(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.findById(id));
    }

    @PutMapping("/books/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @Valid @RequestBody BookDTO bookDTO) {
        Book updatedBook = bookService.update(id, bookDTO);
        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        bookService.delete(id);
        return ResponseEntity.noContent().build();
    }
}