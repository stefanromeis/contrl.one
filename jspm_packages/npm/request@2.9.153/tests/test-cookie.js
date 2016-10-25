/* */ 
var Cookie = require('../vendor/cookie/index'),
    assert = require('assert');
var str = 'sid="s543qactge.wKE61E01Bs%2BKhzmxrwrnug="; path=/; httpOnly; expires=Sat, 04 Dec 2010 23:27:28 GMT';
var cookie = new Cookie(str);
assert.equal(cookie.toString(), str);
assert.equal(cookie.path, '/');
assert.equal(cookie.httpOnly, true);
assert.equal(cookie.name, 'sid');
assert.equal(cookie.value, '"s543qactge.wKE61E01Bs%2BKhzmxrwrnug="');
assert.equal(cookie.expires instanceof Date, true);
var cookie = new Cookie('foo=bar', {url: 'http://foo.com/bar'});
assert.equal(cookie.path, '/bar');
console.log('All tests passed');
