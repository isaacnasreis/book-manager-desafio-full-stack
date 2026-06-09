package com.vgx.bookmanager.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class RootController {

    @GetMapping("/")
    public ResponseEntity<Map<String, String>> root() {
        return ResponseEntity.ok(Map.of(
            "name", "Book Manager API",
            "status", "online",
            "docs", "/swagger-ui.html",
            "message", "Welcome to Book Manager API. Please authenticate to access the endpoints."
        ));
    }
}
