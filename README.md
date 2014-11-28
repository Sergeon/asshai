Astonishing Super Simple Html Attribute Injector
=================================

	Asshai is a small plugin to add attributes to html tags programmatically. 
	This helps a lot when dealing with js libraries that relies on html attributes,
	like some form validation plugins or, i.e., the skrollr library. 


[![License](https://poser.pugx.org/leaphly/cart-bundle/license.png)](https://packagist.org/packages/leaphly/cart-bundle)


## Author

Mauro Caffaratto

## License

licensed under the MIT and GPL licenses


##Dependencies
This script needs jQuery to work.

##Current version: 0.1 

## Fast example
```html 
	<div class="ball" asshai="topDownAnimation"></div>

```


```javascript
//Create an Asshai attribute collection:

	Asshai.create("topDownAnimation").addAttrSet({
		'data-0' : 'top : 0px;'
		'data-1000' : 'top : 1000px',
	});
	
	Asshai.execute(); //this reads every asshai attribute in your html and generate the attributes within the attribute collector object.

```



Methods are chainable and there are some ways you can compose an attribute collector:


```javascript
//in case you are working with a form validation plugin: 

	Asshai.create("basicVal").addAttr("required").addAttr("type" , "text").addAttr("minLength" , "3");
	
	Asshai.create("longVal").addFrom("basicVal").addAttr("minLength" , "15"); //addAttr replace the attribute value. 
	
	Asshai.execute();
```

##Objects:

This plugin generates a window object, Asshai, wich provides attributeCollectors, parses DOM to apply attributes to 
nodes with an 'asshai' attribute and have few some utilities.

Asshai.create() returns an attributeCollector, an object to add, remove or merge attributes into itself. A collector can 
inherit properties from other collectors. 

###Api

Asshai.config( options )
-----

Options to set Asshai behavoiur. 

###separator

The string to output between values whenever you add a value to an existing attribute. " ; " is the default value. 

Asshai.create(name)
-----

Creates a collector with name and return it. You can use it just by append cahinable methods, storing it into a var or 
using get()	
	
	
Asshai.get( name )
-----

Returns collector with given name. 	
	
Asshai.killCollector(name)

Deletes the given collector. 

Asshai.execute()
-----

Parses the document and add the attributes of the collectors into dom nodes  wich have an asshai attribute pointing to its name.



##AttributeCollector API

addAttr(name , value)
-----
Add the attribute to the collector. Replace value if exists before. 

AddTo(name ,value)
-----
add the value to attribute after separator, if its existed before. Otherwise, just create the attribute with value. 

AddFrom( collectorName )
-----
Gets the attributes from another collector. Append value to existing attributes.

replaceFromAndReplaceEquals( collectorName )
-----
Gets the attributes from another collector and override existing ones.

addAttrSet( data )
-----
Add every key-value par in data as a new attribute. 

getAttributes()
-----
returns a copy of the attributes of the collector. 

killAttr( name )
-----
Deletes given attribute from self. 

switchIndex( oldName , newName )
-----
Change an attribute name to newName, with its former value. 

debug()
-----
Logs a representation of the object to the console. 

