/**
  * cookiehelper.js
  * ------------------------------------------------------------------------------
  * allows handling of cookies in an object-oriented manner.
  * written by bellydrum
  */

class CookieHelper {
  /**
    * Creates and returns a tool for accessing and updating the document cookie.
    *
    * @see     Document.cookie
    * @link    https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
    *
    * @see     CookieHelper
    * @link    https://github.com/bellydrum/CookieHelper/edit/master/CookieHelper.js
    *
    * @returns {Object} CookieHelper
    *   A Javascript object with methods that allow access to the document cookie.
    *
    */

  show(cookieObject={}) {
    /**
      * Returns the document cookie as a Javascript object.
      *
      * @returns {Object<name, value>} cookieObject
      *   Object whose entries are the keys and values of the document cookie at the time of execution.
      */
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
    /**
      * Determines the presence of a cookie by its provided name.
      *
      * @param {string} key
      * @returns {bool}, null
      */
    if (typeof key !== 'string') {
      console.log('has() takes a single string argument.')
      return null
    }
    const cookieObject = this.show()
    return Object.keys(cookieObject).includes(key)
  }

  add(object, expirationSeconds=21600) {
    /**
      * Updates the document cookie.
      *
      * @note
      *   Immediately alters the document cookie with all given {key : value} pairs.
      *
      * @param {Object<name, value>} object
      *   Name and value pairs to be added to the cookie.
      * @param {number} expirationSeconds
      *   Number of seconds until the cookie(s) expire.
      * @returns {null}
      */
    if (object === undefined || typeof(object) !== 'object' || Array.isArray(object)) {
      console.log('add() takes a non-empty object argument.')
      return null
    }
    const date = new Date();
    date.setTime(date.getTime() + (1000 * expirationSeconds));
    const expires = date.toUTCString();
    let cookieString = '';
    Object.keys(object).forEach(key => {
      cookieString += `${key}=${object[key]};`
    })
    cookieString += `expires=${expires};path=/`
    document.cookie = cookieString;
  }

  getObjectByKey(name) {
    /**
      * Takes a name and returns it with its value according to the document cookie.
      *
      * @param {string} name
      *   Used to parse the document cookie for a value.
      * @returns {Object<name, value>} returnObject
      */
    const returnObject = {}
    if (typeof name !== 'string') {
      console.log('getObject() takes a single string argument.')
      return null
    }
    returnObject[name] = this.getValueByKey(name)
    return returnObject
  }

  getValueByKey(name) {
    /**
      * Takes a name and returns only its value according to the document cookie.
      *
      * @param {string} name
      *  Used to parse the document cookie for a value.
      * @returns {string}
      *  The value of the given name according to the document cookie.
      */
    if (typeof name !== 'string') {
      console.log('getValueByKey() takes a single string argument.')
      return null
    }
    const cookieObject = this.show()
    return cookieObject[name]
  }

  deleteByKey(name) {
    /**
      * Takes a name and deletes its value in the document cookie.
      *
      * @note
      *   Immediately alters the document cookie.
      *
      * @see     How to delete a cookie.
      * @link    https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie#Notes
      *
      * @param {string} name
      *   Name of the {name: value} pair to delete from the document cookie.
      * @returns {null}
      */
    if (typeof name !== 'string') {
      console.log('deleteByKey() takes a single string argument.')
      return null
    }
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  }

  flush(names=Object.keys(this.show())) {
    /**
      * Empties the document cookie.
      *
      * @note
      *   Immediately alters the document cookie.
      *
      * @see this.deleteByKey()
      *
      * @returns {Object<name, value>}
      *   Object that contains only the values of the document cookie unable to be deleted.
      */
    names.forEach(name => {
      this.deleteByKey(name)
    })
    return this.show()
  }
}

const cookie = new CookieHelper();
