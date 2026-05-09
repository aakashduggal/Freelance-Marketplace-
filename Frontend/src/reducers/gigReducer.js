export const INITIAL_STATE = {
    userId: JSON.parse(localStorage.getItem("currentUser"))?._id, // User ki ID
    title: "",
    cat: "",
    cover: "",
    images: [], // Multiple images upload ke liye array
    desc: "",
    shortTitle: "",
    shortDesc: "",
    deliveryTime: 0,
    revisionNumber: 0,
    features: [], // Jise "Logo Design", "Source File" - inka array
    price: 0,
};

export const gigReducer = (state, action) => {
    switch (action.type) {
        // 1. Agar koi normal text box me type kare (Jaise Title ya Price)
        case "CHANGE_INPUT":
            return {
                ...state, // Purana data waisa hi rakho
                [action.payload.name]: action.payload.value, // Jo badla hai, bas usko update karo
            };

        // 2. Agar koi Feature Add karna chahe array mein
        case "ADD_FEATURE":
            return {
                ...state,
                features: [...state.features, action.payload],
            };

        // 3. Agar koi Feature Delete karna chahe
        case "REMOVE_FEATURE":
            return {
                ...state,
                features: state.features.filter(
                    (feature) => feature !== action.payload
                ),
            };

        default:
            return state;
    }
};
