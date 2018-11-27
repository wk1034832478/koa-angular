export interface PageMessage {
    totalPages?: number; // 是根据当前的pageSize决定的！
    totalElements?: number; // 当前元素总数
    currentPageSize?: number; // 当前页面数量
    currentPage?: number; // 当前页
}
