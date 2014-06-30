# ArrayLike

A hash that allows to store objects and request them by index or string. Useful in templates, to pre-process data
Since its primary intent is to be used in pre-processed templates, no effort has been made on performance or cross-browser compatibility.

## Usage

```js
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
```