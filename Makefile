.PHONY: all
all: cv
	touch dist/index.html

.PHONY: cv
cv: dist js
	node index.js

.PHONY: js
js:
	yarn tsc

dist:
	mkdir -p dist
