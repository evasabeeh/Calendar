// utils/eventColor.js

export const getEventCategoryColor = (category) => {
    switch (category) {
        case "work":
            return "#85A98F"; // Work color
        case "personal":
            return "#FFCCE1"; // Personal color
        case "others":
            return "#81BFDA"; // Others color
        default:
            return "#FFFFFF"; // Default color
    }
};
