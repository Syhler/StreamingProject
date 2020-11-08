<template>
  <header class="header-global">
    <base-nav class="navbar-main" transparent type="" effect="light" expand>
      <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
        <img src="img/brand/white.png" alt="logo">
      </router-link>

      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <a href="https://demos.creative-tim.com/vue-argon-design-system/documentation/">
            <img src="img/brand/blue.png">
          </a>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"></close-button>
        </div>
      </div>
      <ul class="navbar-nav navbar-nav-hover align-items-lg-center">
        <base-dropdown class="nav-item" menu-classes="dropdown-menu-xl">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-ui-04 d-lg-none"></i>
            <span class="nav-link-inner--text">Movies</span>
          </a>
          <div class="dropdown-menu-inner">
            <a href="#"
               class="media d-flex align-items-center">
              <div class="icon icon-shape bg-gradient-primary rounded-circle text-white">
                <i class="ni ni-collection"></i>
              </div>
              <div class="media-body ml-3">
                <h6 class="heading text-primary mb-md-1">View Movies</h6>
                <p class="description d-none d-md-inline-block mb-0">View all downloaded movies</p>
              </div>
            </a>
          </div>
        </base-dropdown>
        <base-dropdown tag="li" class="nav-item">
          <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
            <i class="ni ni-collection d-lg-none"></i>
            <span class="nav-link-inner--text">Torrent</span>
          </a>
          <router-link to="/landing" class="dropdown-item">Add torrent</router-link>
          <router-link to="/torrents" class="dropdown-item">View all torrents</router-link>
          <!--<router-link to="/login" class="dropdown-item">Login</router-link>
          <router-link to="/register" class="dropdown-item">Register</router-link> -->
        </base-dropdown>
      </ul>
      <!--

<ul class="navbar-nav align-items-lg-center ml-lg-auto">
  <li class="nav-item">
      <a class="nav-link nav-link-icon" href="https://www.facebook.com/creativetim" target="_blank" rel="noopener"
         data-toggle="tooltip" title="Like us on Facebook">
          <i class="fa fa-facebook-square"></i>
          <span class="nav-link-inner--text d-lg-none">Facebook</span>
      </a>
  </li>
  <li class="nav-item">
      <a class="nav-link nav-link-icon" href="https://www.instagram.com/creativetimofficial"
         target="_blank" rel="noopener" data-toggle="tooltip" title="Follow us on Instagram">
          <i class="fa fa-instagram"></i>
          <span class="nav-link-inner--text d-lg-none">Instagram</span>
      </a>
  </li>
  <li class="nav-item">
      <a class="nav-link nav-link-icon" href="https://twitter.com/creativetim" target="_blank" rel="noopener"
         data-toggle="tooltip" title="Follow us on Twitter">
          <i class="fa fa-twitter-square"></i>
          <span class="nav-link-inner--text d-lg-none">Twitter</span>
      </a>
  </li>
  <li class="nav-item">
      <a class="nav-link nav-link-icon" href="https://github.com/creativetimofficial/vue-argon-design-system"
         target="_blank" rel="noopener" data-toggle="tooltip" title="Star us on Github">
          <i class="fa fa-github"></i>
          <span class="nav-link-inner--text d-lg-none">Github</span>
      </a>
  </li>
<li class="nav-item d-none d-lg-block ml-lg-4">
  <a href="https://www.creative-tim.com/product/vue-argon-design-system" target="_blank" rel="noopener"
     class="btn btn-neutral btn-icon">
        <span class="btn-inner--icon">
          <i class="fa fa-cloud-download mr-2"></i>
        </span>
    <span class="nav-link-inner--text">Download</span>
  </a>
</li>
</ul>
                                -->

    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  }
};
</script>
<style>
</style>
