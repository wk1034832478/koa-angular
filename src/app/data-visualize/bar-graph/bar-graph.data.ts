export interface BarGraphData {
    data: { name: string, vote: number }[]; // 数据类型
    imageMap: any; // 每项数据对应的图片url
    containerId: string; // 容器id
    title: string; // 统计图标题
}
