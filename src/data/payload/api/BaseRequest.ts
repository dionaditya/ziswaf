class BaseRequest<T> {
    public data: T;

    constructor(data: T){
        this.data = data;
    }
}

export default BaseRequest