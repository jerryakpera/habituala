<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <navbar />
      <toolbar />
    </q-header>

    <q-footer>
      <q-tabs
        dense
      >
        <FooterTabs
          v-for="tab in essentialLinks"
          :key="tab.title"
          :tab="tab"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      :width="220"
      :breakpoint="767"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-accent"
    >
      <q-list dark>
        <q-item-label
          header
          class="text-primary"
        >
          Navigation
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <banner />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data: () => ({
    leftDrawerOpen: false,
    essentialLinks: [
      {
        title: 'Home',
        icon: 'home',
        link: '/'
      },
      {
        title: 'Tasks',
        icon: 'list',
        link: '/tasks'
      },
      // {
      //   title: 'VocabBuilder',
      //   icon: 'build',
      //   link: '/vocab'
      // },
      // {
      //   title: 'Retro Sect',
      //   icon: 'search',
      //   link: '/retrosect'
      // },
      {
        title: 'Journals',
        icon: 'notes',
        link: '/journals'
      },
      {
        title: 'Settings',
        icon: 'settings',
        link: '/settings'
      },
    ]
  }),
  components: {
    EssentialLink: () => import("../components/EssentialLink"),
    FooterTabs: () => import("../components/FooterTabs"),
    banner: () => import("../components/Shared/Banner"),
    navbar: () => import("../components/Shared/Bars/NavBar"),
    toolbar: () => import("../components/Shared/Bars/ToolBar"),
  },

  
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}
@media screen and (max-width: 768px) {
  .drawer-btn {
    display: none;
  }
}

.q-drawer {
  .q-router-link--exact-active {
    color: #e75a7c !important;
  }
}
</style>