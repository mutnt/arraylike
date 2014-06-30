var __slice = Array.prototype.slice;

var addProperty = function(obj,propName,propValue){
	Object.defineProperty(obj,propName,{
		enumerable: false
	,	configurable: true
	,	writable: true
	,	value: propValue
	})
}

var addProperties = function(obj,model){
	var keys = Object.keys(model)
	,	i = 0
	,	l = keys.length
	,	propName
	,	propValue
	;
	for(i;i<l;i++){
		propName = keys[i];
		propValue = model[propName];
		if(!obj.hasOwnProperty(propName)){addProperty(obj,propName,propValue);}
	}

}

var ArrayLike = function(propertyName){
	var arr = __slice.call(arguments);
	if(!arr.length){throw new Error('ArrayLike should be instanciated with at least a property name');}
	propertyName = arr.shift();
	this._propertyName = propertyName;
	if(arr.length){
		this.fromArray(arr);
	}
}

ArrayLike.isArrayLike = function(obj){
	return obj && obj.hasOwnProperty('length') && object.hasOwnProperty('splice');
}

var methods = {
	length:0
,	_map:[]
,	_propertyName:null
,	_addProperty:function(val,obj){
		this._map.push(val);
		addProperty(this,val,obj);
	}
,	fromArray:function(arr){
		var i = 0
		,	l = arr.length
		;
		for(i;i<l;i++){
			this.pushOne(arr[i]);
		}
		return this.length;
	}
,	fromObject:function(obje){
		var keys = Object.keys(obj)
		,	i = 0
		,	l = keys.length
		,	key
		,	obj
		;
		for(i;i<l;i++){
			key = keys[i];
			obj = obje[key];
			this._addProperty(key,obj);
			this[this.length++] = obj;
		}
		return this.length
	}
	//Adds one or more elements to the end of an array and returns the new length of the array.
,	push: function(){
		var arr = __slice.call(arguments)
		return this.fromArray(arr);
	}
,	pushOne:function(obj){
		var val = obj[this._propertyName];
		;
		this[this.length++] = obj;
		this._addProperty(val,obj);
		return this.length;
	}
	//Reverses the order of the elements of an array -- the first becomes the last, and the last becomes the first.
,	reverse: function(){
		var i = 0
		,	l = this.length
		,	temp = []
		;
		for(i;i<l;i++){
			temp.push(this[i]);
		}
		temp.reverse;
		for(i=0;i<l;i++){
			this[i] = temp[i];
		}
	}
,	moveLeft:function(from,howMuch){
		howMuch = howMuch || 1;
		from = from || 0;
		var i = from
		,	l = from + howMuch
		,	temp = []
		;
		if(l>this.length){l = this.length}
		for(i;i<l;i++){
			temp.push(this[i]);
			this[i] = null;
		}
		i = 0;
		l = temp.length;
		for(i;i<l;i++){
			this.pushOne(temp[i]);
		}
	}
,	insert:function(obj,idx){
		var val = obj[this._propertyName]
		,	i = idx
		,	l = this.length
		;
		if(idx>=this.length){return this.pushOne(obj);}
		for(l;l>idx;l--){
			this[l] = this[l-1];
		}
		this.length++;
		this[idx] = obj;
		this._addProperty(val,obj);
		return this.length;
	}
,	remove:function(idx){
		if(idx >= this.length){return;}
		var obj = this[idx]
		,	val = obj[this._propertyName]
		,	i = (idx = this.length -1 ) ? 0 : idx+1
		,	l
		;
		var ret = this[idx];
		delete this[idx];
		delete this[val];
		l  = this.length--;
		for(i;i<l;i++){
			this[i-1] = this[i];
		}
		return ret;
	}
	//Removes the first element from an array and returns that element.
,	shift: function(){
		return this.remove(0)
	}
	//Removes the last element from an array and returns that element.
,	pop: function(){
		return this.remove(this.length-1)
	}
,	asObject: function(){
		var obj = {}
		,	i = 0
		,	l = this._map.length
		,	propName
		;
		for(i;i<l;i++){
			propName = this._map[i];
			obj[propName] = this[propName];
		}
		return obj;
	}
,	asArray:function(){
		var i = 0
		,	l = this.length
		,	temp = []
		;
		for(i;i<l;i++){
			temp.push(this[i]);
		}
		return temp;
	}
	//Sorts the elements of an array in place and returns the array.
,	sort: function(fn){
		var i = 0
		,	l = this.length
		,	temp = this.asArray()
		;
		temp.sort(fn);
		for(i;i<l;i++){
			this[i] = temp[i];
		}
		return sort;
	}
	//Adds and/or removes elements from an array.
,	splice: function(idx,howMany,add){
		var elements = __slice.call(arguments);
		idx = elements.shift();
		howMany = elements.shift();
		this.moveLeft(idx,howMany);
		var i = 0
		,	l = elements.length
		,	val
		,	obj
		;
		for(i,idx;i<l;i++,idx++){
			obj = elements[i]
			val = obj[this._propertyName]
			this[idx] = obj
			this._addProperty(val,obj)
		}

	}
	//Adds one or more elements to the front of an array and returns the new length of the array.
,	unshift: function(){
		throw new Error('unshift no implemented yet')
	}
	//Accessor methods
	//These methods do not modify the array and return some representation of the array.
	//
	//Returns a new array comprised of this array joined with other array(s) and/or value(s).
,	concat: function(){
		throw new Error('concat no implemented yet')
	}
	//Joins all elements of an array into a string.
,	join: function(){
		throw new Error('join no implemented yet')
	}
	//Extracts a section of an array and returns a new array.
,	slice: function(begin,end){
		throw new Error('slice no implemented yet')	
	}
	//Returns a string representing the array and its elements. Overrides the Object.prototype.toString() method.
,	toString: function(){
		var obj = this.asObject();
		return JSON.stringify(obj);
	}
	//Returns the first (least) index of an element within the array equal to the specified value, or -1 if none is found.
,	indexOf: function(field,value){
		var i = 0
		,	l = this.length
		;
		for(i;i<l;i++){
			if(this[i][field] && this[i][field] == value){return i;}
		}
		return -1;
	}
	//Returns the last (greatest) index of an element within the array equal to the specified value, or -1 if none is found.
,	lastIndexOf: function(){
		var l = 0
		,	i = this.length -1
		;
		for(i;i>0;i--){
			if(this[i][field] && this[i][field] == value){return i;}
		}
		return -1;
	}
	//Calls a function for each element in the array.
,	forEach: function(fn){
		var i = 0
		,	l = this.length
		;
		for(i;i<l;i++){
			fn(this[i],i);
		}
	}
	//Returns true if every element in this array satisfies the provided testing function.
,	every: function(){
		throw new Error('every no implemented yet')
	}
	//Returns true if at least one element in this array satisfies the provided testing function.
,	some: function(){
		throw new Error('some no implemented yet')
	}
	//Creates a new array with all of the elements of this array for which the provided filtering function returns true.
,	filter: function(){
		throw new Error('filter no implemented yet')
	}
	//Returns the found value in the array, if an element in the array satisfies the provided testing function or undefined if not found.
,	find: function(){
		throw new Error('find no implemented yet')
	}
	//Returns the found index in the array, if an element in the array satisfies the provided testing function or -1 if not found.
,	findIndex: function(){
		throw new Error('findIndex no implemented yet')
	}
	//Returns a new Array Iterator that contains the keys for each index in the array.
,	keys: function(){
		throw new Error('keys no implemented yet')
	}
	//Creates a new array with the results of calling a provided function on every element in this array.
,	map: function(){
		throw new Error('map no implemented yet')
	}
	//Apply a function against an accumulator and each value of the array (from left-to-right) as to reduce it to a single value.
,	reduce: function(){
		throw new Error('reduce no implemented yet')
	}
	//Apply a function against an accumulator and each value of the array (from right-to-left) as to reduce it to a single value.
,	reduceRight: function(){
		throw new Error('reduceRight no implemented yet')
	}
,	lastItem:function(){
		return this[this.length - 1];
	}
,	firstItem:function(){
		return this[0];
	}
}

addProperties(ArrayLike.prototype,methods);

module.exports = ArrayLike;