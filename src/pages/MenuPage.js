import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function MenuPage() {
    const [tableId, setTableId] = useState(null);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const table = params.get('table');
        setTableId(table);
    }, []);

    const menuData = [
        {
            category: "🍰 Tatlılar",
            products: [
                { id: 1, name: "Tiramisu", description: "Kremalı tatlı", price: 40, image: "/images/product0.jpg" },
                { id: 2, name: "Sufle", description: "Akışkan çikolata", price: 35, image: "/images/product1.jpg" },
                { id: 3, name: "Cheesecake", description: "Orman meyveli", price: 42, image: "/images/product2.jpg" }
            ]
        },
        {
            category: "🍗 Ana Yemekler",
            products: [
                { id: 4, name: "Adana Kebap", description: "Acılı, közlenmiş biberle", price: 60, image: "/images/product3.jpg" },
                { id: 5, name: "Izgara Köfte", description: "6 parça, pilav yanında", price: 55, image: "/images/product4.jpg" },
                { id: 6, name: "Tavuk Şiş", description: "Izgara tavuk şiş", price: 50, image: "/images/product5.jpg" }
            ]
        },
        {
            category: "🥤 İçecekler",
            products: [
                { id: 7, name: "Kola", description: "330ml kutu", price: 20, image: "/images/product6.jpg" },
                { id: 8, name: "Ayran", description: "Yoğurtlu içecek", price: 12, image: "/images/product7.jpg" },
                { id: 9, name: "Çay", description: "Demleme çay", price: 8, image: "/images/product8.jpg" }
            ]
        }
    ];
    const [showDetails, setShowDetails] = useState(false);
    const toggleDetails = () => {
        setShowDetails(prev => !prev);
    };


    const increaseQuantity = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }));
    };

    const handleAddToCart = () => {
        const cartItems = [];

        menuData.forEach(section => {
            section.products.forEach(product => {
                const amount = quantities[product.id];
                if (amount && amount > 0) {
                    cartItems.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: amount,
                        image: product.image
                    });
                }
            });
        });

        console.log("Sepet:", cartItems);
    };

    const decreaseQuantity = (id) => {
        setQuantities(prev => {
            const newQty = (prev[id] || 0) - 1;
            const updated = { ...prev, [id]: newQty < 0 ? 0 : newQty };
            if (updated[id] === 0) delete updated[id];
            return updated;
        });
    };


    return (
        <Container className="mt-3">

            {/* HEADER */}
            <div
                className="d-flex align-items-center justify-content-between px-3 py-2 mb-4"
                style={{
                    backgroundColor: "#ffffffff",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    position: "sticky",
                    top: 0,
                    zIndex: 1000
                }}
            >
                <div className="d-flex align-items-center gap-2">
                    <img
                        src="/images/logo.png"
                        alt="Logo"
                        style={{ height: "40px", width: "40px", objectFit: "contain", borderRadius: "8px" }}
                    />
                    <h5 className="mb-0 fw-semibold text-dark">QR Menü</h5>
                </div>
                <div className="text-end">
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>Masa No</div>
                    <div className="fw-bold text-primary">{tableId || "-"}</div>
                </div>
            </div>

            {/* MENÜ */}
            {menuData.map((section, idx) => (
                <div key={idx} className="mb-5">
                    <h5 className="text-dark border-start border-4 ps-3 mb-3" style={{ borderColor: "#0d6efd", fontWeight: "600" }}>
                        {section.category}
                    </h5>
                    <Row className="g-4 mt-2">
                        {section.products.map(product => (
                            <Col key={product.id} xs={12}>
                                <Card
                                    className="flex-row shadow-sm border-0 align-items-center"
                                    style={{
                                        borderRadius: "12px",
                                        backgroundColor: "#fff",
                                        transition: "transform 0.2s ease"
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <Card.Img
                                        src={product.image}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                            borderRadius: "12px 0 0 12px"
                                        }}
                                    />
                                    <Card.Body>
                                        <Card.Title className="mb-1">{product.name}</Card.Title>
                                        <Card.Text className="mb-1 text-muted" style={{ fontSize: "0.9rem" }}>
                                            {product.description}
                                        </Card.Text>
                                        <Card.Text className="mb-0 fw-bold">{product.price} ₺</Card.Text>
                                    </Card.Body>
                                    <div className="me-3 mb-2 text-end d-flex flex-column align-items-center">
                                        <div className="d-flex align-items-center gap-2">
                                            {/* - Butonu */}
                                            {quantities[product.id] >= 1 && (
                                                <Button
                                                    variant="danger"
                                                    style={{
                                                        borderRadius: "50%",
                                                        width: "32px",
                                                        height: "32px",
                                                        fontSize: "1rem",
                                                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                                        transition: "transform 0.2s"
                                                    }}
                                                    onClick={() => decreaseQuantity(product.id)}
                                                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                                >
                                                    −
                                                </Button>
                                            )}

                                            {/* + Butonu */}
                                            <Button
                                                variant="success"
                                                style={{
                                                    borderRadius: "50%",
                                                    width: "36px",
                                                    height: "36px",
                                                    fontSize: "1.1rem",
                                                    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                                    transition: "transform 0.2s"
                                                }}
                                                onClick={() => increaseQuantity(product.id)}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.2)'}
                                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                                +
                                            </Button>
                                        </div>

                                        {/* Miktar */}
                                        {quantities[product.id] > 0 && (
                                            <div className="mt-1 text-center fw-bold">{quantities[product.id]}</div>
                                        )}
                                    </div>

                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            ))}

            {/* ALT SABİT BUTON */}
            {/* 📦 Alt Sabit Bar (Detaylar + Buton) */}
            <div
                style={{
                    position: "sticky",
                    bottom: 0,
                    backgroundColor: "#ffffff",
                    borderTop: "1px solid #eee",
                    boxShadow: "0 -2px 8px rgba(0,0,0,0.03)",
                    zIndex: 999,
                    transition: "all 0.3s ease",
                    padding: showDetails ? "16px 16px 20px" : "8px 16px"
                }}
            >
                {/* 📌 Sipariş Detayları Başlığı */}
                <div
                    onClick={toggleDetails}
                    className="text-center text-primary fw-semibold mb-2"
                    style={{ cursor: "pointer" }}
                >
                    Sipariş Detayları {showDetails ? "⌄" : "⌃"}
                </div>

                {/* 📋 Detay Paneli (içte gösteriliyor) */}
                {showDetails && (
                    <div style={{
                        backgroundColor: "#f8f9fa",
                        padding: "10px",
                        borderRadius: "8px",
                        maxHeight: "200px",
                        overflowY: "auto",
                        marginBottom: "10px"
                    }}>
                        {Object.keys(quantities).filter(id => quantities[id] > 0).length === 0 ? (
                            <p className="text-muted text-center">Sepetiniz boş.</p>
                        ) : (
                            <>
                                <ul className="list-unstyled mb-2">
                                    {menuData.flatMap(section =>
                                        section.products
                                            .filter(product => quantities[product.id] > 0)
                                            .map(product => (
                                                <li key={product.id} className="d-flex justify-content-between mb-1">
                                                    <span>{product.name} x {quantities[product.id]}</span>
                                                    <span>{product.price * quantities[product.id]} ₺</span>
                                                </li>
                                            ))
                                    )}
                                </ul>
                                <div className="fw-bold text-end">
                                    Toplam: {menuData.reduce((total, section) =>
                                        total + section.products.reduce((sub, p) =>
                                            sub + (quantities[p.id] || 0) * p.price, 0), 0
                                    )} ₺
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* 🛒 Siparişi Tamamla Butonu */}
                <Button variant="primary" size="lg" onClick={handleAddToCart} style={{ width: "100%" }}>
                    🛒 Siparişi Tamamla
                </Button>

            </div>
        </Container>
    );
}

export default MenuPage;
