export const API = {
  baseUrl: 'http://localhost:8000/api',

  async getAllProducts() {
    try {
      const response = await fetch(`${this.baseUrl}/productos`);
      const data = await response.json();
      // Map API data to Frontend format: 
      // The frontend expects p.tipo, p.marca, p.img, p.categoria, p.precio, p.descripcion
      return data.map(p => {
        // We simulate the frontend structure based on the "nombre" field
        const parts = p.nombre.split(' - ');
        const marca = parts[0] || 'Marca';
        const tipo = parts[1] || p.nombre;
        let categoriaName = p.categoria ? p.categoria.nombre : 'cosmetica';
        
        // El frontend ui.js concatena: `./img/${p.categoria}/${p.img}`
        // Ajustamos p.categoria para que coincida con las carpetas exactas:
        if (categoriaName === 'perfumes') categoriaName = 'perfume';
        if (categoriaName === 'cabello') categoriaName = 'Champus';
        if (categoriaName === 'cuerpo') categoriaName = 'Cepillos';
        
        return {
          id: p.id,
          tipo: tipo,
          marca: marca,
          precio: parseFloat(p.precio),
          img: p.img || 'default.jpg',
          categoria: categoriaName,
          descripcion: p.nombre
        };
      });
    } catch (error) {
      console.error("Error cargando productos:", error);
      return [];
    }
  },

  async login(email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) throw new Error('Login fallido');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async register(data) {
    try {
      const response = await fetch(`${this.baseUrl}/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Registro fallido');
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  async saveOrder(cliente_id, cartItems, total) {
    try {
      // 1. Create order
      const orderResp = await fetch(`${this.baseUrl}/pedidos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fecha: new Date().toISOString().split('T')[0],
          total: total,
          cliente_id: cliente_id
        })
      });
      const order = await orderResp.json();

      // 2. Create details
      for (const item of cartItems) {
        await fetch(`${this.baseUrl}/detalles`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            pedido_id: order.id,
            producto_id: item.id,
            cantidad: item.quantity || 1, // Depending on cart structure
            precio_unit: item.precio
          })
        });
      }

      // 3. Save cart to history
      const cartResp = await fetch(`${this.baseUrl}/carritos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fecha: new Date().toISOString().split('T')[0],
          cliente_id: cliente_id
        })
      });
      const cart = await cartResp.json();

      for (const item of cartItems) {
        await fetch(`${this.baseUrl}/carritos/${cart.id}/productos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            producto_id: item.id,
            cantidad: item.quantity || 1,
            pxq: (item.quantity || 1) * item.precio
          })
        });
      }
      return true;
    } catch (error) {
      console.error("Error al guardar pedido", error);
      return false;
    }
  }
};
