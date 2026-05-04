export const API = {
  baseUrl: "http://127.0.0.1:8000/api",

  async getAllProducts() {
    try {
      const response = await fetch(`${this.baseUrl}/productos`);
      const data = await response.json();
      // Map API data to Frontend format:
      // The frontend expects p.tipo, p.marca, p.img, p.categoria, p.precio, p.descripcion
      return data.map((p) => {
        const parts = p.nombre.split(" - ");
        const marca = parts[0] || "Marca";
        const tipo = parts[1] || p.nombre;

        // Map categoria_id to the folder names used in ./img/${categoria}/${img}
        const categoriaMap = {
          1: "cepillos",
          2: "champus",
          3: "makeup",
          4: "perfume",
          5: "skincare",
        };

        const categoriaName = categoriaMap[p.categoria_id] || "cosmetica";

        return {
          id: p.id,
          tipo: tipo,
          marca: marca,
          precio: parseFloat(p.precio),
          img: p.img || "default.jpg",
          categoria: categoriaName,
          categoria_id: p.categoria_id,
          label: p.categoria ? p.categoria.nombre : categoriaName,
          descripcion: p.nombre,
        };
      });
    } catch (error) {
      console.error("Error cargando productos:", error);
      return [];
    }
  },

  async checkEmail(email) {
    try {
      const response = await fetch(`${this.baseUrl}/check-email?email=${email}`);
      const result = await response.json();
      return result; // { exists: true/false }
    } catch (error) {
      console.error(error);
      return { exists: false, error: "Error al verificar email: " + error.message };
    }
  },

  async login(email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) return { error: result.error || "Credenciales inválidas" };
      return result;
    } catch (error) {
      console.error(error);
      return { error: "Error de conexión: " + error.message };
    }
  },

  async register(data) {
    try {
      const response = await fetch(`${this.baseUrl}/clientes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("content-type");
      let result;
      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        return { error: `Error del servidor (no JSON): ${response.status} ${text.substring(0, 100)}` };
      }

      if (!response.ok) return { error: result.error || "Error desconocido en el servidor" };
      return result;
    } catch (error) {
      console.error(error);
      return { error: "No se pudo conectar con el servidor: " + error.message };
    }
  },

  async saveOrder(cliente_id, cartItems, total) {
    try {
      // 1. Create order
      const orderResp = await fetch(`${this.baseUrl}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fecha: new Date().toISOString().split("T")[0],
          total: total,
          cliente_id: cliente_id,
        }),
      });
      const order = await orderResp.json();

      // 2. Create details
      for (const item of cartItems) {
        await fetch(`${this.baseUrl}/detalles`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pedido_id: order.id,
            producto_id: item.id,
            cantidad: item.quantity || 1, // Depending on cart structure
            precio_unit: item.precio,
          }),
        });
      }

      // 3. Save cart to history
      const cartResp = await fetch(`${this.baseUrl}/carritos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fecha: new Date().toISOString().split("T")[0],
          cliente_id: cliente_id,
        }),
      });
      const cart = await cartResp.json();

      for (const item of cartItems) {
        await fetch(`${this.baseUrl}/carritos/${cart.id}/productos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            producto_id: item.id,
            cantidad: item.quantity || 1,
            pxq: (item.quantity || 1) * item.precio,
          }),
        });
      }
      return true;
    } catch (error) {
      console.error("Error al guardar pedido", error);
      return false;
    }
  },
};
