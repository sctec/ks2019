let Array = {
    remove(){
        return function(val) {
            let index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        }
    }
};

module.exports = Array;