var ArrayLike = require('../index');

var o = function(name,prop){
	return {'name':name,prop:prop}
}

describe('ArrayLike', function () {
	
	describe('Instantiation', function () {
		
		it('No arguments', function () {
			var list = new ArrayLike('name');
			list.length.should.equal(0);
		});
		
		it('With arguments', function () {
			var list = new ArrayLike('name',o('foo'),o('baz'),o('bar'));
			list.length.should.equal(3);
			/**list.get(0).should.equal(1);
			list.get(1).should.equal(2);
			list.get(2).should.equal(3);
			**/
		});
		
	});
	
	describe('#push()', function () {
		var list;
		
		beforeEach(function (){
			list = new ArrayLike('name');
		});
		
		it('should return the correct length', function () {
			list.push(o('foo')).should.equal(1);
		});
		
		it('should append to the correct index', function () {
			var idx = list.push(o('foo')) - 1;
			list[idx].name.should.equal('foo');
		});
	});
	

	describe('Iterators', function () {
		var list;
		
		before(function () {
			list = new ArrayLike('name',o('foo',1),o('bar',2),o('baz',3),o('something',4));
		});
		
		describe('#forEach', function () {
			
			it('should iterate in order', function () {
				list.forEach(function (item, idx) {
					item.prop.should.equal(idx + 1);
				});
			});
		});
	});
	
	describe('#toString()', function () {
		it('should make strings like a regular array', function () {
			var list = new ArrayLike('name',o('a'),o('b'));
			list.toString().should.equal('{"a":{"name":"a"},"b":{"name":"b"}}');
		});
	});

	describe('#fromArray',function(){
		it('should create objects from an array',function(){
			var _albums = [
				{
					title:'vacation pictures'
				,	images:['vacation 1','vacation 2']
				}
			,	{
					title:'cover pictures'
				,	images:['cover 1','cover 2']
				}
			,	{
					title:'cats photos'
				,	images:['cat 1','cat 2']
				}
			]
			var albums = new ArrayLike('title')
			albums.fromArray(_albums);

			albums[0].images[0].should.equal('vacation 1')
			albums['cats photos'].images[0].should.equal('cat 1')
			albums[1].should.equal(albums['cover pictures'])
		})
	})

	describe('#indexes',function(){
		it('should be able to request objects by strings',function(){
			var list = new ArrayLike('name')
			for(var i = 0; i<10;i++){
				list.push({name:'name_'+i,number:i});
			}
			list[0].number.should.equal(list['name_0'].number);
		})
	})

});