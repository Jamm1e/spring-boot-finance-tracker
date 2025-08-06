import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Container, Row, Col, Badge } from 'react-bootstrap';

export default function Transactions() {
    const [transactions, setTransactions] = useState([]);
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: ''
    });
    const [editingId, setEditingId] = useState(null);
    const userId = "testuser123"; // Hardcode userId for a single-user demo

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = () => {
        axios.get(`http://localhost:8080/transactions/${userId}`) // Corrected endpoint
        .then(response => {
            setTransactions(response.data);
        })
        .catch(error => console.error("Error fetching transactions:", error));
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/transactions/${id}`);
            fetchTransactions();
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    const handleEdit = (tx) => {
        setEditingId(tx.id);
        setFormData({
            amount: tx.amount,
            category: tx.category,
            description: tx.description
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ amount: '', category: '', description: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add userId to the formData before sending
        const dataWithUserId = { ...formData, userId };
        
        if (editingId) {
            axios.put(`http://localhost:8080/transactions/${editingId}`, dataWithUserId)
                .then(() => {
                    handleCancel();
                    fetchTransactions();
                })
                .catch(error => console.error("Error updating transaction:", error));
        } else {
            axios.post('http://localhost:8080/transactions', dataWithUserId)
                .then(() => {
                    setFormData({ amount: '', category: '', description: '' });
                    fetchTransactions();
                })
                .catch(error => console.error("Error submitting transaction:", error));
        }
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4 text-center text-light">Transactions</h2>
            <Card className="mb-5 shadow-sm rounded-4 custom-card animate__fadeInUp">
                <Card.Body>
                    <Card.Title className="text-primary-dark mb-4">{editingId ? 'Edit Transaction' : 'Add New Transaction'}</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Row className="g-3">
                            <Col md={3}>
                                <Form.Control
                                    type="number"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder="Amount"
                                    required
                                />
                            </Col>
                            <Col md={3}>
                                <Form.Control
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="Category"
                                    required
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    required
                                />
                            </Col>
                            <Col md={2} className="d-flex gap-2">
                                <Button type="submit" variant="primary" className="w-100">
                                    {editingId ? 'Update' : 'Add'}
                                </Button>
                                {editingId && (
                                    <Button type="button" variant="outline-secondary" onClick={handleCancel} className="w-100">
                                        Cancel
                                    </Button>
                                )}
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <Row className="g-4">
                {transactions.length === 0 ? (
                    <Col className="text-center text-muted mt-5">
                        <p>No transactions found. Add a new one to get started!</p>
                    </Col>
                ) : (
                    transactions.map((tx, index) => (
                        <Col md={6} lg={4} key={tx.id} className="mb-3 animate__fadeInUp" style={{ animationDelay: `${0.1 * index}s` }}>
                            <Card className="custom-card">
                                <Card.Body>
                                    <Card.Title className="text-primary-dark d-flex justify-content-between align-items-center">
                                        <span>${tx.amount}</span>
                                        <Badge bg="info">{tx.category}</Badge>
                                    </Card.Title>
                                    <Card.Text className="text-secondary-dark">{tx.description}</Card.Text>
                                    <div className="d-flex gap-2 mt-3">
                                        <Button variant="outline-info" size="sm" onClick={() => handleEdit(tx)}>
                                            Edit
                                        </Button>
                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(tx.id)}>
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}
