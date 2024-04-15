function nBytesToNumber(...bytes) {
    let num = 0;


    for (let b in bytes) {
        if (bytes[b] === 0x20) {
            num += 0;
            continue;
        }
        num += parseInt((bytes[b] - 0x30).toString()) * Math.pow(10, bytes.length - b - 1);
    }

    return num;
}


module.exports = nBytesToNumber;