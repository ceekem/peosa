import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Menu',
    group: true,
  },
  {
    title: 'Cases',
    icon: 'nb-list',
    link: '/pages/cases/viewcases',
    // link: '/pages/cases',
    /*children: [
      {
        title: 'View Complaints',
        link: '/pages/cases/viewcases',
      } ,
      {
        title: 'Grid',
        link: '/pages/ui-features/grid',
      },
      {
        title: 'Icons',
        link: '/pages/ui-features/icons',
      },*/
     /* {
        title: 'Modals',
        link: '/pages/ui-features/modals',
      },
      {
        title: 'Popovers',
        link: '/pages/ui-features/popovers',
      },
      {
        title: 'Typography',
        link: '/pages/ui-features/typography',
      },
      {
        title: 'Animated Searches',
        link: '/pages/ui-features/search-fields',
      },
      {
        title: 'Tabs',
        link: '/pages/ui-features/tabs',
      }, */
   // ],
  },
  // {
  //   title: 'News',
  //   icon: 'nb-lightbulb',
  //   children: [
  //     {
  //       title: 'Upload News',
  //       link: '/pages/news/uploadnews',
  //     },
  //     {
  //       title: 'View News',
  //       link: '/pages/news/viewnews',
  //     }
  //   ],
  // },
  // {
  //   title: 'Programs',
  //   icon: 'nb-grid-a-outline',
  //   children: [
  //     {
  //       title: 'Upload images',
  //       link: '/pages/components/uploadgallery',
  //     }, {
  //       title: 'View Programs',
  //       link: '/pages/components/viewgallery',
  //     },
  //   ],
  // },
  // {
  //   title: 'Maps',
  //   icon: 'nb-location',
  //   children: [
  //     {
  //       title: 'Google Maps',
  //       link: '/pages/maps/gmaps',
  //     },
  //     {
  //       title: 'Leaflet Maps',
  //       link: '/pages/maps/leaflet',
  //     },
  //     {
  //       title: 'Bubble Maps',
  //       link: '/pages/maps/bubble',
  //     },
  //     {
  //       title: 'Search Maps',
  //       link: '/pages/maps/searchmap',
  //     },
  //   ],
  // }, 
  {
    title: 'Reports',
    icon: 'nb-bar-chart',
    link: '/pages/charts/chartjs',
    // children: [
      // {
      //   title: 'Echarts',
      //   link: '/pages/charts/echarts',
      // },
      // {
      //   title: 'View Report',
      //   link: '/pages/charts/chartjs',
      // },
      // {
      //   title: 'D3',
      //   link: '/pages/charts/d3',
      // },
   // ],
  },
  // {
  //   title: 'Ballots',
  //   icon: 'nb-title',
  //   // link: '/pages/editors/tinymce',
  //   children: [
  //     {
  //       title: 'upload Ballot',
  //       link: '/pages/editors/tinymce',
  //     },
  //     {
  //       title: 'view Results',
  //       link: '/pages/editors/ckeditor',
  //     },
  //  ],
  // },
  {
    title: 'Members',
    icon: 'nb-person',
    link: '/pages/tables/smart-table',
    // children: [
    //   {
    //     title: 'View Mebmers',
    //     link: '/pages/tables/smart-table',
    //   },
    // ],
  },
  //  {
  //   title: 'Miscellaneous',
  //   icon: 'nb-shuffle',
  //   children: [
  //     {
  //       title: '404',
  //       link: '/pages/miscellaneous/404',
  //     },
  //   ],
  // }, 
  {
    title: 'Reset Password',
    icon: 'nb-locked',
    link: '/auth/reset-password',
    // children: [
     /*  {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      }, */
      // {
      //   title: 'Reset Password',
      //   link: '/auth/reset-password',
      // },
    // ],
  },
  // {
  //   title: 'Vote',
  //   icon:'nb-person',
  //   link:'/pages/voter',
  //   children:[
  //     { title :'Cast Vote',
  //       link:'/voter',},
  //   ],
  // },
];
