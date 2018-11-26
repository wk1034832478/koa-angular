export class Page {
    public static INDEX_NAME = 'pageIndex';
    public static SIZE_NAME = 'pageSize';
    private index?: number;
    private size?: number;
    constructor() {
        this.reset();
    }
    get _index() {
        return this.index;
    }
    set _index( index: number ) {
        this.index = index;
    }
    get _size() {
        return this.size;
    }
    set _size( size: number ) {
        this.size = size;
    }
    /**
     * 判断当前是否与下一页
     * @param size 当期获取的条目数
     */
    hasNext( size: number ) {
        return size >= this.size;
    }
    next() {
        this.index++;
        return this;
    }
    previous() {
        this.index--;
        if ( this.index < 0) {
            this.index = 0;
        }
        return this;
    }
    reset( ) {
        this.index = 0;
        this.size = 20;
    }
}
