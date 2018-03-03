/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(27);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(57),
    getValue = __webpack_require__(63);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(14),
    getRawTag = __webpack_require__(59),
    objectToString = __webpack_require__(60);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(47),
    listCacheDelete = __webpack_require__(48),
    listCacheGet = __webpack_require__(49),
    listCacheHas = __webpack_require__(50),
    listCacheSet = __webpack_require__(51);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(12);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(1);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(73);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(29),
    baseAssignValue = __webpack_require__(30);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(31),
    baseKeys = __webpack_require__(86),
    isArrayLike = __webpack_require__(20);

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// prettier-ignore
module.exports = {
  charset: [
    0xF0, 0x90, 0x90, 0x90, 0xF0, //0
    0x20, 0x60, 0x20, 0x20, 0x70, //1
    0xF0, 0x10, 0xF0, 0x80, 0xF0, //2
    0xF0, 0x10, 0xF0, 0x10, 0xF0, //3
    0x90, 0x90, 0xF0, 0x10, 0x10, //4
    0xF0, 0x80, 0xF0, 0x10, 0xF0, //5
    0xF0, 0x80, 0xF0, 0x90, 0xF0, //6
    0xF0, 0x10, 0x20, 0x40, 0x40, //7
    0xF0, 0x90, 0xF0, 0x90, 0xF0, //8
    0xF0, 0x90, 0xF0, 0x10, 0xF0, //9
    0xF0, 0x90, 0xF0, 0x90, 0x90, //A
    0xE0, 0x90, 0xE0, 0x90, 0xE0, //B
    0xF0, 0x80, 0x80, 0x80, 0xF0, //C
    0xE0, 0x90, 0x90, 0x90, 0xE0, //D
    0xF0, 0x80, 0xF0, 0x80, 0xF0, //E
    0xF0, 0x80, 0xF0, 0x80, 0x80, //F
  ],
  charOffset: {
    0x0: 0,
    0x1: 5,
    0x2: 10,
    0x3: 15,
    0x4: 20,
    0x5: 25,
    0x6: 30,
    0x7: 35,
    0x8: 40,
    0x9: 45,
    0xA: 50,
    0xB: 55,
    0xC: 60,
    0xD: 65,
    0xE: 70,
    0xF: 75
  },
  screenWidth: 64,
  screenHeight: 32,
  keys: {
    1: '1',
    2: '2',
    3: '3',
    c: '4',
    4: 'q',
    5: 'w',
    6: 'e',
    d: 'r',
    7: 'a',
    8: 's',
    9: 'd',
    e: 'f',
    a: 'z',
    0: 'x',
    b: 'c',
    f: 'v'
  }
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(1),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(0);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(27);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module)))

