 export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/dashboard/analysis', authority: ['admin', 'user'] },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      {
        path: '/market',
        icon: 'form',
        name: 'market',
        routes: [
          {
            path: '/market/teamBuy',
            name: 'teamBuy',
            component: './Market/TeamBuy',
          },
            {
              path: '/market/teamBuyDetail',
              component: './Market/TeamBuyDetail',
            },
            {
              path: '/market/teamBuyCreat',
              component: './Market/TeamBuyCreat',
            },
            
          {
            path: '/market/discount',
            name: 'discount',
            component: './Market/Discount',
          },
          {
            path: '/market/discountCreat',
            component: './Market/DiscountCreat',
          },
          // 折扣详情页
          // {
          //   path: '/market/discountDetail',
          //   name: 'discountdetail',
          //   component: './Market/DiscountDetail',
          // },
          {
            path: '/market/bargain',
            name: 'bargain',
            authority: ['admin'],
            component: './Market/Bargain',
          },
          {
            path: '/market/coupon',
            name: 'coupon',
            component: './Market/Coupon',
            // routes: [
            // { path: '/market/coupon/couponDetail', component: './Market/CouponDetail'}]
          },
          {
            path: '/market/couponDetail',
            component: './Market/CouponDetail',
          },
          {
            path: '/market/couponCreat',
            component: './Market/CouponCreat',
          },
          {
            path: '/market/partnerManage',
            name: 'partnerManage',
            component: './Market/PartnerManage',
            
          },
          {
            path: '/market/partnerManageDetail',
            component: './Market/PartnerManageDetail',
            routes: [
              {
                path: '/market/partnerManageDetail',
                redirect: '/market/partnerManageDetail/articles',
              },
              {
                path: '/market/partnerManageDetail/articles',
                component: './Market/Center/Articles',
              },
              {
                path: '/market/partnerManageDetail/applications',
                component: './Market/Center/Applications',
              },
              {
                path: '/market/partnerManageDetail/projects',
                component: './Market/Center/Projects',
              },
            ],
          },
        ],
      },
      {
        path: '/operationManagement',
        icon: 'form',
        name: 'operationManagement',
        routes: [
          {
            path: '/operationManagement/menberManage',
            name: 'menberManage',
            component: './OperationManagement/MenberManage',
          },
          {
            path: '/operationManagement/menberManageCheck',
            component: './OperationManagement/MenberManageCheck',
          },
          {
            path: '/operationManagement/menberPrice',
            name: 'menberPrice',
            component: './OperationManagement/MenberPrice',
          },
          {
            path: '/operationManagement/rewardSet',
            name: 'rewardSet',
            component: './OperationManagement/RewardSet',
          },
          {
            path: '/operationManagement/tipsManage',
            name: 'tipsManage',
            component: './OperationManagement/TipsManage',
          },
          {
            path: '/operationManagement/tipsManageDetail',
            component: './OperationManagement/TipsManageDetail',
          },
          {
            path: '/operationManagement/advanceManage',
            name: 'advanceManage',
            component: './OperationManagement/AdvanceManage',
          },
          {
            path: '/operationManagement/integralSet',
            name: 'integral',
            component: './OperationManagement/integralSet',
          },
          {
            path: '/operationManagement/opinion',
            name: 'opinion',
            component: './OperationManagement/Opinion',
          },
        ],
      },
      {
        path: '/systemSet',
        icon: 'form',
        name: 'systemSet',
        routes: [
          {
            path: '/systemSet/accuntManage',
            name: 'accuntManage',
            component: './SystemSet/AccuntManage',
          },
          {
            path: '/systemSet/authority',
            name: 'authority',
            component: './SystemSet/Authority',
          },
          {
            path: '/systemSet/logManage',
            name: 'logManage',
            authority: ['admin'],
            component: './SystemSet/LogManage',
          },
        ],
      },
    ],
  },
];
