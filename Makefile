
example: node_modules
	@./node_modules/.bin/duo-serve example/grow.js

node_modules:
	@npm install duo-serve

clean:
	rm -fr build components template.js

.PHONY: example clean test