/***/ }),
/* 19 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(26),
    isLength = __webpack_require__(34);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var arrayFilter = __webpack_require__(94),
    stubArray = __webpack_require__(37);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var DataView = __webpack_require__(98),
    Map = __webpack_require__(13),
    Promise = __webpack_require__(99),
    Set = __webpack_require__(100),
    WeakMap = __webpack_require__(101),
    baseGetTag = __webpack_require__(4),
    toSource = __webpack_require__(28);

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(104);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

const cloneDeep = __webpack_require__(25);
const values = __webpack_require__(115);
const range = __webpack_require__(118);

const consts = __webpack_require__(11);
const h = __webpack_require__(125);

function Chip8() {
  this.memory = null;
  this.v = null; //8bit registers
  this.i = null; //16bit register
  this.pc = null;
  this.stack = null;
  this.display = null;
  this.delayTimer = null;
  this.soundTimer = null;
}

function clone(fn) {
  return function(chip8, ...args) {
    const newChip8 = cloneDeep(chip8);
    return fn.call(null, newChip8, ...args);
  };
}

function reset(chip8) {
  chip8.memory = Array(4096).fill(0);
  chip8.v = new Uint8Array(16); //8bit registers
  chip8.i = 0; //16bit register
  chip8.pc = 0x200;
  chip8.stack = [];
  chip8.display = Array(64 * 32).fill(0); //video ram
  chip8.delayTimer = 0;
  chip8.soundTimer = 0;
  return chip8;
}

function loadCharset(chip8) {
  for (let i = 0x000; i < 0x050; i++) {
    chip8.memory[i] = consts.charset[i];
  }
  return chip8;
}

function setV(chip8, vi, val) {
  chip8.v[vi] = val;
  return chip8;
}

function setI(chip8, val) {
  chip8.i = val;
  return chip8;
}

function setMemory(chip8, addr, val) {
  chip8.memory[addr] = val;
  return chip8;
}

function setDelayTimer(chip8, val) {
  chip8.delayTimer = val;
  return chip8;
}

function toJSON(chip8) {
  return JSON.stringify(chip8);
}

function fromJSON(chip8) {
  const loadedChip = JSON.parse(chip8);
  loadedChip.v = Uint8Array.from(values(loadedChip.v));
  return loadedChip;
}

function cls(chip8) {
  chip8.display = Array(64 * 32).fill(0);
  return chip8;
}

function ret(chip8) {
  chip8.pc = chip8.stack.pop();
  return chip8;
}

function jp(chip8, addr) {
  chip8.pc = addr;
  return chip8;
}

function call(chip8, addr) {
  chip8.stack.push(chip8.pc);
  chip8.pc = addr;
  return chip8;
}

function se(chip8, v, byte) {
  if (chip8.v[v] === byte) {
    chip8.pc += 2;
  }
  return chip8;
}

function sne(chip8, v, byte) {
  if (chip8.v[v] !== byte) {
    chip8.pc += 2;
  }
  return chip8;
}

function seXY(chip8, x, y) {
  if (chip8.v[x] === chip8.v[y]) {
    chip8.pc += 2;
  }
  return chip8;
}

function ld(chip8, x, byte) {
  chip8.v[x] = byte;
  return chip8;
}

function add(chip8, x, byte) {
  chip8.v[x] += byte;
  return chip8;
}

function ldXY(chip8, x, y) {
  chip8.v[x] = chip8.v[y];
  return chip8;
}

function orXY(chip8, x, y) {
  chip8.v[x] |= chip8.v[y];
  return chip8;
}

function andXY(chip8, x, y) {
  chip8.v[x] &= chip8.v[y];
  return chip8;
}

function xorXY(chip8, x, y) {
  chip8.v[x] ^= chip8.v[y];
  return chip8;
}

function addXY(chip8, x, y) {
  const sum = chip8.v[x] + chip8.v[y];
  chip8.v[0xf] = sum > 0xff ? 0x01 : 0x00;
  chip8.v[x] = sum;
  return chip8;
}

function subXY(chip8, x, y) {
  const difference = chip8.v[x] - chip8.v[y];
  chip8.v[0xf] = chip8.v[x] > chip8.v[y] ? 0x01 : 0x00;
  chip8.v[x] = difference;
  return chip8;
}

function shrX(chip8, x) {
  const vx = chip8.v[x];
  chip8.v[0xf] = vx & 0b00000001;
  chip8.v[x] = vx >> 1;
  return chip8;
}

function subnXY(chip8, x, y) {
  const difference = chip8.v[y] - chip8.v[x];
  chip8.v[0xf] = chip8.v[y] > chip8.v[x] ? 0x01 : 0x00;
  chip8.v[x] = difference;
  return chip8;
}

function shlX(chip8, x) {
  const vx = chip8.v[x];
  chip8.v[0xf] = vx >> 7;
  chip8.v[x] = vx << 1;
  return chip8;
}

function sneXY(chip8, x, y) {
  if (chip8.v[x] !== chip8.v[y]) {
    chip8.pc = chip8.pc + 2;
  }
  return chip8;
}

function ldI(chip8, byte) {
  chip8.i = byte;
  return chip8;
}

function jpV0(chip8, addr) {
  chip8.pc = chip8.v[0] + addr;
  return chip8;
}

function rnd(chip8, x, byte) {
  chip8.v[x] = Math.floor(Math.random() * 256) & byte;
  return chip8;
}

function drw(chip8, x, y, byte) {
  let vf = 0;
  const xCoord = chip8.v[x];
  const yCoord = chip8.v[y];
  const i = chip8.i;

  for (let y = 0; y < byte; y++) {
    const line = chip8.memory[i + y];
    for (let x = 0; x < 8; x++) {
      const val = (line >> (7 - x)) & 0b00000001;
      const index = h.to1D(x + xCoord, y + yCoord);
      const prevVal = chip8.display[index];
      const newVal = val ^ prevVal;
      chip8.display[index] = newVal;
      if (val === 1 && prevVal === 1) {
        vf = 1;
      }
    }
  }
  chip8.v[0xf] = vf;
  return chip8;
}

function skp(chip8, x, keys) {
  if (keys[chip8.v[x]] === true) chip8.pc += 2;
  return chip8;
}

function sknp(chip8, x, keys) {
  if (keys[chip8.v[x]] === false) chip8.pc += 2;
  return chip8;
}

function ldVxDT(chip8, x) {
  chip8.v[x] = chip8.delayTimer;
  return chip8;
}

function ldDTVx(chip8, x) {
  chip8.delayTimer = chip8.v[x];
  return chip8;
}

function addIVx(chip8, x) {
  chip8.i += chip8.v[x];
  return chip8;
}

function ldIndirectIVx(chip8, x) {
  range(x + 1).forEach(v => (chip8.memory[chip8.i + v] = chip8.v[v]));
  return chip8;
}

function ldB(chip8, x) {
  const number = chip8.v[x];
  h.toBCD(number).forEach((v, i) => {
    chip8.memory[chip8.i + i] = v;
  });

  return chip8;
}

function ldVxIndirectI(chip8, x) {
  range(x + 1).forEach(v => (chip8.v[v] = chip8.memory[chip8.i + v]));
  return chip8;
}

function ldFVx(chip8, x) {
  chip8.i = consts.charOffset[chip8.v[x]];
  return chip8;
}

function decode(chip, opcode, keyboard, logger) {
  const a = (opcode >> 12) & 0xf;
  const b = (opcode >> 8) & 0xf;
  const c = (opcode >> 4) & 0xf;
  const d = opcode & 0xf;

  chip.pc += 2;

  //0 Group
  switch (a) {
    case 0x0:
      {
        // 00E0 - CLS
        if (b === 0x0 && c === 0xe && d === 0x0) {
          if (logger) logger.log(`00E0 - CLS`);
          return module.exports.cls(chip);
        }
        // 00EE - RET
        if (b === 0x0 && c === 0xe && d === 0xe) {
          if (logger) logger.log(`00EE - RET`);
          return module.exports.ret(chip);
        }
      }
      break;
    case 0x1:
      {
        // 1nnn - JP addr
        const nnn = (b << 8) + (c << 4) + d;
        if (logger) logger.log(`1nnn - JP addr: nnn=${nnn.toString(16)}`);
        return module.exports.jp(chip, nnn);
      }
      break;

    case 0x2:
      {
        // 2nnn - CALL addr
        const nnn = (b << 8) + (c << 4) + d;
        if (logger) logger.log(`2nnn - CALL addr: nnn=${nnn.toString(16)}`);
        return module.exports.call(chip, nnn);
      }
      break;

    case 0x3:
      {
        // 3xkk - SE Vx, byte
        const vx = b;
        const byte = (c << 4) + d;
        if (logger)
          logger.log(
            `3xkk - SE Vx, byte: Vx=${vx.toString(16)}, byte=${byte.toString(
              16
            )}`
          );
        return module.exports.se(chip, vx, byte);
      }
      break;

    case 0x4:
      {
        // 4xkk - SNE Vx, byte
        const vx = b;
        const byte = (c << 4) + d;
        if (logger)
          logger.log(
            `4xkk - SNE Vx, byte: Vx=${vx.toString(16)}, byte=${byte.toString(
              16
            )}`
          );
        return module.exports.sne(chip, vx, byte);
      }
      break;

    case 0x6:
      {
        // 6xkk - LD Vx, byte
        const vx = b;
        const byte = (c << 4) + d;
        if (logger)
          logger.log(
            `6xkk - LD Vx, byte: Vx=${vx.toString(16)}, byte=${byte.toString(
              16
            )}`
          );
        return module.exports.ld(chip, vx, byte);
      }
      break;

    case 0x7:
      {
        // "7xkk - ADD Vx, byte"
        const vx = b;
        const byte = (c << 4) + d;
        if (logger)
          logger.log(
            `7xkk - ADD Vx, byte, byte: Vx=${vx.toString(
              16
            )}, byte=${byte.toString(16)}`
          );
        return module.exports.add(chip, vx, byte);
      }
      break;

    case 0x8:
      // "8xy0 - LD Vx, Vy"
      if (d === 0x0) {
        const vx = b;
        const vy = c;
        if (logger)
          logger.log(
            `8xy0 - LD Vx, Vy: Vx=${vx.toString(16)}, Vy=${vy.toString(16)}`
          );
        return module.exports.ldXY(chip, vx, vy);
      }
      // "8xy2 - AND Vx, Vy"
      if (d === 0x2) {
        const vx = b;
        const vy = c;
        if (logger)
          logger.log(
            `8xy2 - AND Vx, Vy: Vx=${vx.toString(16)}, Vy=${vy.toString(16)}`
          );
        return module.exports.andXY(chip, vx, vy);
      }
      break;

    case 0x9:
      // "9xy0 - SNE Vx, Vy"
      if (d === 0x0) {
        const vx = b;
        const vy = c;
        if (logger)
          logger.log(
            `9xy0 - SNE Vx, Vy: Vx=${vx.toString(16)}, Vy=${vy.toString(16)}`
          );
        return module.exports.sneXY(chip, vx, vy);
      }
      break;

    case 0xa:
      {
        // "Annn - LD I, addr"
        const nnn = (b << 8) + (c << 4) + d;
        if (logger) logger.log(`Annn - LD I, addr: nnn=${nnn.toString(16)}`);
        return module.exports.ldI(chip, nnn);
      }
      break;

    case 0xd:
      // "Dxyn - DRW Vx, Vy, nibble"
      if (logger)
        logger.log(`Dxyn - DRW Vx, Vy, nibble: Vx=${b}, Vy=${c}, nibble=${d}`);
      return module.exports.drw(chip, b, c, d);
      break;

    case 0xc:
      {
        // Cxkk - RND Vx, byte
        const x = b;
        const byte = (c << 4) + d;
        if (logger)
          logger.log(
            `Cxkk - RND Vx, byte, byte: Vx=${x.toString(
              16
            )}, byte=${byte.toString(16)}`
          );

        return module.exports.rnd(chip, x, byte);
      }
      break;
    case 0xe:
      // Ex9E - SKP Vx
      if (c === 0x9 && d === 0xe) {
        const x = b;
        if (logger) logger.log(`Ex9E - SKP Vx, Vx=${x.toString(16)}`);
        return module.exports.skp(chip, x, keyboard.getKeys());
      }
      // ExA1 - SKNP Vx
      if (c === 0xa && d === 0x1) {
        const x = b;
        if (logger) logger.log(`ExA1 - SKNP Vx, Vx=${x.toString(16)}`);
        return module.exports.sknp(chip, x, keyboard.getKeys());
      }
      break;
    case 0xf:
      // Fx07 - LD Vx, DT
      if (c === 0x0 && d === 0x7) {
        const x = b;
        if (logger) logger.log(`Fx07 - LD Vx, DT, Vx=${x.toString(16)}`);
        return module.exports.ldVxDT(chip, x);
      }

      // Fx15 - LD DT, Vx
      if (c === 0x1 && d === 0x5) {
        const x = b;
        if (logger) logger.log(`Fx15 - LD DT, Vx, Vx=${x.toString(16)}`);
        return module.exports.ldDTVx(chip, x);
      }
      // Fx1E - ADD I, Vx
      if (c === 0x1 && d === 0xe) {
        const x = b;
        if (logger) logger.log(`Fx1E - ADD I, Vx=${x.toString(16)}`);
        return module.exports.addIVx(chip, x);
      }
      // Fx29
      if (c === 0x2 && d === 0x9) {
        const x = b;
        if (logger) logger.log(`Fx29, Vx=${x.toString(16)}`);
        return module.exports.ldFVx(chip, x);
      }
      // Fx33
      if (c === 0x3 && d === 0x3) {
        const x = b;
        if (logger) logger.log(`Fx33, Vx=${x.toString(16)}`);
        return module.exports.ldB(chip, x);
      }
      // Fx55
      if (c === 0x5 && d === 0x5) {
        const x = b;
        if (logger) logger.log(`Fx55, Vx=${x.toString(16)}`);
        return module.exports.ldIndirectIVx(chip, x);
      }
      // Fx65
      if (c === 0x6 && d === 0x5) {
        const x = b;
        if (logger) logger.log(`Fx65, Vx=${x.toString(16)}`);
        return module.exports.ldVxIndirectI(chip, x);
      }
      break;
    default:
      break;
  }

  throw new Error(`Illegal opcode: ${opcode.toString(16)}`);
}

function decode2(chip, pc) {
  const opcode = fetch(chip, pc);
  const a = (opcode >> 12) & 0xf;
  const b = (opcode >> 8) & 0xf;
  const c = (opcode >> 4) & 0xf;
  const d = opcode & 0xf;

  //0 Group
  switch (a) {
    case 0x0:
      {
        // 00E0 - CLS
        if (b === 0x0 && c === 0xe && d === 0x0) {
          return "CLS";
        }
        // 00EE - RET
        if (b === 0x0 && c === 0xe && d === 0xe) {
          return "RET";
        }
      }
      break;
    case 0x1:
      {
        // 1nnn - JP addr
        const nnn = (b << 8) + (c << 4) + d;
        return "JP addr";
      }
      break;

    case 0x2:
      {
        // 2nnn - CALL addr
        const nnn = (b << 8) + (c << 4) + d;
        return "CALL addr";
      }
      break;

    case 0x3:
      {
        // 3xkk - SE Vx, byte
        const vx = b;
        const byte = (c << 4) + d;
        return "SE Vx, byte";
      }
      break;

    case 0x4:
      {
        // 4xkk - SNE Vx, byte
        const vx = b;
        const byte = (c << 4) + d;
        return "SNE Vx, byte";
      }
      break;

    case 0x6:
      {
        // 6xkk - LD Vx, byte
        const vx = b;
        const byte = (c << 4) + d;
        return "LD Vx, byte";
      }
      break;

    case 0x7:
      {
        // "7xkk - ADD Vx, byte"
        const vx = b;
        const byte = (c << 4) + d;
        return "ADD Vx, byte";
      }
      break;

    case 0x8:
      // "8xy0 - LD Vx, Vy"
      if (d === 0x0) {
        const vx = b;
        const vy = c;
        return "LD Vx, Vy";
      }
      // "8xy2 - AND Vx, Vy"
      if (d === 0x2) {
        const vx = b;
        const vy = c;
        return "AND Vx, Vy";
      }
      break;

    case 0x9:
      // "9xy0 - SNE Vx, Vy"
      if (d === 0x0) {
        const vx = b;
        const vy = c;
        return "SNE Vx, Vy";
      }
      break;

    case 0xa:
      {
        // "Annn - LD I, addr"
        const nnn = (b << 8) + (c << 4) + d;
        return "LD I, addr";
      }
      break;

    case 0xd:
      // "Dxyn - DRW Vx, Vy, nibble"
      return "DRW Vx, Vy, nibble";
      break;

    case 0xc:
      {
        // Cxkk - RND Vx, byte
        const x = b;
        const byte = (c << 4) + d;
        return "RND Vx, byte";
      }
      break;
    case 0xe:
      // Ex9E - SKP Vx
      if (c === 0x9 && d === 0xe) {
        const x = b;
        return "SKP Vx";
      }
      // ExA1 - SKNP Vx
      if (c === 0xa && d === 0x1) {
        const x = b;
        return "SKNP Vx";
      }
      break;
    case 0xf:
      // Fx07 - LD Vx, DT
      if (c === 0x0 && d === 0x7) {
        const x = b;
        return "LD Vx, DT";
      }

      // Fx15 - LD DT, Vx
      if (c === 0x1 && d === 0x5) {
        const x = b;
        return "LD DT, Vx";
      }
      // Fx1E - ADD I, Vx
      if (c === 0x1 && d === 0xe) {
        const x = b;
        return "ADD I, Vx";
      }
      // Fx29
      if (c === 0x2 && d === 0x9) {
        const x = b;
        return "Fx29";
      }
      // Fx33
      if (c === 0x3 && d === 0x3) {
        const x = b;
        return "Fx33";
      }
      // Fx55
      if (c === 0x5 && d === 0x5) {
        const x = b;
        return "Fx55";
      }
      // Fx65
      if (c === 0x6 && d === 0x5) {
        const x = b;
        return "Fx65";
      }
      break;
    default:
      break;
  }

  return `Illegal opcode: ${opcode.toString(16)}`;
}

function fetch(chip, pc) {
  var pc = pc || chip.pc;
  return (chip.memory[pc] << 8) | chip.memory[pc + 1];
}

function cycle(chip, keyboard, logger) {
  const { pc, memory } = chip;
  const opcode = fetch(chip);
  const args = Array.from(arguments);
  args.splice(1, 0, opcode);
  return module.exports.decode.apply(null, args);
}

function loadRom(chip8, rom) {
  for (let i = 0; i < rom.length; i++) {
    chip8.memory[0x200 + i] = rom[i];
  }
  return chip8;
}

module.exports = {
  Chip8: Chip8,
  reset: clone(reset),
  loadCharset: clone(loadCharset),
  setV: clone(setV),
  setI: clone(setI),
  setMemory: clone(setMemory),
  setDelayTimer: clone(setDelayTimer),
  toJSON: toJSON,
  fromJSON: fromJSON,
  decode: clone(decode),
  decode2: decode2,
  cycle: cycle,
  loadRom: clone(loadRom),
  cls: clone(cls),
  ret: clone(ret),
  jp: clone(jp),
  call: clone(call),
  se: clone(se),
  sne: clone(sne),
  seXY: clone(seXY),
  ld: clone(ld),
  add: clone(add),
  ldXY: clone(ldXY),
  orXY: clone(orXY),
  andXY: clone(andXY),
  xorXY: clone(xorXY),
  addXY: clone(addXY),
  subXY: clone(subXY),
  shrX: clone(shrX),
  subnXY: clone(subnXY),
  shlX: clone(shlX),
  sneXY: clone(sneXY),
  ldI: clone(ldI),
  jpV0: clone(jpV0),
  rnd: clone(rnd),
  drw: clone(drw),
  skp: clone(skp),
  sknp: clone(sknp),
  ldVxDT: clone(ldVxDT),
  ldDTVx: clone(ldDTVx),
  addIVx: clone(addIVx),
  ldIndirectIVx: clone(ldIndirectIVx),
  ldB: clone(ldB),
  ldVxIndirectI: clone(ldVxIndirectI),
  ldFVx: clone(ldFVx)
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var baseClone = __webpack_require__(45);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(4),
    isObject = __webpack_require__(2);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ }),
/* 28 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(30),
    eq = __webpack_require__(12);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(78);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(80),
    isArguments = __webpack_require__(81),
    isArray = __webpack_require__(15),
    isBuffer = __webpack_require__(32),
    isIndex = __webpack_require__(33),
    isTypedArray = __webpack_require__(84);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(0),
    stubFalse = __webpack_require__(83);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module)))

/***/ }),
/* 33 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 34 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(31),
    baseKeysIn = __webpack_require__(89),
    isArrayLike = __webpack_require__(20);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),
/* 37 */
/***/ (function(module, exports) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(39),
    getPrototype = __webpack_require__(40),
    getSymbols = __webpack_require__(21),
    stubArray = __webpack_require__(37);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ }),
