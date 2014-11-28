
( function(){


	var separator =" ; ";
	
	var config = function( params ){
		
		if (params.separator !== 'undefined')
			separator = params.separator;
		
		//TODO
	};
	
	
	/**
	*TODO create options params to handle behaviour on errors.
	TODO crete option param to handle overwrite attribute behaviour.  
	
	*/
	var attributeCollectors = {};

	var get = function(name){

		return attributeCollectors[name];	
	};
	
	var execute = function(){

		$('[asshai]').each( function(){
			
			var asshaiPointerName = $(this).attr('asshai');
			console.log(asshaiPointerName);
			try{
				
				var collector = get(asshaiPointerName);

				console.log(collector);

				console.log( collector.getAttributes() );
				
				var data = collector.getAttributes();
	
				for (var key in data){
	
					$(this).attr(key , data[key]);
	
				}

			}
			catch(error){
				console.log("An error ocurred when trying to execute to  " + asshaiPointerName + ". The error message was:  ");
				console.log(error.message );
			}
			
		});

	};
	
	
	var createCollector = function( name ){

		attributeCollectors[name] = Collector();

		return attributeCollectors[name];

		};

	var killCollector = function(name){

			try{
				delete attributeCollectors[name];
			}
			catch(error){
				console.log("error thrown while deleting " + name + ": " + error.message );
			}
		};


	/**
	*Closure 
	return self. 

	A collector manages attributes to inject into html tags by a simple api. Attributes 
	are key value object literals stored internally. You can push attributes into by the 
	addAttr() or the addAttrSet() methods. 

	Facilities to change, delete or clone either attributes or collectors are also provided. 
	*/
	var Collector = function(){

		var attributes = {};

		/**
		*Generates new attr in the collector. 
		*/
		var addAttr = function( name , value ){

			if (! value )
				value ="";
			
			attributes[name] = value;
			return this;
			
		};


		var addTo = function(name , value){

			if (! value )
				value ="";

			if (typeof attributes[name] !== 'undefined')
				attributes[name] =+ separator  + value;
			else
				attributes[name] = value;
			return this;

		};

		/**
		*Add an attribute to the collector for every attr-value pair in attributeSet.
		@attributeSet Object

		Chainable. 
		*/
		var addAttrSet = function ( attributeSet ){

			for ( var index in attributeSet ){

				addAttr(index, attributeSet[index]);
			};
			
			return this;
		};

		/**
		*return clone of attributes. 

		@filter array with desired attributes. 

		return Array
		*/
		var getAttributes = function( filter ){
			if (typeof(filter) === 'undefined' )
				return  Object.create( attributes );
			else if (filter.constructor === Array ){
				try{
					var response = {};
					for (var index in filter ){

						response[filter[index]] = attributes[filter[index] ]; 

					}
					return response;
					
				}
				catch(error){
					
					console.log('error thrown when tried to fetch attributes with filtering: ');
					console.log(error.message);
				}

			}
			else {
				// waiting for a good error handling mechanism
				return {}; //we return empty
			}
		};


		var addFrom = function( collectorName ){

			var data = Asshai.get( collectorName ).getAttributes();



			for (var key in data){

			if (typeof attributes[key] !== 'undefined'){
				attributes[key] += separator + data[key]; //TODO define separation options
			}	
			else
				attributes[key] = data[key];	
			} 
			

			return this;

		};


		/**
		*Replace all equal attributes from given collector
		@collectorName string the name of the collector
		TODO override to accept objects as param.
		*/
		var addFromAndReplace = function( collectorName){

			var data = Asshai.get( collectorName ).getAttributes();

			this.addAttrSet(data);

			return this;

		}
		
		/**
		*Changes name of oldIndex to newINdex. 
		@oldIndex string current index name.
		@newIndex string new index name for the attribute

		chainable
		*/
		var switchIndex = function( oldIndex , newIndex){

			try{

				var cachedContent = attributes[oldIndex];

				delete attributes[oldIndex];

				attributes[newIndex] = cachedContent;

				return this;
				
			}
			catch(error){
				console.log(error.message);
				return this; //?
			}
			
		};

		/**
		*	Deletes attr from collector. 

			@index str attribute name

			chainable
		*/
		var killAttr = function( index ){
			
			try{

				delete attributes[index];
				
				for ( var index in arguments ){
						delete attributes[arguments[index] ];
				}

				return this;
			}
			catch(error){
				console.log(error.message);
				return this; //? 
			}

		};

		/**
		*	Logs every attribute-value pair in attributes. 

			void
		*/
		var debug = function(){
			
			for (var index in attributes){
				console.log(index + "  -->  " + attributes[index] );
				return false;
			};	

		};

		return {
			
			
			addTo : addTo,
			
			addAttr : addAttr,

			addAttrSet : addAttrSet,

			getAttributes : getAttributes,

			switchAttr : switchIndex,

			killAttr  : killAttr,			

			addFrom : addFrom, 
			
			debug : debug,

			addFromAndReplaceEquals : addFromAndReplace,
			
			
		};

		
	};//end collector

	//Creates Asshai global object. 
	window.Asshai =  {

			create : createCollector, 
			
			execute : execute,

			get : get,

			config : config,
			
			killCollector : killCollector,

	};

})();
