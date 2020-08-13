.PHONY: all
all: cv static

.PHONY: cv
cv: dist tsc
	node src/index.js

.PHONY: tsc
tsc:
	tsc

.PHONY: static
static:
	rsync -r static/ dist/

dist:
	mkdir -p dist