/* 39 */
/***/ (function(module, exports) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(35);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var arrayPush = __webpack_require__(39),
    isArray = __webpack_require__(15);

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_scss__);


const emulator = __webpack_require__(44);

emulator.init();
emulator.loadRom(emulator.getSelectedRom());


/***/ }),
/* 43 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

const chip8 = __webpack_require__(24);
const renderer = __webpack_require__(126);
const keyboard = __webpack_require__(127);
const logger = __webpack_require__(128);
const ui = __webpack_require__(129);

let chip;
let rom;
let canvas;
let romSelect;

let running = true;
let reqId = null;

function init() {
  canvas = document.querySelector("#emulator");
  romSelect = document.querySelector("select#rom-select");
  romSelect.onchange = e => loadRom(event.target.value);

  const resetButton = document.querySelector("#reset");
  resetButton.onclick = e => {
    chip = chip8.loadRom(reset(), rom);
  };

  const saveStateButton = document.querySelector("#save-state");
  saveStateButton.onclick = e =>
    window.localStorage.setItem("state", chip8.toJSON(chip));

  const loadStateButton = document.querySelector("#load-state");
  loadStateButton.onclick = e =>
    (chip = chip8.fromJSON(window.localStorage.getItem("state")));

  const pauseButton = document.querySelector("#pause");
  pauseButton.onclick = () => {
    running = false;
    if (reqId) {
      window.cancelAnimationFrame(reqId);
      reqId = null;
    }
  };

  const stepButton = document.querySelector("#step");
  stepButton.onclick = () => {
    if (!running) cycle();
  };

  const continueButton = document.querySelector("#continue");
  continueButton.onclick = () => {
    if (!running) {
      running = true;
      run();
    }
  };

  keyboard.init();
  ui.init();
}

function reset(startRunning = true) {
  running = startRunning;
  if (reqId) {
    window.cancelAnimationFrame(reqId);
    reqId = null;
  }
  ui.reset();
  keyboard.reset();
  logger.reset();
  run();
  return chip8.loadCharset(chip8.reset(new chip8.Chip8()));
}

function getSelectedRom() {
  return romSelect.value;
}

function getRomPath(name) {
  let path = `/roms/${name}`;
  if (true) {
    path = "https://alessandrocuzzocrea.github.io/chip-8-emulator-js" + path;
  }
  return path;
}

function loadRom(name) {
  return fetch(getRomPath(name))
    .then(res => res.arrayBuffer())
    .then(data => {
      rom = new Uint8Array(data);
      chip = chip8.loadRom(reset(), rom);
    });
}

function cycle() {
  ui.update(chip);
  chip = chip8.cycle(chip, keyboard, logger);
  renderer.render(chip, canvas);
  chip.delayTimer = Math.max(0, chip.delayTimer - 1);
  if (running) reqId = window.requestAnimationFrame(cycle);
}

function run() {
  window.requestAnimationFrame(cycle);
}

module.exports = {
  init,
  getSelectedRom,
  loadRom,
  run
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(46),
    arrayEach = __webpack_require__(77),
    assignValue = __webpack_require__(29),
    baseAssign = __webpack_require__(79),
    baseAssignIn = __webpack_require__(88),
    cloneBuffer = __webpack_require__(91),
    copyArray = __webpack_require__(92),
    copySymbols = __webpack_require__(93),
    copySymbolsIn = __webpack_require__(95),
    getAllKeys = __webpack_require__(96),
    getAllKeysIn = __webpack_require__(97),
    getTag = __webpack_require__(22),
    initCloneArray = __webpack_require__(102),
    initCloneByTag = __webpack_require__(103),
    initCloneObject = __webpack_require__(109),
    isArray = __webpack_require__(15),
    isBuffer = __webpack_require__(32),
    isMap = __webpack_require__(111),
    isObject = __webpack_require__(2),
    isSet = __webpack_require__(113),
    keys = __webpack_require__(10);

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });

    return result;
  }

  if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });

    return result;
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(5),
    stackClear = __webpack_require__(52),
    stackDelete = __webpack_require__(53),
    stackGet = __webpack_require__(54),
    stackHas = __webpack_require__(55),
    stackSet = __webpack_require__(56);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),
/* 47 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(5);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),
/* 54 */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(5),
    Map = __webpack_require__(13),
    MapCache = __webpack_require__(64);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(26),
    isMasked = __webpack_require__(61),
    isObject = __webpack_require__(2),
    toSource = __webpack_require__(28);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 58 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(14);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 60 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(62);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(0);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 63 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(65),
    mapCacheDelete = __webpack_require__(72),
    mapCacheGet = __webpack_require__(74),
    mapCacheHas = __webpack_require__(75),
    mapCacheSet = __webpack_require__(76);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(66),
    ListCache = __webpack_require__(5),
    Map = __webpack_require__(13);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(67),
    hashDelete = __webpack_require__(68),
    hashGet = __webpack_require__(69),
    hashHas = __webpack_require__(70),
    hashSet = __webpack_require__(71);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(7);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 68 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(7);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(7);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(7);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(8);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 73 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(8);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(8);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(8);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 77 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(1);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(9),
    keys = __webpack_require__(10);

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ }),
/* 80 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(82),
    isObjectLike = __webpack_require__(3);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(4),
    isObjectLike = __webpack_require__(3);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 83 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(85),
    baseUnary = __webpack_require__(17),
    nodeUtil = __webpack_require__(18);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(4),
    isLength = __webpack_require__(34),
    isObjectLike = __webpack_require__(3);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var isPrototype = __webpack_require__(19),
    nativeKeys = __webpack_require__(87);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(35);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(9),
    keysIn = __webpack_require__(36);

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2),
    isPrototype = __webpack_require__(19),
    nativeKeysIn = __webpack_require__(90);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),
/* 90 */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(0);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module)))

