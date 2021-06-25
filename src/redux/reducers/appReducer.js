const initialState = {
    loading: false,
    error: '',
    notificationsPermission:{
        permission: 'default',
        requested: false,
        supported: false,
    },
};
export default function (state = initialState, action) {
    switch (action.type) {
        case 'START_FETCH':
            return {
                ...state,
                loading: true,
            };
        case 'END_FETCH':
            return {
                ...state,
                loading: false,
            }
        case 'ERROR':
            return {
                ...state,
                error: action.payload,
            };
        case 'app/requestNotificationsPermissions':
            return {
                ...state,
                notificationsPermission: action.payload,
            };
        default:
            return state;
    }
}