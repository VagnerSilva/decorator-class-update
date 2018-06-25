# Update class by decorator method


**install:**  npm i -D decorator-class-update reflect-metadata

```js
import { UpdateClass } from 'decorator-class-update';
import 'reflect-metadata';


function DecoratorClass() {
	return (target) => {

        // observe decorator method and returns a list with anything
		const list = UpdateClass.watch('my-event', target.prototype);
		// static method scientist
		Object.defineProperty(target, 'scientist', {
			get:  function  get() {
					return  list[0];
				}
	    });
	    return target
	}
}

function DecoratorMethod(options) {
	return (target, key, property) => {
		UpdateClass.subscribe('my-event', target, () =>  `${options} Eureka!`)
	}
}

@DecoratorClass()
class Test{
	
	@DecoratorMethod('Arquimedes said')
	exclamation() {
        // static method Test.scientist was added to class was instantiated
        // and its value when DecoratorMethod was declared
		console.log(`phrases ${Test.scientist}`)
	}
}

new Test().exclamation(); // out: Phrases: Arquimedes said Eureka!
```
