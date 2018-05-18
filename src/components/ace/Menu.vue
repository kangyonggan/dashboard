<template>
  <li>
    <a :data-url="'/#/' + menu.url" :href="'/#/' + menu.url" v-if="menu.leaf.length == 0">
      <i :class="menu.icon" v-if="menu.icon != ''"></i>
      <i class="menu-icon fa fa-caret-right" v-if="menu.icon == ''"></i>
      <span class="menu-text">{{menu.name}}</span>
    </a>

    <a class="dropdown-toggle" href="javascript:" v-if="menu.leaf.length > 0">
      <i :class="menu.icon"></i>
      <span class="menu-text">{{menu.name}}</span>
      <b class="arrow fa fa-angle-down"></b>
    </a>

    <b class="arrow"></b>

    <ul class="submenu" v-if="menu.leaf.length > 0">
      <Menu v-for="(m, index) in menu.leaf" :key="index" :menu="m"/>
    </ul>
  </li>
</template>

<script>

  export default {
    name: 'Menu',
    props: ["menu"]
  }
</script>

<style scoped>
</style>
