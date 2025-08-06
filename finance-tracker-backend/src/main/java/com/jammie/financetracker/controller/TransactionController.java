package com.jammie.financetracker.controller;

import com.jammie.financetracker.model.Transaction;
import com.jammie.financetracker.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = "http://localhost:5173") // Ensure CORS is enabled for your frontend
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/{userId}")
    public List<Transaction> getUserTransactions(@PathVariable String userId) {
        return transactionRepository.findByUserId(userId);
    }

    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        if (transaction.getUserId() == null || transaction.getUserId().isEmpty()) {
            throw new IllegalArgumentException("userId is required");
        }

        transaction.setDate(LocalDate.now());
        return transactionRepository.save(transaction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransaction(@PathVariable Long id) {
        transactionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id, @RequestBody Transaction updatedTx) {
        return transactionRepository.findById(id)
                .map(tx -> {
                    tx.setAmount(updatedTx.getAmount());
                    tx.setCategory(updatedTx.getCategory());
                    tx.setDescription(updatedTx.getDescription());
                    tx.setDate(updatedTx.getDate());
                    tx.setUserId(updatedTx.getUserId());

                    Transaction savedTx = transactionRepository.save(tx);
                    return ResponseEntity.ok(savedTx);
                })
                .orElse(ResponseEntity.notFound().build());
    }

}
