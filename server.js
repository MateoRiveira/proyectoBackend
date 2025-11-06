//servidor
import express from 'express'
const app = express();
const PORT= 8080;
//para poder leer json.
app.use(express.json());
//simulamos una base de datos

let productos = [
    {
        id: 1,
        title: "Laptop HP Pavilion 15",
        description: "Laptop de 15 pulgadas con procesador Intel Core i5, 8GB RAM, 256GB SSD",
        code: "LAP-HP-PAV-001",
        price: 899.99,
        status: true,
        stock: 25,
        category: "Electrónica",
        thumbnails: ["/thumbnails/pavilion15.jpg"]
      
    },
      
    {
        id: 2,
        title: "Smartphone Samsung Galaxy S23",
        description: "Teléfono inteligente con pantalla AMOLED de 6.1 pulgadas, 128GB almacenamiento",
        code: "PHN-SAM-S23-001",
        price: 799.99,
        status: true,
        stock: 50,
        category: "Electrónica",
        thumbnails: ["/images/galaxy-s23-1.jpg", "/images/galaxy-s23-2.jpg", "/images/galaxy-s23-3.jpg"]
    },
    {
        id: 3,
        title: "Auriculares Sony WH-1000XM5",
        description: "Auriculares inalámbricos con cancelación de ruido activa y batería de 30 horas",
        code: "AUD-SON-WH-001",
        price: 399.99,
        status: true,
        stock: 30,
        category: "Audio",
        thumbnails: ["/images/sony-headphones-1.jpg", "/images/sony-headphones-2.jpg"]
    },
    {
        id: 4,
        title: "Smart TV LG 55 pulgadas",
        description: "Televisor 4K Ultra HD con tecnología OLED y sistema operativo webOS",
        code: "TV-LG-55-001",
        price: 1299.99,
        status: true,
        stock: 15,
        category: "Electrónica",
        thumbnails: ["/images/lg-tv-1.jpg", "/images/lg-tv-2.jpg", "/images/lg-tv-3.jpg"]
    },
    {
        id: 5,
        title: "Mouse Logitech MX Master 3",
        description: "Mouse inalámbrico ergonómico con sensor de alta precisión y batería recargable",
        code: "MOU-LOG-MX-001",
        price: 99.99,
        status: true,
        stock: 75,
        category: "Periféricos",
        thumbnails: ["/images/logitech-mouse-1.jpg", "/images/logitech-mouse-2.jpg"]
    },
    {
        id: 6,
        title: "Teclado Mecánico Corsair K70",
        description: "Teclado mecánico RGB con switches Cherry MX y reposamuñecas magnético",
        code: "KEY-COR-K70-001",
        price: 149.99,
        status: true,
        stock: 40,
        category: "Periféricos",
        thumbnails: ["/images/corsair-keyboard-1.jpg", "/images/corsair-keyboard-2.jpg"]
    },
    {
        id: 7,
        title: "Tablet Apple iPad Air",
        description: "Tablet de 10.9 pulgadas con chip M1, 64GB almacenamiento y pantalla Liquid Retina",
        code: "TAB-APP-IPAD-001",
        price: 599.99,
        status: true,
        stock: 35,
        category: "Electrónica",
        thumbnails: ["/images/ipad-air-1.jpg", "/images/ipad-air-2.jpg"]
    },
    {
        id: 8,
        title: "Cámara Canon EOS R6",
        description: "Cámara mirrorless full frame con sensor de 20.1MP y grabación de video 4K",
        code: "CAM-CAN-R6-001",
        price: 2499.99,
        status: true,
        stock: 10,
        category: "Fotografía",
        thumbnails: ["/images/canon-r6-1.jpg", "/images/canon-r6-2.jpg", "/images/canon-r6-3.jpg"]
    },
    {
        id: 9,
        title: "Monitor Dell UltraSharp 27",
        description: "Monitor 4K de 27 pulgadas con tecnología IPS y calibración de color profesional",
        code: "MON-DEL-27-001",
        price: 549.99,
        status: true,
        stock: 20,
        category: "Periféricos",
        thumbnails: ["/images/dell-monitor-1.jpg", "/images/dell-monitor-2.jpg"]
    },
    {
        id: 10,
        title: "Altavoz Bluetooth JBL Flip 6",
        description: "Altavoz portátil resistente al agua con sonido estéreo y batería de 12 horas",
        code: "SPK-JBL-FLIP-001",
        price: 129.99,
        status: true,
        stock: 60,
        category: "Audio",
        thumbnails: ["/images/jbl-flip-1.jpg", "/images/jbl-flip-2.jpg"]
    },
    {
        id: 11,
        title: "Disco Duro Externo Seagate 2TB",
        description: "Disco duro externo portátil USB 3.0 con capacidad de 2TB para respaldo de datos",
        code: "HDD-SEA-2TB-001",
        price: 79.99,
        status: true,
        stock: 100,
        category: "Almacenamiento",
        thumbnails: ["/images/seagate-hdd-1.jpg"]
    },
    {
        id: 12,
        title: "SSD Samsung 970 EVO Plus 1TB",
        description: "Unidad de estado sólido NVMe M.2 con velocidad de lectura de hasta 3500MB/s",
        code: "SSD-SAM-970-001",
        price: 119.99,
        status: true,
        stock: 80,
        category: "Almacenamiento",
        thumbnails: ["/images/samsung-ssd-1.jpg", "/images/samsung-ssd-2.jpg"]
    },
    {
        id: 13,
        title: "Webcam Logitech C920",
        description: "Cámara web Full HD 1080p con micrófono estéreo integrado y corrección de luz automática",
        code: "CAM-LOG-C920-001",
        price: 89.99,
        status: true,
        stock: 45,
        category: "Periféricos",
        thumbnails: ["/images/logitech-webcam-1.jpg"]
    },
    {
        id: 14,
        title: "Smartwatch Apple Watch Series 9",
        description: "Reloj inteligente con pantalla Always-On, GPS y monitor de salud avanzado",
        code: "WAT-APP-S9-001",
        price: 399.99,
        status: true,
        stock: 30,
        category: "Wearables",
        thumbnails: ["/images/apple-watch-1.jpg", "/images/apple-watch-2.jpg"]
    },
    {
        id: 15,
        title: "Consola PlayStation 5",
        description: "Consola de videojuegos de última generación con SSD ultrarrápido y Ray Tracing",
        code: "CON-PS5-001",
        price: 499.99,
        status: true,
        stock: 12,
        category: "Gaming",
        thumbnails: ["/images/ps5-1.jpg", "/images/ps5-2.jpg", "/images/ps5-3.jpg"]
    },
    {
        id: 16,
        title: "Router WiFi 6 ASUS AX6000",
        description: "Router inalámbrico de doble banda con WiFi 6 y velocidad de hasta 6000Mbps",
        code: "ROU-ASU-AX6-001",
        price: 299.99,
        status: true,
        stock: 25,
        category: "Redes",
        thumbnails: ["/images/asus-router-1.jpg", "/images/asus-router-2.jpg"]
    },
    {
        id: 17,
        title: "Impresora Epson EcoTank L3250",
        description: "Impresora multifuncional con sistema de tanque de tinta y conectividad WiFi",
        code: "PRN-EPS-ECO-001",
        price: 249.99,
        status: true,
        stock: 18,
        category: "Oficina",
        thumbnails: ["/images/epson-printer-1.jpg", "/images/epson-printer-2.jpg"]
    },
    {
        id: 18,
        title: "Micrófono Blue Yeti USB",
        description: "Micrófono USB condensador con múltiples patrones polares para streaming y podcasting",
        code: "MIC-BLU-YET-001",
        price: 129.99,
        status: true,
        stock: 35,
        category: "Audio",
        thumbnails: ["/images/blue-yeti-1.jpg", "/images/blue-yeti-2.jpg"]
    },
    {
        id: 19,
        title: "Lámpara LED Inteligente Philips Hue",
        description: "Bombilla LED inteligente con cambio de color y control por aplicación móvil",
        code: "LAM-PHI-HUE-001",
        price: 49.99,
        status: true,
        stock: 90,
        category: "Hogar Inteligente",
        thumbnails: ["/images/philips-hue-1.jpg"]
    },
    {
        id: 20,
        title: "Drone DJI Mini 3 Pro",
        description: "Drone compacto con cámara 4K, estabilización de 3 ejes y batería de 47 minutos",
        code: "DRN-DJI-MIN-001",
        price: 899.99,
        status: true,
        stock: 8,
        category: "Drones",
        thumbnails: ["/images/dji-mini-1.jpg", "/images/dji-mini-2.jpg", "/images/dji-mini-3.jpg"]
    }
]


//ruta principal
app.get('/', (request,res)=>{
    res.json(productos)
});


//crear un nuevo producto
app.post('/productos', (request,res)=>{ 
    const{title, description, code, price, status, stock, category, thumbnails}= request.body;
    if(!title || !description || !code || !price || !status || !stock || !category || !thumbnails){ 
        return res.status(400).json({error:"faltan campos obligatorios"})
    }
    const nuevoProducto= {
        id:productos.length? productos[productos.length -1].id +1:1, title, description, code, price, status, stock, category, thumbnails,
    };
    productos.push(nuevoProducto)
    return res.status(201).json({mensaje:"producto creado exitosamente", producto:nuevoProducto})
})

app.listen(PORT, ()=>{
    console.log(`SERVIDOR ESTA CORRIENDO EN http://localhost:${PORT}`)
})