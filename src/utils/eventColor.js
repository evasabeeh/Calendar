export const getEventCategoryColor = (category) => {
    switch (category) {
        case "work":
            return "#D0BFFF";
        case "personal":
            return "#99B080"; 
        case "others":
            return "#FFDFDF";
        default:
            return "#FFFFFF";
    }
};
