import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useState } from 'react';

function CategoryPage() {
  const { categoryName } = useParams();
  const [cart, setCart] = useState({});

  // Sahte ürün verileri (görselli)
  const fakeProducts = {
    "tatlilar": [
      { id: 1, name: "Tiramisu", price: 40, image: "/images/tiramisu.jpg" },
      { id: 2, name: "Sufle", price: 35, image: "/images/sufle.jpg" },
      { id: 3, name: "Cheesecake", price: 45, image: "/images/cheesecake.jpg" }
    ],
    "kahvalti": [
      { id: 4, name: "Serpme Kahvaltı", price: 110, image: "/images/serpme.jpg" },
      { id: 5, name: "Menemen", price: 45, image: "/images/menemen.jpg" }
    ]
  };

  const products = fakeProducts[categoryName] || [];

  const addToCart = (productId) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-capitalize">{categoryName.replace(/-/g, ' ')}</h3>

      <Row xs={1} sm={2} md={3} className="g-4">
        {products.map(product => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm border-0 position-relative">
              <Card.Img
                variant="top"
                src={product.image}
                style={{ height: "180px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="mb-2">{product.name}</Card.Title>
                <Card.Text>{product.price} ₺</Card.Text>
              </Card.Body>

              {/* + butonu */}
              <Button
                onClick={() => addToCart(product.id)}
                variant="success"
                className="position-absolute"
                style={{ bottom: "10px", right: "10px", borderRadius: "50%", width: "40px", height: "40px", fontSize: "1.2rem" }}
              >
                +
              </Button>

              {/* Ürün miktarı gösterimi */}
              {cart[product.id] && (
                <span
                  className="position-absolute bg-dark text-white rounded-circle d-flex justify-content-center align-items-center"
                  style={{ bottom: "10px", left: "10px", width: "28px", height: "28px", fontSize: "0.9rem" }}
                >
                  {cart[product.id]}
                </span>
              )}
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CategoryPage;