/***/ }),
/* 92 */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(9),
    getSymbols = __webpack_require__(21);

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ }),
/* 94 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(9),
    getSymbolsIn = __webpack_require__(38);

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(41),
    getSymbols = __webpack_require__(21),
    keys = __webpack_require__(10);

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(41),
    getSymbolsIn = __webpack_require__(38),
    keysIn = __webpack_require__(36);

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(1),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(1),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(1),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(1),
    root = __webpack_require__(0);

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ }),
/* 102 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(23),
    cloneDataView = __webpack_require__(105),
    cloneRegExp = __webpack_require__(106),
    cloneSymbol = __webpack_require__(107),
    cloneTypedArray = __webpack_require__(108);

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(0);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(23);

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ }),
/* 106 */
/***/ (function(module, exports) {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(14);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(23);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(110),
    getPrototype = __webpack_require__(40),
    isPrototype = __webpack_require__(19);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsMap = __webpack_require__(112),
    baseUnary = __webpack_require__(17),
    nodeUtil = __webpack_require__(18);

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var getTag = __webpack_require__(22),
    isObjectLike = __webpack_require__(3);

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

module.exports = baseIsMap;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsSet = __webpack_require__(114),
    baseUnary = __webpack_require__(17),
    nodeUtil = __webpack_require__(18);

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var getTag = __webpack_require__(22),
    isObjectLike = __webpack_require__(3);

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}

module.exports = baseIsSet;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var baseValues = __webpack_require__(116),
    keys = __webpack_require__(10);

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object == null ? [] : baseValues(object, keys(object));
}

