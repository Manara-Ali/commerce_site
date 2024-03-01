const filterReqObj = (obj, ...args) => {
    const newObj = {};

    Object.keys(obj).forEach((element) => {
        if(args.includes(element)) {
            newObj[element] = obj[element];
        }
    });

    return newObj;
}

module.exports = filterReqObj;