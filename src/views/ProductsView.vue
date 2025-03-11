<template>
  <div class="container">
    <h1 class="title">Sun Protection Products</h1>

    <div class="filters">
      <label>
        UV Index:
        <select v-model="selectedUV">
          <option value="">Any</option>
          <option value="Low">Low (0-2)</option>
          <option value="Moderate">Moderate (3-5)</option>
          <option value="High">High (6-7)</option>
          <option value="Very High">Very High (8-10)</option>
          <option value="Extreme">Extreme (11+)</option>
        </select>
      </label>

      <label>
        Temperature:
        <select v-model="selectedTemperature">
          <option value="">Any</option>
          <option value="Cold">Cold (Below 15°C)</option>
          <option value="Mild">Mild (15-25°C)</option>
          <option value="Hot">Hot (Above 25°C)</option>
        </select>
      </label>

      <label>
        Weather Condition:
        <select v-model="selectedWeather">
          <option value="">Any</option>
          <option value="Sunny">Sunny</option>
          <option value="Cloudy">Cloudy</option>
          <option value="Rainy">Rainy</option>
        </select>
      </label>
    </div>

    <h2 class="recommend-title" v-if="filteredProducts.length > 0">Recommended Products</h2>

    <div class="product-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.name" class="product-image" />

        <h2 class="product-name">{{ product.name }}</h2>

        <div class="product-rating">
          <span v-for="n in 5" :key="n">
            <i v-if="n <= product.rating" class="fas fa-star"></i>
            <i v-else class="far fa-star"></i>
          </span>
        </div>

        <p class="product-price">
          Price: <span>${{ product.price }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedUV: '',
      selectedTemperature: '',
      selectedWeather: '',
      products: [
        {
          id: 1,
          name: 'SPF50+ Sunscreen',
          price: 25,
          rating: 5,
          image: '/images/sunscreen.jpg',
          uv: 'High',
          temp: 'Hot',
          weather: 'Sunny',
        },
        {
          id: 2,
          name: 'Outdoor Sun Hat',
          price: 35,
          rating: 4,
          image: '/images/sunHat.jpg',
          uv: 'High',
          temp: 'Hot',
          weather: 'Sunny',
        },
        {
          id: 3,
          name: 'UPF 50+ Long-Sleeve Sun Shirt',
          price: 49,
          rating: 5,
          image: '/images/sunShirt.jpg',
          uv: 'Moderate',
          temp: 'Mild',
          weather: 'Cloudy',
        },
        {
          id: 4,
          name: 'UV Protection Sunglasses',
          price: 89,
          rating: 4,
          image: '/images/sunglasses.jpg',
          uv: 'Very High',
          temp: 'Hot',
          weather: 'Sunny',
        },
        {
          id: 5,
          name: 'Cooling Sun Sleeves',
          price: 19,
          rating: 4,
          image: '/images/sunSleeves.jpg',
          uv: 'Moderate',
          temp: 'Hot',
          weather: 'Sunny',
        },
        {
          id: 6,
          name: 'UPF50+ Sun Mask',
          price: 15,
          rating: 3,
          image: '/images/sunMask.jpg',
          uv: 'Very High',
          temp: 'Hot',
          weather: 'Sunny',
        },
        {
          id: 7,
          name: 'Portable UV Umbrella',
          price: 55,
          rating: 5,
          image: '/images/umbrella.jpg',
          uv: 'Moderate',
          temp: 'Mild',
          weather: 'Rainy',
        },
        {
          id: 8,
          name: 'Sports Sunscreen',
          price: 29,
          rating: 5,
          image: '/images/sportsSunscreen.jpg',
          uv: 'Extreme',
          temp: 'Hot',
          weather: 'Sunny',
        },
      ],
    }
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        return (
          (this.selectedUV === '' || product.uv === this.selectedUV) &&
          (this.selectedTemperature === '' || product.temp === this.selectedTemperature) &&
          (this.selectedWeather === '' || product.weather === this.selectedWeather)
        )
      })
    },
  },
}
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 50px;
}

.filters {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
}

.filters select {
  padding: 8px;
  font-size: 1rem;
  border-radius: 5px;
}

.recommend-title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.product-image {
  width: 120px;
  height: 120px;
  object-fit: contain;
  border-radius: 10px;
  padding: 5px;
}

.product-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 10px;
}

.product-price {
  font-weight: bold;
}

.product-rating i {
  color: #ffd700;
  margin-bottom: 15px;
}
</style>
