import { createRouter, createWebHistory } from 'vue-router';
import Main from '../views/Main.vue';
import forcedEnd from '../components/forcedEnd.vue';
import Page1 from '../components/Page1.vue';
import Page2 from '../components/Page2.vue';
import Page3 from '../components/Page3.vue';
import Page4 from '../components/Page4.vue';
import Page5 from '../components/Page5.vue';
import Page6 from '../components/Page6.vue';
import Page7 from '../components/Page7.vue';
import Page8 from '../components/Page8.vue';
import Page9 from '../components/Page9.vue';
import Page10 from '../components/Page10.vue';
import Page11 from '../components/Page11.vue';
import Page12 from '../components/Page12.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path: '/forcedEnd',
      name: 'forcedEnd',
      component: forcedEnd
    },
    {
      path: '/page1',
      name: 'page1',
      component: Page1
    },
    {
      path: '/page2',
      name: 'page2',
      component: Page2
    },
    {
      path: '/page3',
      name: 'page3',
      component: Page3
    },
    {
      path: '/page4',
      name: 'page4',
      component: Page4
    },
    {
      path: '/page5',
      name: 'page5',
      component: Page5
    },
    {
      path: '/page6',
      name: 'page6',
      component: Page6
    },
    {
      path: '/page7',
      name: 'page7',
      component: Page7
    },
    {
      path: '/page8',
      name: 'page8',
      component: Page8
    },
    {
      path: '/page9',
      name: 'page9',
      component: Page9
    },
    {
      path: '/page10',
      name: 'page10',
      component: Page10
    },
    {
      path: '/page11',
      name: 'page11',
      component: Page11
    },
    {
      path: '/page12',
      name: 'page12',
      component: Page12
    },
  ]
})

export default router
