.PHONY: all
all: cv
	touch dist/index.html

.PHONY: cv
cv: dist js
	node src/index.js

.PHONY: js
js:
	tsc

dist:
	mkdir -p dist
