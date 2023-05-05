const { readfile } = require('fs/promises')

class BaseRepository {
    constructor({file}) {
        this.file = file
    }

    async find (itemId){
        const content = JSON.parse(await readfile(this.file))
        if (!itemId) return content

        return content.find(({ id }) => id === itemId)
    }
}

module.exports = BaseRepository