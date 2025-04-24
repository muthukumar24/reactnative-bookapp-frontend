// This function will convert the creatdAt to this format: "May 2025"
export const formatMemberSince = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", {month: "short"});
    const year = date.getFullYear();
    return `${month} ${year}`;
};

// This function will convert the cratedAt to this format: "May 15, 2025"
export const formatPublishDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", {month: "short"});
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
};