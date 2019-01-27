/**
 * cookieHelper.js
 * ------------------------------------------------------------------------------
 * allows handling of cookies in an object-oriented manner.
 * written by bellydrum
 */

class CookieHelper {

    show(cookieObject={}) {
        document.cookie.split('; ').forEach(item => {
            cookieObject[item.split('=')[0]] = item.split('=')[1]
        })
        return cookieObject
    }

    has(key) {
        const cookieObject = this.show()
        return Object.keys(cookieObject).includes(key)
    }

    add(object) {
        Object.keys(object).forEach(key => {
            document.cookie = `${key}=${object[key]};`
        })
    }

    getObject(key, returnObject={}) {
        returnObject[key] = this.getValue(key)
        return returnObject
    }

    getValue(key) {
        const cookieObject = this.show()
        return cookieObject[key]
    }

    delete(key) {
        document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }

    flush(keys=Object.keys(this.show())) {
        keys.forEach(key => {
            this.delete(key)
        })
        return this.show()
    }
}