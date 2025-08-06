import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button, Spinner } from 'react-bootstrap';

export default function Insights() {
    const [transactions, setTransactions] = useState([]);
    const [goals, setGoals] = useState([]);
    const [aiInsights, setAiInsights] = useState('');
    const [loading, setLoading] = useState(false);
    // Hardcoded userId to match the backend controller's expectations
    const userId = "testuser123";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [transactionsRes, goalsRes] = await Promise.all([
                    axios.get(`http://localhost:8080/transactions/${userId}`),
                    axios.get(`http://localhost:8080/goals/${userId}`)
                ]);
                setTransactions(transactionsRes.data);
                setGoals(goalsRes.data);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };
        fetchData();
    }, []);

    const handleAIInsights = async () => {
        setLoading(true);
        setAiInsights('');
        try {
            const res = await axios.post('http://localhost:3001/analyze', {
                transactions,
                goals,
            });
            const insightsText = res.data.insights;
            setAiInsights(insightsText);
        } catch (error) {
            console.error("Error fetching AI insights:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            <h2 className="mb-4 text-center text-light">Financial Insights</h2>
            
            <Row className="mb-4 justify-content-center animate__fadeInUp">
                <Col xs={12} md={6} lg={4} className="text-center">
                    <Button onClick={handleAIInsights} variant="primary" disabled={loading} className="w-100">
                        {loading ? (
                            <>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                                Generating...
                            </>
                        ) : (
                            'Generate AI Insights'
                        )}
                    </Button>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col md={8}>
                    {loading && (
                        <Card className="mt-4 custom-card animate__fadeInUp">
                            <Card.Body className="text-center text-primary-dark">
                                <Spinner animation="border" role="status" className="me-2" style={{ color: 'var(--color-accent-blue)' }} />
                                Generating insights...
                            </Card.Body>
                        </Card>
                    )}

                    {!loading && aiInsights && (
                        <Card className="mt-4 shadow-sm custom-card animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
                            <Card.Body>
                                <Card.Title className="text-primary-dark">AI-Generated Insights</Card.Title>
                                <hr style={{ borderColor: 'var(--color-text-dark)' }}/>
                                <Card.Text className="text-secondary-dark" style={{ whiteSpace: 'pre-line' }}>
                                    {aiInsights}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                    
                    {!loading && !aiInsights && (
                        <Card className="mt-4 shadow-sm custom-card animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
                            <Card.Body className="text-center text-muted">
                                Click "Generate AI Insights" to get started.
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
