function upperFirstLetter(data) {

        const first = data.charAt(0)
        const upper = first.toUpperCase()

        return data.replace(first, upper)

    
}


module.exports = upperFirstLetter