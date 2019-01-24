/**
 * cookieHelper.js
 * ------------------------------------------------------------------------------
 * allows handling of cookies in an object-oriented manner.
 * written by bellydrum
 */

class CookieHelper {

    getAsObject(cookieObject={}) {
        document.cookie.split('; ').forEach(item => {
            cookieObject[item.split('=')[0]] = item.split('=')[1]
        })
        return cookieObject
    }

    hasKey(key) {
        const cookieObject = this.getAsObject()
        return Object.keys(cookieObject).includes(key)
    }

    addObject(object) {
        Object.keys(object).forEach(key => {
            document.cookie = `${key}=${object[key]};`
        })
    }

    getObject(key) {
        return this.hasKey(key) ? {key: this.getValue(key)} : undefined
    }

    getValue(key) {
        const cookieObject = this.getAsObject()
        return cookieObject[key]
    }

    deleteKey(key) {
        document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }

    flush() {
        const cookieObject = this.getAsObject()
        Object.keys(cookieObject).forEach((key) => {
            this.deleteKey(key)
        })
        return this.getAsObject()
    }
}