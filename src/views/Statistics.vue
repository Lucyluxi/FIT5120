<template>
  <div class="tableauPlaceholder" ref="vizContainer">
    <noscript>
      <a href="#">
        <img
          alt="Dashboard 1"
          src="https://public.tableau.com/static/images/Sk/Skincancerrate/Dashboard1/1_rss.png"
          style="border: none"
        />
      </a>
    </noscript>
    <object class="tableauViz" style="display:none;">
      <param name="host_url" value="https://public.tableau.com/" />
      <param name="embed_code_version" value="3" />
      <param name="site_root" value="" />
      <param name="name" value="Skincancerrate/Dashboard1" />
      <param name="tabs" value="no" />
      <param name="toolbar" value="yes" />
      <param name="static_image" value="https://public.tableau.com/static/images/Sk/Skincancerrate/Dashboard1/1.png" />
      <param name="animate_transition" value="yes" />
      <param name="display_static_image" value="yes" />
      <param name="display_spinner" value="yes" />
      <param name="display_overlay" value="yes" />
      <param name="display_count" value="yes" />
      <param name="language" value="en-US" />
    </object>
  </div>
</template>

<script>
export default {
  mounted() {
    this.loadTableauViz();
    window.addEventListener('resize', this.resizeViz);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.resizeViz);
  },
  methods: {
    loadTableauViz() {
      const divElement = this.$refs.vizContainer;
      const vizElement = divElement.querySelector('object');

      const setVizSize = () => {
        const width = divElement.offsetWidth;
        const maxWidth = 900;   // 最大宽度(px)，可自定义
        const maxHeight = 600;  // 最大高度(px)，可自定义
        const calcHeight = width * 0.75;

        vizElement.style.width = Math.min(width, maxWidth) + 'px';
        vizElement.style.height = Math.min(calcHeight, maxHeight) + 'px';
      };

      setVizSize();

      const scriptElement = document.createElement('script');
      scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
      vizElement.parentNode.insertBefore(scriptElement, vizElement);
    },
    resizeViz() {
      const divElement = this.$refs.vizContainer;
      const vizElement = divElement.querySelector('object');

      const width = divElement.offsetWidth;
      const maxWidth = 900;
      const maxHeight = 600;
      const calcHeight = width * 0.75;

      vizElement.style.width = Math.min(width, maxWidth) + 'px';
      vizElement.style.height = Math.min(calcHeight, maxHeight) + 'px';
    },
  },
};
</script>

<style scoped>
.tableauPlaceholder {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