module.exports = values;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var arrayMap = __webpack_require__(117);

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;


/***/ }),
/* 117 */
/***/ (function(module, exports) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var createRange = __webpack_require__(119);

/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
 * `start` is specified without an `end` or `step`. If `end` is not specified,
 * it's set to `start` with `start` then set to `0`.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @param {number} [step=1] The value to increment or decrement by.
 * @returns {Array} Returns the range of numbers.
 * @see _.inRange, _.rangeRight
 * @example
 *
 * _.range(4);
 * // => [0, 1, 2, 3]
 *
 * _.range(-4);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 5);
 * // => [1, 2, 3, 4]
 *
 * _.range(0, 20, 5);
 * // => [0, 5, 10, 15]
 *
 * _.range(0, -4, -1);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 4, 0);
 * // => [1, 1, 1]
 *
 * _.range(0);
 * // => []
 */
var range = createRange();

module.exports = range;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var baseRange = __webpack_require__(120),
    isIterateeCall = __webpack_require__(121),
    toFinite = __webpack_require__(122);

/**
 * Creates a `_.range` or `_.rangeRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new range function.
 */
function createRange(fromRight) {
  return function(start, end, step) {
    if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
      end = step = undefined;
    }
    // Ensure the sign of `-0` is preserved.
    start = toFinite(start);
    if (end === undefined) {
      end = start;
      start = 0;
    } else {
      end = toFinite(end);
    }
    step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
    return baseRange(start, end, step, fromRight);
  };
}

