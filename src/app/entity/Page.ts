export class Page {
    public static INDEX_NAME = 'pageIndex';
    public static SIZE_NAME = 'pageSize';
    private index?: number;
    private size?: number;
    private totalElements: number; // 总元素数量
    private totalPages: number; // 总页的数量
    constructor() {
        this.reset();
    }
    get _totalPages() {
        return this.totalPages;
    }
    set _totalPages( totalPages: number ) {
        this.totalPages = totalPages;
    }
    get _totalElements() {
        return this.totalElements;
    }
    set _totalElements( totalElements: number ) {
        this.totalElements = totalElements;
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
    hasNext(  ) {
        return this._index < this.totalPages - 1;
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
        this.size = 10;
    }
}
