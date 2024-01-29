class Helper {
    indexByOne() {
        let index = 0;
        return index + 1
    }

    randomIndex(){
        let index = 10000
        return Math.floor(Math.random() * index)
    }

}

export const helper = new Helper();