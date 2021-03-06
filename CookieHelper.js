/**
 * cookieHelper.js
 * ------------------------------------------------------------------------------
 * allows handling of cookies in an object-oriented manner.
 * written by bellydrum
 */

class CookieHelper {

    show(cookieObject={}) {
        if (cookieObject.length !== undefined) {
            console.log('show() does not take any arguments.')
            return null
        }
        document.cookie.split('; ').forEach(item => {
            cookieObject[item.split('=')[0]] = item.split('=')[1]
        })
        return cookieObject
    }

    hasKey(key) {
        if (typeof key !== 'string' || key === undefined) {
            console.log('has() takes a single string argument.')
            return null
        }
        const cookieObject = this.show()
        return Object.keys(cookieObject).includes(key)
    }

    add(object) {
        if (object === undefined || typeof(object) !== 'object' || Array.isArray(object)) {
            console.log('add() takes a non-empty object argument.')
            return null
        }
        Object.keys(object).forEach(key => {
            document.cookie = `${key}=${object[key]};`
        })
    }

    getObjectByKey(key, returnObject={}) {
        if (typeof key !== 'string') {
            console.log('getObject() takes a single string argument.')
            return null
        }
        returnObject[key] = this.getValueByKey(key)
        return returnObject
    }

    getValueByKey(key) {
        if (typeof key !== 'string') {
            console.log('getValue() takes a single string argument.')
            return null
        }
        const cookieObject = this.show()
        return cookieObject[key]
    }

    deleteByKey(key) {
        if (typeof key !== 'string') {
            console.log('delete() takes a single string argument.')
            return null
        }
        document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }

    flush(keys=Object.keys(this.show())) {
        keys.forEach(key => {
            this.deleteByKey(key)
        })
        return this.show()
    }

}