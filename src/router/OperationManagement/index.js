const taskManagement = (resolve) => {
    require(['@/page/OperationManagement/taskManagement/taskManagement.vue'], resolve);
};
const addTask = (resolve) => {
    require(['@/page/OperationManagement/taskManagement/addTask.vue'], resolve);
};
const checkTask = (resolve) => {
    require(['@/page/OperationManagement/taskManagement/addTask.vue'], resolve);
};
const updateTask = (resolve) => {
    require(['@/page/OperationManagement/taskManagement/addTask.vue'], resolve);
};

export default [
    {
        path: '/taskManagement',
        component: taskManagement,
        meta: ['奖品管理']
    },
    {
        path: '/addTask',
        component: addTask,
        name: 'addTask',
        meta: ['新增奖品']
    },
    {
        path: '/updateTask',
        component: updateTask,
        name: 'updateTask',
        meta: ['编辑奖品']
    },
    {
        path: '/checkTask',
        component: checkTask,
        name: 'checkTask',
        meta: ['查看奖品']
    },
]