module.exports = createRange;


/***/ }),
/* 120 */
/***/ (function(module, exports) {

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil,
    nativeMax = Math.max;

/**
 * The base implementation of `_.range` and `_.rangeRight` which doesn't
 * coerce arguments.
 *
 * @private
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */
function baseRange(start, end, step, fromRight) {
  var index = -1,
      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
      result = Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}

module.exports = baseRange;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(12),
    isArrayLike = __webpack_require__(20),
    isIndex = __webpack_require__(33),
    isObject = __webpack_require__(2);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

var toNumber = __webpack_require__(123);

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2),
    isSymbol = __webpack_require__(124);

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(4),
    isObjectLike = __webpack_require__(3);

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

const c = __webpack_require__(11);

function to1D(x, y) {
  return x + y * c.screenWidth;
}

function toBCD(x) {
  if (x >= 256) throw new Error("Can't convert number >= 256");
  if (x < 0) throw new Error("Can't convert number < 0");

  const str = x.toString().padStart(3, "0");
  return [parseInt(str[0], 10), parseInt(str[1], 10), parseInt(str[2], 10)];
}

module.exports = {
  to1D,
  toBCD
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

const c = __webpack_require__(11);

const SCALE = 8;

function render(chip, canvas) {
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#1abc9c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#2c3e50";

  for (let y = 0; y < c.screenHeight; y++) {
    for (let x = 0; x < c.screenWidth; x++) {
      if (chip.display[x + y * c.screenWidth] !== 0x0) {
        ctx.fillRect(x * SCALE, y * SCALE, SCALE, SCALE);
      }
    }
  }
}

module.exports = { render };


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

const cloneDeep = __webpack_require__(25);

const c = __webpack_require__(11);

let keys;

function init() {
  window.addEventListener("keydown", e => module.exports._onKeyDown(e.key));
  window.addEventListener("keyup", e => module.exports._onKeyUp(e.key));

  reset();
}

function reset() {
  keys = {
    1: false,
    2: false,
    3: false,
    c: false,
    4: false,
    5: false,
    6: false,
    d: false,
    7: false,
    8: false,
    9: false,
    e: false,
    a: false,
    0: false,
    b: false,
    f: false
  };
}

function getKeys() {
  return cloneDeep(keys);
}

function setKey(key, pressed) {
  keys[key] = pressed;
}

function _onKeyDown(key) {
  // prettier-ignore
  switch(key){
    case c.keys["1"]: keys["1"] = true; break;
    case c.keys["2"]: keys["2"] = true; break;
    case c.keys["3"]: keys["3"] = true; break;
    case c.keys["c"]: keys["c"] = true; break;
    case c.keys["4"]: keys["4"] = true; break;
    case c.keys["5"]: keys["5"] = true; break;
    case c.keys["6"]: keys["6"] = true; break;
    case c.keys["d"]: keys["d"] = true; break;
    case c.keys["7"]: keys["7"] = true; break;
    case c.keys["8"]: keys["8"] = true; break;
    case c.keys["9"]: keys["9"] = true; break;
    case c.keys["e"]: keys["e"] = true; break;
    case c.keys["a"]: keys["a"] = true; break;
    case c.keys["0"]: keys["0"] = true; break;
    case c.keys["b"]: keys["b"] = true; break;
    case c.keys["f"]: keys["f"] = true; break;
  }
}

function _onKeyUp(key) {
  // prettier-ignore
  switch(key){
    case c.keys["1"]: keys["1"] = false; break;
    case c.keys["2"]: keys["2"] = false; break;
    case c.keys["3"]: keys["3"] = false; break;
    case c.keys["c"]: keys["c"] = false; break;
    case c.keys["4"]: keys["4"] = false; break;
    case c.keys["5"]: keys["5"] = false; break;
    case c.keys["6"]: keys["6"] = false; break;
    case c.keys["d"]: keys["d"] = false; break;
    case c.keys["7"]: keys["7"] = false; break;
    case c.keys["8"]: keys["8"] = false; break;
    case c.keys["9"]: keys["9"] = false; break;
    case c.keys["e"]: keys["e"] = false; break;
    case c.keys["a"]: keys["a"] = false; break;
    case c.keys["0"]: keys["0"] = false; break;
    case c.keys["b"]: keys["b"] = false; break;
    case c.keys["f"]: keys["f"] = false; break;
  }
}

module.exports = { init, reset, getKeys, setKey, _onKeyDown, _onKeyUp };


/***/ }),
/* 128 */
/***/ (function(module, exports) {

let logs = [];

function reset() {
  logs = [];
}
function log(msg) {
  logs.push(msg);
}

function printLast() {
  console.log(logs[logs.length - 1]);
}

module.exports = {
  reset,
  log,
  printLast
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

const chip8 = __webpack_require__(24);

let lastPc = 0;

let instructionsDiv;
let pcDiv,
  iDiv,
  spDiv,
  dtDiv,
  stDiv,
  v0Div,
  v1Div,
  v2Div,
  v3Div,
  v4Div,
  v5Div,
  v6Div,
  v7Div,
  v8Div,
  v9Div,
  vaDiv,
  vbDiv,
  vcDiv,
  vdDiv,
  veDiv,
  vfDiv;

function init() {
  instructionsDiv = document.querySelector(".instructions");

  pcDiv = document.querySelector("#pc");
  iDiv = document.querySelector("#i");
  spDiv = document.querySelector("#sp");
  dtDiv = document.querySelector("#dt");
  stDiv = document.querySelector("#st");
  v0Div = document.querySelector("#v0");
  v1Div = document.querySelector("#v1");
  v2Div = document.querySelector("#v2");
  v3Div = document.querySelector("#v3");
  v4Div = document.querySelector("#v4");
  v5Div = document.querySelector("#v5");
  v6Div = document.querySelector("#v6");
  v7Div = document.querySelector("#v7");
  v8Div = document.querySelector("#v8");
  v9Div = document.querySelector("#v9");
  vaDiv = document.querySelector("#va");
  vbDiv = document.querySelector("#vb");
  vcDiv = document.querySelector("#vc");
  vdDiv = document.querySelector("#vd");
  veDiv = document.querySelector("#ve");
  vfDiv = document.querySelector("#vf");
}

function reset() {
  lastPc = 0;
}

function update(chip) {
  function formatDebugString(str, digits, val) {
    return `${str}: ${val
      .toString(16)
      .padStart(digits, "0")
      .toUpperCase()}`;
  }

  function formatHex(num) {
    return num
      .toString(16)
      .padStart(4, "0")
      .toUpperCase();
  }

  // Instructions
  while (instructionsDiv.firstChild) {
    instructionsDiv.removeChild(instructionsDiv.firstChild);
  }

  const currentPc = chip.pc;
  const lastPcDiff = currentPc - lastPc;
  if (lastPcDiff > 18 * 2 || lastPcDiff < 0) {
    lastPc = currentPc;
  }
  let pc = Math.max(lastPc - 2, 0);
  for (let i = 0; i < 20; i++) {
    const el = document.createElement("div");
    el.innerHTML = `${formatHex(pc)}| ${chip8.decode2(chip, pc)}`;

    if (pc === currentPc) {
      el.classList.add("current-instruction");
    }

    instructionsDiv.appendChild(el);
    pc += 2;
  }

  // Registers
  pcDiv.innerHTML = formatDebugString("PC", 4, chip.pc);
  iDiv.innerHTML = formatDebugString("I", 4, chip.i);
  spDiv.innerHTML = formatDebugString("SP", 2, chip.stack.length);
  dtDiv.innerHTML = formatDebugString("DT", 2, chip.delayTimer);
  stDiv.innerHTML = formatDebugString("ST", 2, chip.soundTimer);

  v0Div.innerHTML = formatDebugString("V0", 2, chip.v[0]);
  v1Div.innerHTML = formatDebugString("V1", 2, chip.v[1]);
  v2Div.innerHTML = formatDebugString("V2", 2, chip.v[2]);
  v3Div.innerHTML = formatDebugString("V3", 2, chip.v[3]);
  v4Div.innerHTML = formatDebugString("V4", 2, chip.v[4]);
  v5Div.innerHTML = formatDebugString("V5", 2, chip.v[5]);
  v6Div.innerHTML = formatDebugString("V6", 2, chip.v[6]);
  v7Div.innerHTML = formatDebugString("V7", 2, chip.v[7]);
  v8Div.innerHTML = formatDebugString("V8", 2, chip.v[8]);
  v9Div.innerHTML = formatDebugString("V9", 2, chip.v[9]);
  vaDiv.innerHTML = formatDebugString("VA", 2, chip.v[10]);
  vbDiv.innerHTML = formatDebugString("VB", 2, chip.v[11]);
  vcDiv.innerHTML = formatDebugString("VC", 2, chip.v[12]);
  vdDiv.innerHTML = formatDebugString("VD", 2, chip.v[13]);
  veDiv.innerHTML = formatDebugString("VE", 2, chip.v[14]);
  vfDiv.innerHTML = formatDebugString("VF", 2, chip.v[15]);
}

module.exports = { init, update, reset };


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map