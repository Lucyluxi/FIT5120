<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header
      class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
    >
      <div class="col-md-3 mb-2 mb-md-0">
        <!-- <a href="/" class="d-inline-flex link-body-emphasis text-decoration-none">
          <svg class="bi" width="40" height="32" role="img" aria-label="Bootstrap">
            <use xlink:href="#bootstrap"></use>
          </svg>
        </a> -->
        <h3>UVSafe</h3>
      </div>

      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><router-link to="/" class="nav-link px-2 link-secondary">Home</router-link></li>
        <li><router-link to="/test" class="nav-link px-2">UV Map</router-link></li>
        <!-- <li><router-link to="/new" class="nav-link px-2">Map</router-link></li> -->
        <li><router-link to="/uvindex" class="nav-link px-2">Protect your skin</router-link></li>
        <li><router-link to="/reminder" class="nav-link px-2">Sunscreen Reminder</router-link></li>
        <li><router-link to="/statistics" class="nav-link px-2">Facts and stats</router-link></li>
        <!-- <li><router-link to="/products" class="nav-link px-2">Products</router-link></li> -->
      </ul>

      <div class="col-md-3 text-end">
        <!-- <button type="button" class="btn btn-outline-primary me-2">Login</button>
        <button type="button" class="btn btn-primary">Sign-up</button> -->
      </div>
    </header>
  </div>
</template>
