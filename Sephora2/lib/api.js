export const API = {
  async getAllProducts() {
    const categories = ["perfume", "champus", "makeup", "skincare", "cepillos"];
    try {
      const responses = await Promise.all(
        categories.map((cat) => fetch(`./json/${cat}.json`)),
      );
      const data = await Promise.all(responses.map((r) => r.json()));

      // Extraemos los arrays de cada objeto JSON
      return data.flatMap((obj, index) => {
        const key = categories[index];
        return obj[key] || [];
      });
    } catch (error) {
      console.error("Error cargando productos:", error);
      return [];
    }
  },
};
