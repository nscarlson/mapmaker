const initialState = [
    { modalId: 'signin', open: false },
    { modalId: 'testModal1', open: false },
    { modalId: 'testModal2', open: false }
];

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return state.map((modal) => {
                if (modal.id === action.id) {
                    modal.checked = !modal.checked;
                }
                return modal;
            });
        default:
            return state;
    }
};
