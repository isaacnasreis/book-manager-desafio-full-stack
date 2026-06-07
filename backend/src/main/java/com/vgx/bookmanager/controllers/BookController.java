package com.vgx.bookmanager.controllers;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import com.vgx.bookmanager.entities.Book;
// import com.vgx.bookmanager.services.BookService; // A ser criado
// import com.vgx.bookmanager.dtos.BookDTO; // A ser criado

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class BookController {

    // private final BookService bookService; // Descomentar quando o serviço for criado

    @GetMapping("/books")
    public ResponseEntity<?> listBooks(
            @RequestParam(required = false) String title,
            Pageable pageable) {
        // if (title != null && !title.isBlank()) {
        //     return ResponseEntity.ok(bookService.findByTitle(title, pageable));
        // }
        // return ResponseEntity.ok(bookService.findAll(pageable));
        return ResponseEntity.ok().build(); // Temporário
    }

    @PostMapping("/books/create")
    public ResponseEntity<?> createBook(/* @Valid @RequestBody BookDTO bookDTO */) {
        // Book createdBook = bookService.create(bookDTO);
        // return ResponseEntity.status(HttpStatus.CREATED).body(createdBook);
        return ResponseEntity.status(HttpStatus.CREATED).build(); // Temporário
    }

    @GetMapping("/books/{id}")
    public ResponseEntity<?> getBook(@PathVariable Long id) {
        // return ResponseEntity.ok(bookService.findById(id));
        return ResponseEntity.ok().build(); // Temporário
    }

    @PutMapping("/books/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id /*, @Valid @RequestBody BookDTO bookDTO */) {
        // return ResponseEntity.ok(bookService.update(id, bookDTO));
        return ResponseEntity.ok().build(); // Temporário
    }

    @DeleteMapping("/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        // bookService.delete(id);
        return ResponseEntity.noContent().build();
    }
}